/**
 * Furnater.js
 * @version 1.0.0
 */
import 'reflect-metadata';
import RulesetMapMethod from "./assets/maps/RulesetMethods/RulesetMapMethod";
import FurnaterCriticalError from "./assets/exceptions/FurnaterCriticalError";
import FurnaterConfigurator from "./assets/configuration/Configurator";
import FurnaterRulesetModel, { standardModel, standardModelID } from './assets/maps/RulesetModels/FurnaterRulesetModel';
import FurnaterRulesetModelLoader from './assets/maps/RulesetModels/FurnaterRulesetModelLoader';
import FurnaterInnerFasade from './assets/fasade/FurnaterInnerFasade';

type ErrorCB = (err : Error | FurnaterCriticalError)=>void;

interface FurnaterOptions {

}

class Furnater {
    #modelLoader = null;
    #exceptions = [];
    #excCaller : ErrorCB[] = [];
    #config = null;

    /**
     * @since 1.0.0
     */
    constructor(options : FurnaterOptions = null, furnaterModel : FurnaterRulesetModel = null) {
        this.#config = new FurnaterConfigurator({

        });
        if(options!==null) this.configure(options);
        this.#modelLoader = new FurnaterRulesetModelLoader(this.#buildFasade());
        this.#modelLoader.assignModel(furnaterModel!==null ? furnaterModel : standardModel);
    }

    /**
     * Exception custom resolver
     */
    #resolveException(exc : Error | FurnaterCriticalError) {
        console.error(exc);
        for(let callerInd in this.#excCaller) {
            this.#excCaller[callerInd](exc);
        }
    }

    /**
     * Catch exceptions outside
     * @param {ErrorCB} fn 
     * @param {string[]} filter 
     */
    catch(fn: ErrorCB, filter : string[]) : void {
        this.#excCaller.push(fn);
    }

    /**
     * Configure Furnater
     * @since 1.0.0
     */
    public configure(newConf : FurnaterOptions) {
        this.#config.assert(newConf);
    }

    /**
     * Build simple interface
     */
    #buildFasade() {
        return new FurnaterInnerFasade(this, {
            resolveException:this.#resolveException.bind(this)
        });
    }
}

module.exports = Furnater;