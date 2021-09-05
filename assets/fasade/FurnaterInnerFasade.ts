export default class FurnaterInnerFasade {
    #furnaterRef = null;
    #secretControl : Record<string, (...anyArgs: any[])=>any> = {};

    constructor(fRef, secretControl : Record<string, (...anyArgs: any[])=>any> = {}) {
        this.#furnaterRef = fRef;
        this.#secretControl = secretControl;
    }

    /**
     * Pass exception from fasade to furnater
     * @param exc 
     */
    public passException(exc) {
        this.#secretControl.resolveException(exc);
    }
}