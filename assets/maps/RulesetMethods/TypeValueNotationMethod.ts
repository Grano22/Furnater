import { RulesetMap, RulesetMappedParam } from "./RulesetMapMethod";

@RulesetMap()
export default class TypeValueNotationMethod {
    name = "type-value-notation";

    @RulesetMappedParam()
    keyword : string = "";

    public boot() {

    }

    public register() {

    }
    
    public resolve() {
        console.log(this.keyword);
    }
}