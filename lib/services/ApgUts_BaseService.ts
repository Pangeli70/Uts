export abstract class ApgUts_BaseService {

    private static _moduleName = "";

    static get NAME() {

        if (this._moduleName == "") {
            this._moduleName = this.InitModuleName();
        }
        return this._moduleName;
    }



    protected static InitModuleName() {
        throw new Error("Virtual abstract method InitModuleName not implemented");
        return "";
    }



    protected static ModuleFromUrl(aimportMetaUrl: string) {
        return aimportMetaUrl.split('/').pop()!.split('.')[0];
    }



    protected static Method(
        afunction: Function
    ) {
        return this.NAME + "." + afunction.name
    }

}