// import icsData from './data.js';
import { ICalParser } from "./ICalParser.js";
import { SummaryParser } from './SummaryParser.js';
import TableFormatter from './TableFormatter.js';
import { setFileTextFromFile, fileText } from './FileTextExtractor.js';

// Usage

/**
 * 
 * @param {string} icsData 
 * @returns 
 */
function start(icsData){
    const statusElement = document.getElementById('status-indicator');
    if (!statusElement) {
        console.error("no statusElement");
        return;
    }
    statusElement.textContent = 'converting';
    const parser = new ICalParser(icsData);
    const startDate = document.getElementById('start-date')?.value;
    let events;
    if (!startDate) {
        console.log("no startDate");
        events = parser.flattenAll();
    } else {
        events = parser.filterStartDate(startDate);
    }

    console.log(events);
    const tableFormatted = TableFormatter.format(events);
    console.log(tableFormatted);

    statusElement.textContent = 'done';
    const outputElem = document.getElementById('output');
    if (!outputElem) {
        console.error("no output");
        return;
    }
    outputElem.textContent = tableFormatted;

    document.getElementById('copy-btn').addEventListener('click', function() {
        copyText(tableFormatted);
    });
}

/**
 * 
 * @param {string} tableFormatted 
 */
function copyText(tableFormatted) {
    navigator.clipboard.writeText(tableFormatted).then(function() {
        console.log('Async: Copying to clipboard was successful!:');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}

document.getElementById('ics-file').addEventListener('change', onFileChange)

/**
 * 
 * @param {Event} event 
 * @returns 
 */
async function onFileChange(event) {
    const file = event.target?.files[0];
    if (!file) return;
    const text = await setFileTextFromFile(file);
    start(text);
}