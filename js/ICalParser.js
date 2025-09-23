import { ICalEvent } from "./ICalEvent.js";

// ICalParser class to handle the parsing of the entire ICS data
export class ICalParser {

    /**
     * @type {ICalEvent[]}
     */
    events

    /**
     * 
     * @param {string} icsText 
     */
    constructor(icsText) {
        this.icsText = icsText;
        this.events = this.parseEvents();
    }

    getEventBlocks() {
        return [...this.icsText.matchAll(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g)].map(s => s[0]);
    }

    /**
     * 
     * @returns {ICalEvent[]}
     */
    parseEvents() {
        return this.getEventBlocks().map(block => new ICalEvent(block));
        //.flatten()
    }

    /**
     * 
     * @param {string} startDate 
     * @returns 
     */
    filterStartDate(startDate){
        console.log('startDate', startDate)
        return this.events.filter(e => e.timeParser.isEndAfterDate(startDate));
    }
}
