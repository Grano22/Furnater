import FurnaterDOMManipulator from './FurnaterDOMManipulator';
import FurnaterRawManipulator from './FurnaterRawManipulator';
import FileIO from './services/FileIO';

export interface FurnaterResolverOptions {
    readonly htmlFile?: string;
    readonly cssFile?: string;
}

export default class FurnaterResolver {
    #options : FurnaterResolverOptions = {};
    #stage = null;
    #loaded = "";
    #structureManipulator = null;

    #classDefinitions = {};

    constructor(rulesetStage, options : FurnaterResolverOptions = {}) {
        this.#options = options;
        this.#stage = rulesetStage;
        if(typeof options.htmlFile==="string") this.#loaded = FileIO.loadFromFile(options.htmlFile);
    }

    useRawStructure() {
        this.#structureManipulator = new FurnaterRawManipulator(this.#loaded);
    }

    useDOM() {
        this.#structureManipulator = new FurnaterDOMManipulator(this.#loaded);
    }

    resolveAllAuto() {
        this.useRawStructure();
        const allClasses = this.#structureManipulator.getAllClasses();
        for(const className of allClasses) {
            for(const classOnce of className.split(" ")) {
                const classResolv = this.getClassResolver(classOnce);
                if(classResolv!==null) {
                    const replClass = classResolv.replaceTo(classOnce);
                    if(classOnce!==replClass) this.#structureManipulator.replaceAll(classOnce, replClass);
                    const stRul = classResolv.resolve(classOnce);
                    this.#classDefinitions[replClass] = stRul;
                }
            }
        }
        FileIO.saveToFile(this.#options.cssFile, this.stringify());
        FileIO.saveToFile(this.#options.htmlFile, this.#structureManipulator.content);
    }

    getClassResolver(targetClass : string) {
        for(const resolv of this.#stage) {
            if(resolv.detectByClass(targetClass)) return resolv;
        }
        return null;
    }

    /**
     * Stringify defs
     * @param minified 
     * @returns 
     */
    stringify(minified = false) : string {
        let fStr = "", iter = 0;
        const totalDefs = Object.keys(this.#classDefinitions).length;
        for(let defSelector in this.#classDefinitions) {
            fStr += "."+defSelector + " {";
            if(!minified)  fStr += "\n";
            let itor = 0; const totalRules = Object.keys(this.#classDefinitions[defSelector]).length;
            for(let ruleName in this.#classDefinitions[defSelector]) {
                if(!minified) fStr += "\t";
                fStr += ruleName + ": " + this.#classDefinitions[defSelector][ruleName] + ";";
                if(!minified && totalRules-1>itor) fStr += "\n";
                itor++;
            }
            if(!minified) fStr += "\n";
            fStr += "}";
            if(!minified && totalDefs-1>iter) fStr += "\n";
            iter++;
        }
        return fStr;
    }
}