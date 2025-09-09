import icsData from './data.js';
import { ICalParser } from './ICalParser.js';
import { SummaryParser } from './SummaryParser.js';

// Usage
const parser = new ICalParser(icsData);
console.log(parser.events);

const summaryParsers = parser.events.map(e => new SummaryParser(e.summary));

console.log('summaryParsers', summaryParsers);

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
