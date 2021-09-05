import FurnaterGrabber from "../../FurnaterGrabber";
import RulesetMapMethod, { RulesetMap, RulesetMappedParam } from "./RulesetMapMethod";

@RulesetMap()
export default class FullnameMethod {
    name = "fullname";

    @RulesetMappedParam()
    keyword : string = "";

    constructor(fgb : FurnaterGrabber) {
        
    }

    public boot() {

    }

    public register() {

    }
    
    public resolve() {
        
    }
}

console.log('flnamemeth', FullnameMethod);