import TypeValidator from "../validators/TypeValidator";

export default class FurnaterConfigurator {
    #configMap: Record<string, any>;
    #loaded = new Map<string, any>();
    #useStrict = true;
    #notes : string[] = new Array<string>();

    constructor(configMap: Record<string, any>, useStrict = true) {
        this.#configMap = configMap;
        this.#useStrict = useStrict;
    }

    public assert(newConfig : Record<string, any>) {
        try {
            if(!this.checkAll(newConfig)) throw "Validation of settings not passed";
            if(this.#loaded.size>0) this.#loaded.clear();
            for(let confName in newConfig) {
                this.#loaded.set(confName, newConfig[confName]);
            }
        } catch(err) {
            console.error(err);
        }
    }

    public get(fieldKey: string) {
        return this.#loaded.get(fieldKey) || null;
    }

    /**
     * Check all settings
     * @param fields 
     */
    public checkAll(fields : Record<string, any> = null) : boolean {
        for(let field in fields) {
            const resCheck = this.check(field, fields[field]);
            if(!resCheck) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check once setting
     * @param fieldKey 
     * @param fieldValue 
     * @returns 
     */
    public check(fieldKey: string, fieldValue = null) : boolean {
        try {
            const currMap = this.#configMap[fieldKey];
            if(fieldValue===null) {
                fieldValue = this.get(fieldKey);
                if(fieldValue===null) throw `Setting with key ${fieldKey} is nullable`;
            }
            if(typeof currMap==="undefined") if(this.#useStrict) return true; else throw "";
            if(typeof currMap==="string") {
                const currValidator = TypeValidator.TYPES[currMap];
                if(typeof currValidator==="object") return currValidator.verify(fieldValue); else throw `Validator with type ${currMap} is not accessible`;
            } else if(typeof currMap==="object") {

            } else throw "Current map must be described as type string or object";
        } catch(err) {
            this.#notes.push(err.toString());
            return false;
        }
    }
}