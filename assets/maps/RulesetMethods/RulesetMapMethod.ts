import RulesetValidator from "../../validators/RulesetValidatorAbstract";

export const RulesetMap = (config : Record<string, any> = {}) /*: ClassDecorator */ => {
    return function res<T extends { new (...args: any[]): {} }>(target : T) {
        var diConstructor = Reflect.getMetadata('design:paramtypes', target);
        return class MappedRulesetMethod extends target {
            id : number = 0;
            static services : any = diConstructor;
            static accessor : any = target.prototype.mapped || {};
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

export default abstract class RulesetMapMethod {
    id : number;
    abstract name : string;
    
    public abstract register(...injectableParams : any[]);
    public abstract boot(...injectableParams : any[]);
    public abstract resolve(...injectableParams : any[]);
}