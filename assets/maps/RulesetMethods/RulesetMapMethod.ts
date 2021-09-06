import RulesetValidator from "../../validators/RulesetValidatorAbstract";

const RulesetImplementation  = {
    resolveSelector() {

    },
    resolveRules() {

    }
}

export const RulesetMap = (config : Record<string, any> = {}) /*: ClassDecorator */ => {
    return function res<T extends { new (...args: any[]): {} }>(target : T) {
        var diConstructor = Reflect.getMetadata('design:paramtypes', target);
        return class MappedRulesetMethod extends target {
            static services : any = diConstructor;
            static accessor : any = target.prototype.mapped || {};
            static typeDef : string = config.name || target.constructor.name.replace(/(M|m)ethod/g, "");

            #id : number = 0;

            /**
             * Resolve rules to css
             * @return {Record<string, string>}
             */
            public resolve() : Record<string, string> {
                if(typeof this["styleRules"]==="object" && this["styleRules"]!==null) return this["styleRules"];
                else if(typeof this["resolveRules"]==="function") return this["resolveRules"]();
                else return {};
                /*return {
                    selector:this.resolveSelector(),
                    rules:this.resolveRules()
                };*/
           }
        }
    };
};

export const RulesetMappedParam = (customMetadata : Record<string, any> = {}) : PropertyDecorator => {
    return (target : any, ikey : string) => {
        var t = Reflect.getMetadata('design:type', target, ikey);
        if(typeof target.mapped!=="object") target.mapped = {};
        target.mapped[ikey] = {
            type:t.name
        }
    };
}

export interface RulesetMapMethodInterface {
    register : ()=>void;
    boot : ()=>void;

    detectClass : (targetClass : string)=>void;
}

/*export default abstract class RulesetMapMethod {
    id : number;
    abstract name : string;
    
    public abstract register(...injectableParams : any[]);
    public abstract boot(...injectableParams : any[]);
    public abstract resolve(...injectableParams : any[]);
}*/