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

    public boot() {

    }

    public register() {

    }
    
    public resolve() {
        
    }

    public detectClass(targetClass : string) : boolean {
        return new RegExp(this.buildRegexp()).test(targetClass);
    }

    private buildRegexp() : string {
        let rgxp = "";
        try {
            if(!Array.isArray(this.parts.type)) throw "Type must be providen as array";
            rgxp += "(" + this.parts.type.join("|") + ")";
            if(Array.isArray(this.parts.separators)) {
                rgxp += "(" + this.parts.separators.join("|") + ")";
            }
            rgxp += '(\\d+)';
            if(Array.isArray(this.parts.notation)) {
                rgxp += "(" + this.parts.notation.join("|") + ")";
            }
        } catch(err) {
            console.error(err);
        }
        return rgxp.replace(/[]/g, '\\$&');
    }
}