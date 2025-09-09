import icsData from './data.js';

// console.log('start');


// 1. Split into VEVENT blocks
const eventBlocks = [...icsData.matchAll(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g)].map(s=>s[0])
    //.filter(block => block.includes("SUMMARY"));

// console.log(eventBlocks);

const parseEvent = (block) => {
    // console.log(block);
    const getLine = (tag) => {
        const match = block.match(new RegExp(`^${tag}:(.*)$`, "m"));
        // console.log(match);
        return match ? match[1].trim() : null;
    };

    return {
        uid: getLine("UID"),
        summary: getLine("SUMMARY"),
        start: getLine("DTSTART[^:]*"), // handles timezones like DTSTART;TZID=...
        end: getLine("DTEND[^:]*"),
        location: getLine("LOCATION"),
        status: getLine("STATUS")
    };
};

// 2. Parse all blocks
const events = eventBlocks.map(parseEvent);

console.log(events);


// // Grab all SUMMARY lines
// const summaries = [...icsData.matchAll(/^SUMMARY:(.*)$/gm)];
// console.log("Summaries:", summaries.map(m => m[1]));

// // Grab all DTSTART lines
// const starts = [...icsData.matchAll(/^DTSTART:(.*)$/gm)];
// console.log("Start times:", starts.map(m => m[1]));

// // Grab all DTEND lines
// const ends = [...icsData.matchAll(/^DTEND:(.*)$/gm)];
// console.log("End times:", ends.map(m => m[1]));