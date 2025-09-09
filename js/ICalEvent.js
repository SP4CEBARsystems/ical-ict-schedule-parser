import { SummaryParser } from "./SummaryParser.js"
import EventTimeFormatter from "./TimeParser.js"

// ICalEvent class to represent and parse a single VEVENT block
export class ICalEvent {
    /**
     * @type {any}
     */
    block
    
    /**
     * @type {string}
     */
    uid
    
    /**
     * @type {string}
     */
    summary

    /**
     * @type {SummaryParser}
     */
    summaryParser
    
    /**
     * @type {string}
     */
    start
    
    /**
     * @type {string}
     */
    end

    /**
     * @type {EventTimeFormatter}
     */
    timeParser
    
    /**
     * @type {string}
     */
    location
    
    /**
     * @type {string}
     */
    status

    constructor(block) {
        this.block = block;
        this.uid = this.getLine("UID");
        this.summary = this.getLine("SUMMARY");
        this.summaryParser = new SummaryParser(this.summary);
        this.start = this.getLine("DTSTART[^:]*"); // handles timezones
        this.end = this.getLine("DTEND[^:]*");
        this.timeParser = new EventTimeFormatter(this.start, this.end);
        this.location = this.getLine("LOCATION");
        this.status = this.getLine("STATUS");
    }

    getLine(tag) {
        const match = this.block.match(new RegExp(`^${tag}:(.*)$`, "m"));
        return match ? match[1].trim() : null;
    }

    flatten(){
        return {
            // block: this.block,
            class: this.summaryParser.class,
            code: this.summaryParser.code,
            name: this.summaryParser.name,
            courseName: this.summaryParser.courseName,
            nameAddition1: this.summaryParser.nameAddition1,
            nameAddition2: this.summaryParser.nameAddition2,
            startDate: this.timeParser.startDate,
            startTime: this.timeParser.startTime,
            endTime: this.timeParser.endTime,
            location: this.location,
            // status: this.status,
        }
    }
}