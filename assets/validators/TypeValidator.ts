export default class TypeValidator {
    static TYPES = {
        string:{
            verfiy:(v)=>typeof v==="string",
            aliases:[String]
        },
        array:{
            verify:(v)=>Array.isArray(v),
            aliases:[Array],
        },
        object:{
            verify:(v)=>typeof v==="object",
            aliases:[Object]
        },
        number:{
            verify:(v)=>typeof v==="number",
            aliases:[Number]
        },
        bigint:{
            verify:(v)=>typeof v==="bigint"
        },
        int:{
            verify:(v)=>Number(v) === v && v % 1 === 0
        },
        float:{
            verify:(v)=>Number(v) === v && v % 1 !== 0
        }
    }

    static isString() {  }
}