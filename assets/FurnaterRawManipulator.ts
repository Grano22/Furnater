import FurnaterStructureManipulator from "./FurnaterStructureManipulator";

export default class FurnaterRawManipulator extends FurnaterStructureManipulator {
    #loadedRaw = "";
    #afterModifications = "";

    get content() {
        return this.#afterModifications;
    }

    constructor(rawStr : string) {
        super();
        this.#loadedRaw = rawStr;
        this.#afterModifications = rawStr;
    }

    /**
     * Get all classes collection
     */
    getAllClasses() : string[] {
        //return this.#loadedRaw.match(/class\=\"([A-z0-9-_\n ]+)\"/g);
        let matchOnce;
        const inClass = [], classMatcher = /class\=\"([A-z0-9-_\n ]+)\"/ig;
        while(matchOnce = classMatcher.exec(this.#loadedRaw)) {
            inClass.push(matchOnce[1]);
        }
        return inClass;
    }

    getAllReactClasses() {
        return this.#loadedRaw.match(/className\=\{?(\"|\'|\{)([A-z0-9-_\n ]+)(\"|\'|\})\}?/g);
    }

    getClassesByID() {
        
    }

    getClassesByTagName() {

    }

    getClassByCSSSelector() {

    }

    /**
     * Replace all patterns
     * @param strPatt 
     * @param toRepl 
     */
    replaceAll(strPatt : string, toRepl : string) {
        this.#afterModifications = this.#afterModifications.replace(new RegExp(strPatt, "g"), toRepl);
    }
}