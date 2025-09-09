import icsData from './data.js';
import { ICalParser } from "./ICalParser.js";
import { SummaryParser } from './SummaryParser.js';
import TableFormatter from './TableFormatter.js';
// import EventTimeFormatter from './TimeParser.js';

// Usage
const parser = new ICalParser(icsData);
const events = parser.events;
console.log(events);
const tableFormatted = TableFormatter.format(events);
console.log(tableFormatted);

navigator.clipboard.writeText(tableFormatted).then(function() {
    console.log('Async: Copying to clipboard was successful!');
}, function(err) {
    console.error('Async: Could not copy text: ', err);
});

// const summaryParsers = parser.events.map(e => new SummaryParser(e.summary));
// console.log('summaryParsers', summaryParsers);

const samples = [
    "HZ+ : CU75076V2 - ICT2 Introduction - UVE",
    "HZ+ : CU75016V2 - ICT2_NL - Continuous integration - CIN",
    "HZ+ : CU75076V2 - ICT2_NL User experience design - UVE",
    "HZ+ : CU75076V2 - ICT2 Book test - UVE",
    "HZ+ : EN39301V24 - ICT2-NL - English - Reading and Writing skills - Reading and Writing skills for IT",
    "HZ+ : EN39301V24 - VT - gel. 2 - Reading Test - Reading and Writing skills for IT"
];
// Parse all
const parsed = samples.map(SummaryParser.parse);
// console.log(parsed);
// Build tab-separated table
const headers = ["courseCode", "class", "className", "courseName"];
const rows = [headers.join('\t'), ...parsed.map(obj => headers.map(h => obj[h]).join('\t'))];


/* --------------------------
   Example usage
   -------------------------- */

const sampleEvent = {
    summary: "HZ+ : CU75076V2 - ICT2 Introduction - UVE",
    start: "20250901T090000",
    end: "20250901T103000",
    location: "GW027",
    status: "CONFIRMED"
};

// console.log(EventTimeFormatter.toSheetRow(sampleEvent));
// Output: "01-09-2025    09:00    10:30"


// TableFormatter.format();