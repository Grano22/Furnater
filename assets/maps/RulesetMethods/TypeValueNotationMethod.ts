import { RulesetMap, RulesetMappedParam } from "./RulesetMapMethod";

@RulesetMap({
    name:"type-value-notation"
})
export default class TypeValueNotationMethod {
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