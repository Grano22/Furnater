const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

class RulesetLoader {
    #loaded = [];
    #exceptions = [];

    /**
     * @since 1.0.0
     */
    constructor(newRules = null) {
        if(newRules!==null) this.prepare(newRules);
    }

    /**
     * Prepare new rules
     * @param {} newRules 
     * @return {void}
     */
    public prepare(newRules) : void {
        try {
            let val = this.validate(newRules);
        } catch(err) {
            this.#resolveException(err);
        }
    }

    /**
     * Load rules into loader
     */
    static fromJSON(filePath: string) : RulesLoader {
        try {
            readFile(filePath).then(res=>{

            });
            const nwRulesLoader = new RulesLoader();
            return nwRulesLoader;
        } catch(err) {
            throw err;
        }
    }

    /**
     * Validate all rules sets
     */
    validate(rulesModel) : void {
        
    }

    /**
     * Exception custom resolver
     */
    #resolveException(exc : Error) {

    }
}

module.exports = RulesLoader;