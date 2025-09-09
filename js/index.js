import icsData from './data.js';

// ICalEvent class to represent and parse a single VEVENT block
class ICalEvent {
    constructor(block) {
        this.block = block;
        this.uid = this.getLine("UID");
        this.summary = this.getLine("SUMMARY");
        this.start = this.getLine("DTSTART[^:]*"); // handles timezones
        this.end = this.getLine("DTEND[^:]*");
        this.location = this.getLine("LOCATION");
        this.status = this.getLine("STATUS");
    }

    getLine(tag) {
        const match = this.block.match(new RegExp(`^${tag}:(.*)$`, "m"));
        return match ? match[1].trim() : null;
    }
}

// ICalParser class to handle the parsing of the entire ICS data
class ICalParser {
    constructor(icsText) {
        this.icsText = icsText;
        this.events = this.parseEvents();
    }

    getEventBlocks() {
        return [...this.icsText.matchAll(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g)].map(s => s[0]);
    }

    parseEvents() {
        return this.getEventBlocks().map(block => new ICalEvent(block));
    }
}

// Usage
const parser = new ICalParser(icsData);
console.log(parser.events);