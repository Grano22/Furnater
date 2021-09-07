import { RulesetMap, RulesetMappedParam } from "./RulesetMapMethod";

interface TVNMParts {
    type: string[];
    notation: string[];
    separators?: string[];
    defaultNotation: string;
}

@RulesetMap({
    name:"type-value-notation"
})
export default class TypeValueNotationMethod {
    @RulesetMappedParam()
    parts : TVNMParts = null;

    @RulesetMappedParam()
    binds : Record<string, Record<string, any>> = {};

    public boot() {

    }

    public register() {

    }
    
    public resolveRules(targetClass : string) {
       const params = this.prepareParams(targetClass), currBind = "default", resolv = {};
        for(let bindKey in this.binds[currBind]) {
            resolv[bindKey] = this.binds[currBind][bindKey].replace(/%v/ig, params.value).replace(/%n/ig, params.notation);
        }
        return resolv;
    }

    public detectClass(targetClass : string) : boolean {
        return new RegExp(this.buildRegexp()).test(targetClass);
    }

    private prepareParams(targetClass : string) {
        let lastV = 2, val;
        const params = new RegExp(this.buildRegexp()).exec(targetClass);
        if(!isNaN(parseInt(params[1]))) val = params[lastV]; else val = params[++lastV];
        return {
            type:params[1],
            value:val,
            notation:params[lastV+1] || this.parts.defaultNotation
        }
    }

    private buildRegexp() : string {
        let rgxp = "";
        try {
            if(!Array.isArray(this.parts.type)) throw "Type must be providen as array";
            rgxp += "(" + this.parts.type.join("|") + ")";
            if(Array.isArray(this.parts.separators)) {
                rgxp += "(" + this.parts.separators.join("|") + ")";
            }
            rgxp += '([0-9.]+)'; //\\d+
            if(Array.isArray(this.parts.notation)) {
                rgxp += "(" + this.parts.notation.join("|") + ")";
            }
        } catch(err) {
            console.error(err);
        }
        return rgxp.replace(/[]/g, '\\$&');
    }
}