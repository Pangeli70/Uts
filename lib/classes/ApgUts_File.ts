/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230418 Extraction to its own module
 * ----------------------------------------------------------------------------
 */

import {
    Fs, Path
} from "../imports/deno.land.std.ts";



/**
 * Text file utilities
 */
export class ApgUts_File {


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
