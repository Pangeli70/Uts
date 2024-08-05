export abstract class ApgUts_BaseService {

    private static _moduleName = "";

    static get NAME() {

        if (this._moduleName == "") {
            this._moduleName = this.initModuleName();
        }
        return this._moduleName;
    }


    protected static initModuleName() {
        throw new Error("Virtual abstract method InitModuleName not implemented");
        return "";
    }


    protected static moduleFromUrl(aimportMetaUrl: string) {
        return aimportMetaUrl.split('/').pop()!.split('.')[0];
    }

}