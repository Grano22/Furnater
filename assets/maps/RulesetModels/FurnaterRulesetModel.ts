import FullnameMethod from "../RulesetMethods/FullnameMethod";
import TypeValueNotationMethod from "../RulesetMethods/TypeValueNotationMethod";

export default interface FurnaterRulesetModel {
    name: string | Symbol;
    methods: any[]; //typeof RulesetMapMethod[]
}

export const standardModelID = Symbol('furnaterStandardModel');

export const standardModel : FurnaterRulesetModel = {
    name:standardModelID,
    methods: [
        FullnameMethod,
        TypeValueNotationMethod
    ]
};