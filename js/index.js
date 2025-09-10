import icsData from './data.js';
import { ICalParser } from "./ICalParser.js";
import { SummaryParser } from './SummaryParser.js';
import TableFormatter from './TableFormatter.js';
import { setFileTextFromFile, fileText } from './FileTextExtractor.js';

// Usage
const parser = new ICalParser(icsData);
const events = parser.events;
console.log(events);
const tableFormatted = TableFormatter.format(events);
console.log(tableFormatted);

document.getElementById('copy-btn').addEventListener('click', function() {
    copyText(tableFormatted);
});

function copyText(text) {
    navigator.clipboard.writeText(tableFormatted).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}

document.getElementById('ics-file').addEventListener('change', async function(event) {
    const file = event.target.files[0];
    if (file) {
        await setFileTextFromFile(file);
        // Now fileText contains the file's contents as a string
        // You can use fileText instead of icsData if needed
        // Example:
        // const parser = new ICalParser(fileText);
        // const events = parser.events;
        // console.log(events);
    }
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