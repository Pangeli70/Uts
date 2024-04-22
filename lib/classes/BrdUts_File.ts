/** ---------------------------------------------------------------------------
 * @module [BrdUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230418 Extraction to its own module
 * ----------------------------------------------------------------------------
 */

import {
    Fs, Path
} from "../imports/deno.land.std.ts";
import {
    BrdUts
} from "./BrdUts.ts";


/**
 * Text file utilities
 */
export class BrdUts_File {

    static CLASS_NAME = "BrdUts_File";

    /**
     * Used to ensure that the file path exist in order to prevent the raising 
     * of the filesystem exception. If it does not exist is created
     * Requires read/write permissions both by Deno and on filesystem
     * @param afile full path + file name + extension
     */
    static async EnsureFolder(afile: string) {
        const path = Path.dirname(afile);
        /** TODO - Warning check if this might throw if lacks permissions!! -- APG 20230419 */
        await Fs.ensureDir(path)
    }

    /**
     * Reads unsafely a json file
     * @param afile full path + file name + extension
     * @returns JS object or array of unknown type
     * @throws both if the file is missing, the user hasn't read permissions or the parse fails
     */
    public static async ReadJson(afile: string): Promise<unknown> {
        const text = await Deno.readTextFile(afile);
        const json: unknown = JSON.parse(text);
        return json;
    }

    /**
     * Writes unsafely to a json file (Incompatible with Deploy)
     * @param afile full path + file name + extension
     * @param adata 
     * @param aspacing 
     */
    public static async WriteJsonFile(afile: string, adata: any, aspacing = 4): Promise<void> {
        // TODO handle this might throw especially on Deploy
        // -- APG 20230505 
        const json = JSON.stringify(adata, undefined, aspacing)
        await Deno.writeTextFile(afile, json);
    }


    /**
     * Read safely a Json file managing the Exceptions
     * @param afile full path + file name + extension
     * @returns 
     */
    public static async ReadJsonFile(afile: string): Promise<unknown> {
        try {
            const text = await Deno.readTextFile(afile);
            const json: unknown = JSON.parse(text);
            return json;
        }
        catch (error) {
            console.log(`Error ${error.message} reading json from file ${afile}`);
            return { ok: false, error }
        }
    }

