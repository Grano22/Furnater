import FurnaterInnerFasade from "./fasade/FurnaterInnerFasade";

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

export default class FurnaterRulesetLoader {
    #loaded = [];
    #furFas = null;

    /**
     * @since 1.0.0
     */
    constructor(furFas : FurnaterInnerFasade) {
        this.#furFas = furFas;
    }

    public assignSet(rulesetDes : Array<any>, rulesetDef : any) : void {
        try {
            if(!(rulesetDes instanceof Map)) throw "Ruleset methods must be specified as map of entries";
            let currDef = rulesetDef;
            if(typeof rulesetDef==="string") {
                let fetchedData = fs.readFileSync(rulesetDef, {encoding:'utf8', flag:'r'});
                currDef = JSON.parse(fetchedData);
            }
            if(!this.validate(currDef)) throw "Validation failed";
            this.prepare(rulesetDes, currDef);
        } catch(err) {
            this.#furFas.passException(err);
        }
    }

    /**
     * Prepare new rules
     * @param {} newRules 
     * @return {void}
     */
    public prepare(rulesetDes: Map<string, any>, rulesetDef : any) : void {
        try {
            this.#loaded = [];
            for(const defInd in rulesetDef) {
                if(!rulesetDes.has(rulesetDef[defInd].method)) throw `Ruleset ${defInd} requires unregistered method ${rulesetDef[defInd].method}`;
                const GivenMethod = rulesetDes.get(rulesetDef[defInd].method);
                const deps = GivenMethod.services || []
                const InitializedMethod = new GivenMethod(...deps);
                for(const aKey in GivenMethod.accessor) {
                    if(typeof rulesetDef[defInd][aKey]!=="undefined") InitializedMethod[aKey] = rulesetDef[defInd][aKey];
                }
                this.#loaded.push(InitializedMethod);
            }
            console.log(this.#loaded);
        } catch(err) {
            this.#furFas.passException(err);
        }
    }

    /**
     * Load rules into loader
     */
    fromJSON(filePath: string) {
        try {
            readFile(filePath).then(res=>{

            });

        } catch(err) {
            throw err;
        }
    }

    /**
     * Validate all rules sets
     */
    validate(ruleSets) : boolean {
        try {
            if(typeof ruleSets!=="object") throw "Rulesets must be a vaild array";
            return true;
        } catch {
            return false;
        }
    }
}