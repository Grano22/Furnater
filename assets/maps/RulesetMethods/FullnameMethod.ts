import FurnaterGrabber from "../../FurnaterGrabber";
import { RulesetMap, RulesetMapMethodInterface, RulesetMappedParam } from "./RulesetMapMethod";

@RulesetMap({
    name:"fullname"
})
export default class FullnameMethod implements RulesetMapMethodInterface {
    @RulesetMappedParam()
    keywords : string[] = [];

    @RulesetMappedParam()
    replaceTarget : string = "";

    @RulesetMappedParam()
    styleRules : Record<string, string> = null;

    constructor(
        fgb : FurnaterGrabber
    ) {
        
    }

    public boot() {

    }

    public register() {

    }

    public detectClass(targetClass : string) : boolean {
        let conclusion = this.keywords.includes(targetClass);
        return conclusion;
    }
}