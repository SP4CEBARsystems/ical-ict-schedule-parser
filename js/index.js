import icsData from './data.js';
import { ICalParser } from './ICalParser.js';

// Usage
const parser = new ICalParser(icsData);
console.log(parser.events);