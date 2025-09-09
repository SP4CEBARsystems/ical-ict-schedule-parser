import icsData from './data.js';
import { ICalParser } from './ICalParser.js';
import { SummaryParser } from './SummaryParser.js';

// Usage
const parser = new ICalParser(icsData);
console.log(parser.events);

const samples = [
    "HZ+ : CU75076V2 - ICT2 Introduction - UVE",
    "SUMMARY:HZ+ : CU75016V2 - ICT2_NL - Continuous integration - CIN",
    "SUMMARY:HZ+ : CU75076V2 - ICT2_NL User experience design - UVE",
    "SUMMARY:HZ+ : CU75076V2 - ICT2 Book test - UVE",
    "SUMMARY:HZ+ : EN39301V24 - ICT2-NL - English - Reading and Writing skills - Reading and Writing skills for IT",
    "SUMMARY:HZ+ : EN39301V24 - VT - gel. 2 - Reading Test - Reading and Writing skills for IT"
];
// Parse all
const parsed = samples.map(SummaryParser.parse);
console.log(parsed);
// Build tab-separated table
const headers = ["courseCode", "class", "className", "courseName"];
const rows = [headers.join('\t'), ...parsed.map(obj => headers.map(h => obj[h]).join('\t'))];
