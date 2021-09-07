import FurnaterDOMManipulator from './FurnaterDOMManipulator';
import FurnaterRawManipulator from './FurnaterRawManipulator';
import FileIO from './services/FileIO';

export interface FurnaterResolverOptions {
    readonly htmlFile?: string;
    readonly cssFile?: string;
}

export default class FurnaterResolver {
    #stage = null;
    #loaded = "";
    #structureManipulator = null;

    #classDefinitions = {};

    constructor(rulesetStage, options : FurnaterResolverOptions = {}) {
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
                    console.log('resolv', classOnce, classResolv);
                }
            }
        }
        //this.stringify()
    }

    getClassResolver(targetClass : string) {
        for(const resolv of this.#stage) {
            if(resolv.detectByClass(targetClass)) return resolv;
        }
        return null;
    }

    stringify(minified = false) : string {
        let fStr = "";
        for(let defSelector in this.#classDefinitions) {
            fStr += "."+defSelector + " {";
            if(!minified)  fStr += "\n";
            for(let ruleName in this.#classDefinitions[defSelector]) {
                if(!minified) fStr += "\t";
                fStr += ruleName + " = " + this.#classDefinitions[defSelector][ruleName] + ";";
                if(!minified) fStr += "\n";
            }
            if(!minified) fStr += "\n";
            fStr += "}";
            if(!minified) fStr += "\n";
        }
        return fStr;
    }
}