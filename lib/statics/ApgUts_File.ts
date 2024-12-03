/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230418 Extraction to its own module
 * @version 0.3 APG 20241008 ApgUts_Result
 * @version 0.3 APG 20241107 Small payload refactoring
 * ----------------------------------------------------------------------------
 */

import {Fs, Path} from "../imports/deno.land.std.ts";
import {ApgUts_Result} from "../mod.ts";



/**
 * Text file utilities
 */
export class ApgUts_File {


    /** 
     * Used to ensure that the file path exist in order to prevent the raising 
     * of the filesystem exception. If it does not exist is created
     * Requires read/write permissions both by Deno and on filesystem
     * @param afullPath : path + file name + extension
     * @throws the user hasn't read and write permissions because it tries to create the folder if it is missing.
     * @remarks Incompatible with Deploy
     */
    static async EnsureFolderUnsafe(afullPath: string) {
        const path = Path.dirname(afullPath);
        await Fs.ensureDir(path)
    }



    /**
     * Reads unsafely a json file
     * @param afullPath  path + file name + extension
     * @returns JS object or array of unknown type
     * @throws both if the file is missing, the user hasn't read permissions or the parse fails
     */
    static async ReadJsonUnsafe(afullPath: string) {

        const text = await Deno.readTextFile(afullPath);
        const json: unknown = JSON.parse(text);
        return json;

    }



    /**
     * Writes unsafely to a json file
     * @param afullPath  path + file name + extension
     * @param adata any object or array
     * @param aspacing stringify spacing
     * @remarks Incompatible with Deploy
     */
    static async WriteJsonUnsafe(
        afullPath: string,
        adata: any,
        aspacing = 4
    ) {

        const json = JSON.stringify(adata, undefined, aspacing)
        await Deno.writeTextFile(afullPath, json);

    }



    /**
     * Read safely a Json file managing the Exceptions
     * @param afile full path + file name + extension
     * @returns a result with the json object in the payload
     */
    static async ReadJsonFile<T>(
        afile: string,
    ) {

        const r = new ApgUts_Result<T>();

        try {
            const text = await Deno.readTextFile(afile);
            const json = JSON.parse(text) as T;
            r.setPayload(json)
        }
        catch (error) {
            const m = `Error ${error.message} reading json from file ${afile}`;
            r.error(this.ReadJsonFile.name, m);
        }

        return r;
    }



    /**
     * Lists all files in a folder
     * @param afolder to read from
     * @param aextension filter by extension
     * @returns a list of file names
     */
    static async DirFiles(
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
