/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2024/07/28] Extraction to its own class
 * @version 0.9.2 [APG 2024/11/07] Use PanicIf
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno 2
 * ----------------------------------------------------------------------------
 */

import { ApgUts } from "../statics/ApgUts.ts";
import { ApgUts_Is } from "../statics/ApgUts_Is.ts";
import { ApgUts_Service } from "./ApgUts_Service.ts";


/**
 * Utility class for using CSV Extended files.
 * 
 * CSVE Files are a quick way to import and export data from tabular database
 * and spreadsheet files.
 * 
 * The First row is expected to be the names of the properties of the object in the row.
 * The Second row is expected to contain the basic types of the properties of the object in the row.
 * The other rows are expected to contain the values of the properties of the object in the row.
 * 
 * Comment rows are allowed if the first value is prefixed with the "//" prefix
 * 
 * If something wrong happens reading the file the PanicIf will break the program
 * 
 */
export class ApgUts_Service_Csve extends ApgUts_Service {


    protected static override InitServiceName() {
        return ApgUts_Service_Csve.name;
    }


    /**
     * Converts an array of objects in a csv representation ready to be stored 
     * on persistent media or delivered to the network. The first row will contain
     * the names of the properties of the object
     * 
     * @param aarray of objects simple properties single level non nested
     * @param aseparator optional string (character) to be used as field separator
     * @returns a string of rows separated by crlf characters
     */
    static ArrayToCsv(
        aarray: Record<string,unknown>[],
        aseparator = ";"
    ) {

        const r: string[] = [];
        const first = aarray[0];
        const keys = Object.keys(first);
        let row = "";
        let i = 0;

        for (const key of keys) {
            if (i > 0) {
                row += aseparator;
            }
            row += key;
            i++;
        }
        r.push(row);

        for (const item of aarray) {
            row = "";
            i = 0;
            for (const key of keys) {
                if (i > 0) {
                    row += aseparator;
                }
                const val = (<any>item)[key];
                if (ApgUts_Is.IsDate(val)) {
                    row += val.getDate() + "/" + (val.getMonth() + 1) + "/" + val.getFullYear()
                }
                else if (ApgUts_Is.IsNumber(val)) {
                    const stamp = parseFloat(val).toString().replaceAll(".", ",");
                    row += stamp;
                }
                else if (typeof (val) == "string") {
                    row += val;
                }
                else {
                    row += (isNaN(val)) ? "" : val;
                }
                i++;
            }
            r.push(row);
        }
        return r.join("\r\n");
    }




    /**
     * Parses an arranged CSVE file and converts it an array of javascript objects 
     * 
     * The first row is supposed to contain the names of the fields of the object
     * The second row is supposed to contain the types of the fields of the object. 
     * Those can be one of the following supported type names:
     * string, number, integer, boolean
     * 
     * if the atranscodification object is passed a conversion of the field names will be attempted
     * The atranscodification object must be a Record<string, string> where the key is the 
     * name of the column in the csve file, and the value is the name of the json field in the array
     * 
     * @param afile full path + file name + extension
     * @param aseparator so called "comma" string o separate fields in the CSV rows
     * @param atranscodification an object that contains the translated names of the columns
     * @returns an array of unknown type objects
     * @throws if something goes wrong
    */
    static async ReadCsveFile(
        afile: string,
        aseparator = ";",
        atranscodification: unknown = null
    ) {

        const method = this.Method(this.ReadCsveFile)
        let discardLastColumn = false;

        const messageTitle = `${method}/`;
        const r: unknown[] = [];

        const text = await Deno.readTextFile(afile);

        const table: string[][] = [];
        const rows = text.split("\r\n");

        for (const row of rows) {
            
            const cleanRow = row.trim();
            
            if (cleanRow != "") {
                
                if (cleanRow.substring(0, 2) != "//") {

                    const fields = cleanRow.split(aseparator);

                    let empty = true;
                    for (const field of fields) {

                        const cleanField = field.trim();
                        
                        // At least one field is not empty
                        if (cleanField != "") {
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

        ApgUts.PanicIf(
            fieldTypes.length != fieldNames.length,
            ` ${messageTitle} / The number of types [${fieldTypes.length}] in the second row of file [${afile}] is different from the expected number of columns [${fieldNames.length}]`
        );

        const numFields = fieldNames.length - ((discardLastColumn) ? 1 : 0);


        if (atranscodification != null) {

            ApgUts.PanicIf(
                typeof (atranscodification) != "object",
                ` ${messageTitle} / The argument passed for the transcodification is not an object`
            );

            const transcodificationFields = Object.keys(atranscodification).length;

            ApgUts.PanicIf(
                transcodificationFields != numFields,
                ` ${messageTitle} / The number of fields for the transcodification [${transcodificationFields}] is different from the expected number of columns [${fieldNames.length}]`
            );

            for (let i = 0; i < numFields; i++) {
                const name = fieldNames[i].trim();
                const property = (<any>atranscodification)[name];
                if (property != undefined) {
                    fieldNames[i] = property;
                }
                else {
                    ApgUts.PanicIf(
                        property != undefined,
                        `${messageTitle} / The field [${name}] in the file [${afile}] does not exist in the transcodification object ${JSON.stringify(atranscodification)}`
                    )
                }
            }
        }

        for (let i = 2; i < table.length; i++) {

            ApgUts.PanicIf(
                table[i].length != fieldNames.length,
                ` ${messageTitle} / Error in the row [${i}] [${table[i][0]}] of the file [${afile}]: The number of columns [${table[i].length}] is different from the expected number of columns [${fieldNames.length})`
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
                        ApgUts.PanicIf(
                            true,
                            `${messageTitle} / The type of the comumn in the row [${j}]/[${fieldTypes[j]}] of file [${afile}] is not valid. The recognized types are: "string", "number", "integer" e "boolean"`
                        )
                }
                anyObject[fieldNames[j]] = v;
            }
            r.push(anyObject);
        }

        return r

    }




}
