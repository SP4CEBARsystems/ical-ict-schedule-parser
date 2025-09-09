import { ICalEvent } from "./ICalEvent.js";

// ICalParser class to handle the parsing of the entire ICS data
export class ICalParser {
    constructor(icsText) {
        this.icsText = icsText;
        this.events = this.parseEvents();
    }

    getEventBlocks() {
        return [...this.icsText.matchAll(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g)].map(s => s[0]);
    }

    parseEvents() {
        return this.getEventBlocks().map(block => new ICalEvent(block).flatten());
    }
}