    /** Parses an arranged CSVE file and converts it an array of javascript objects 
     * The first row is supposed to contain the names of the fields of the object
     * The second row is supposed to contain one of the following supported type names:
     * string, number, integer, boolean
     * if the atranscodification object is passed a conversion of the field names will be attempted
     * The atranscodification obkect must be a Record<string, string> where the key is the 
     * name of the column in the csve file, and the value is the name of the json field in the array
     * @param afile full path + file name + extension
     * @param aseparator so called "comma" string o separate fields in the CSV rows
     * @param atranscodification an object that contains the translated names of the columns
     * @returns an array of unknown objects
     * @throws if something goes wrong
    */
    static async ReadCsveFile(
        afile: string,
        aseparator = ";",
        atranscodification: unknown = null
    ) {

        let discardLastColumn = false;

        const messageTitle = `${this.CLASS_NAME}/${this.ReadCsveFile.name}/`;
        const r: unknown[] = [];

        const text = await Deno.readTextFile(afile);

        const table: string[][] = [];
        const rows = text.split("\r\n");
        for (const row of rows) {
            // Riga pulita
            const cleanRow = row.trim();
            // Non è riga vuota
            if (cleanRow != "") {
                // Non è un commento
                if (cleanRow.substring(0, 2) != "//") {
                    const fields = cleanRow.split(aseparator);
                    let empty = true;
                    for (const field of fields) {
                        // Almeno uno dei campi contiene qualcosa
                        if (field != "") {
                            empty = false;
                            break
                        }
                    }
                    if (!empty) {
                        table.push(fields);
                    }

                }
            }
        }

        const fieldNames = table[0];
        const fieldTypes = table[1];

        if (fieldNames[fieldNames.length - 1] == "") {
            discardLastColumn = true;
        }

        BrdUts.Assert(
            fieldTypes.length == fieldNames.length,
            ` ${messageTitle} / Il numero di tipi [${fieldTypes.length}] nella seconda riga del file [${afile}] non è uguale al numero di colonne atteso [${fieldNames.length}]`
        );

        const numFields = fieldNames.length - ((discardLastColumn) ? 1 : 0);

        
        if (atranscodification != null) {

            BrdUts.Assert(
                typeof (atranscodification) == "object",
                ` ${messageTitle} / L'argomento passato per la transcodifica non è un oggetto`
            );

            const transcodificationFields = Object.keys(atranscodification).length;

            BrdUts.Assert(
                transcodificationFields == numFields,
                ` ${messageTitle} / Il numero di campi per la per la transcodifica [${transcodificationFields}] non è uguale al numero di colonne atteso [${fieldNames.length}]`
            );

            for (let i = 0; i < numFields; i++) {
                const name = fieldNames[i].trim();
                const property = (<any>atranscodification)[name];
                if (property != undefined) {
                    fieldNames[i] = property;
                }
                else {
                    BrdUts.Assert(
                        property != undefined,
                        `${messageTitle} / Errore nella transcodifica del campo [${name}] del file [${afile}]: non esiste una voce equivalente nell'oggetto ${JSON.stringify(atranscodification)}`
                    )
                }
            }
        }

        for (let i = 2; i < table.length; i++) {

            BrdUts.Assert(
                table[i].length == fieldNames.length,
                ` ${messageTitle} / Errore nella riga [${i}] [${table[i][0]}] del file [${afile}]: Il numero di celle [${table[i].length}] non è uguale al numero di colonne atteso [${fieldNames.length})`
            );

            const anyObject: any = {};
            for (let j = 0; j < numFields; j++) {
                let v: number | string | boolean | null = null;
                const cell = table[i][j];

                const type = fieldTypes[j].trim();
                switch (type) {
                    case "number": {
                        let rawNum = cell.replaceAll(",", ".").trim();
                        if (rawNum == "") {
                            rawNum = "0"
                        }
                        v = parseFloat(rawNum);
                        break;
                    }
                    case "integer": {
                        let rawNum = cell.replaceAll(",", ".").trim();
                        if (rawNum == "") {
                            rawNum = "0"
                        }
                        v = parseInt(rawNum);
                        break;
                    }
                    case "boolean": {
                        v = false;
                        const rawBool = cell.toLowerCase().trim();
                        if (rawBool == "true" || rawBool == "1") {
                            v = true;
                        }
                        break;
                    }
                    case "string": {
                        v = cell.replaceAll("\"\"", "'");
                        v = v.replaceAll("\"", "");
                        break;
                    }
                    default:
                        BrdUts.Assert(
                            false,
                            `${messageTitle} / Errore il tipo di campo [${j}]/[${fieldTypes[j]}] del file [${afile}] non è valido : i tipi riconosciuti sono "string", "number", "integer" e "boolean"`
                        )
                }
                anyObject[fieldNames[j]] = v;
            }
            r.push(anyObject);
        }

        return r

    }



    public static async writeTextFile(afile: string, adata: string) {
        await Deno.writeTextFile(afile, adata);
    }


    public static async dirFiles(
        afolder: string,
        aextension: string,
    ) {
        const r: string[] = [];
        for await (const dirEntry of Deno.readDir(afolder)) {
            if (dirEntry.isFile) {
                const extensionName = Path.extname(dirEntry.name);
                if (extensionName == aextension) {
                    r.push(dirEntry.name);
                }
            }
        }
        return r;
    }


}

/*! ---------------------------------------------------------------------------
 * @copyright Breda Sistemi industriali S.p.A., 2023 - http://bredasys.com
 * All rights reserved 
 * @licence You cannot host, display, distribute or share this Work in any 
 * form, both physical and digital. You cannot use this Work in any commercial
 * or non-commercial product, website or project. You cannot sell this Work
 * and you cannot mint an NFTs out of it.
 * --------------------------------------------------------------------------- 
 */
