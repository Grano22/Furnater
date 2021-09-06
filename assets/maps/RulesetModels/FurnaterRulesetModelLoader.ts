import FurnaterCriticalError from "../../exceptions/FurnaterCriticalError";
import FurnaterInnerFasade from "../../fasade/FurnaterInnerFasade";
import { standardModelID } from "./FurnaterRulesetModel";

export default class FurnaterRulesetModelLoader {
    #furFas = null;
    #rulesModel = null;
    #changeDetect = [];

    constructor(furnFas : FurnaterInnerFasade) {
        this.#furFas = furnFas;
    }

    set onChange(cb : ()=>void) {
        this.#changeDetect.push(cb);
    }

    /**
     * Assign model to furnater loader
     * @param declModel 
     */
    assignModel(declModel) : void {
        try {
            let rulesMethods = new Map<string, any>();
            if(!this.#vaidateModel(declModel)) throw new FurnaterCriticalError("Given model is not a vaild");
            for(let declMethod of declModel.methods) rulesMethods.set(declMethod.typeDef, declMethod);
            this.#rulesModel = rulesMethods;
            this.#emitChange();
        } catch(err) {
            this.#furFas.passException(err);
        }
    }

    /**
     * Validate model
     * @param {any} declModel 
     * @returns 
     */
    #vaidateModel(declModel) : boolean {
        try {
            if(typeof declModel.name!=="string" && typeof declModel.name!=="symbol") throw "Furnater model validaton error, model name is required as symbol or string";
            if(declModel.name===standardModelID) return true;
            for(let declMethod of declModel.methods) if(declMethod.constructor.name !== "MappedRulesetMethod") throw "Not method detected";
            return true;
        } catch(err) {
            return false;
        }
    }

    #emitChange() {
        for(const chng of this.#changeDetect) if(typeof chng==="function") chng(this.#rulesModel);
    }
}