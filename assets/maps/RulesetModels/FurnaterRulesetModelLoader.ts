import FurnaterCriticalError from "../../exceptions/FurnaterCriticalError";
import FurnaterInnerFasade from "../../fasade/FurnaterInnerFasade";
import RulesetMapMethod from "../RulesetMethods/RulesetMapMethod";
import { standardModelID } from "./FurnaterRulesetModel";

export default class FurnaterRulesetModelLoader {
    #furFas = null;
    #rulesModel = null;

    constructor(furnFas : FurnaterInnerFasade) {
        this.#furFas = furnFas;
    }

    /**
     * Assugn model to furnater loader
     * @param declModel 
     */
    assignModel(declModel) : void {
        try {
            let rulesMethods = [];
            if(!this.#vaidateModel(declModel)) throw new FurnaterCriticalError("Given model is not a vaild");
            for(let declMethod of declModel.methods) rulesMethods.push(declMethod);
            this.#rulesModel = rulesMethods;
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
}