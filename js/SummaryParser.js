/**
 * SummaryParser
 * Extracts structured fields from SUMMARY strings.
 */
class SummaryParser {
    /**
     * Parse a summary line into structured fields.
     * @param {string} summary
     * @returns {{courseCode: string, class: string, className: string, courseName: string}}
     */
    static parse(summary) {
        // Clean up line breaks and leading "SUMMARY:"
        summary = summary.replace(/^SUMMARY:/, '').replace(/\r?\n\s+/g, ' ').trim();

        // Regex: capture course code and the rest
        const re = /^HZ\+ ?: ?((?:CU|EN)\d+\w*) - (.+)$/;
        const m = summary.match(re);
        if (!m) {
            return { courseCode: '', class: '', className: '', courseName: summary };
        }

        const courseCode = m[1];
        const rest = m[2];

        // Split rest into parts
        const parts = rest.split(' - ').map(p => p.trim());
        let cls = '';
        let className = '';
        let courseName = '';

        if (parts.length === 1) {
            // Only one chunk: treat as courseName
            courseName = parts[0];
        } else if (parts.length === 2) {
            cls = parts[0];
            courseName = parts[1];
        } else if (parts.length >= 3) {
            cls = parts[0];
            className = parts.slice(1, -1).join(' - ');
            courseName = parts[parts.length - 1];
        }

        return { courseCode, class: cls, className, courseName };
    }
}

/* --------------------------
   Example usage with samples
   -------------------------- */

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

// console.log(rows.join("\n"));

//v1: /^HZ\+ ?: ?((?:CU|EN)\d+\w*) - (VT|ICT2(?:(?:_|-)NL)?) (?:- )?(gel\. \d)? ?(?:- )?([^-]*(:? - )?)([^-]*(:? - )?)[^-]*$/mg
//v2: /^HZ\+ ?: ?((?:CU|EN)\d+\w*) - (VT|ICT2(?:(?:_|-)NL)?) (?:- )?(gel\. \d)? ?(?:- )?((.+?)(?= - )(:? - )?)((.+?)((?= - )(:? - ))?)[^-]*$/mg
//v3: /^HZ\+ ?: ?((?:CU|EN)\d+\w*) - (VT|ICT2(?:(?:_|-)NL)?) (?:- )?(gel\. \d)? ?(?:- )?((.+?)(?= - )(:? - )?)((?:(?! - ).)+)[^-]*$/mg
//v4: /^HZ\+ ?: ?((?:CU|EN)\d+\w*) - (VT|ICT2(?:(?:_|-)NL)?) (?:- )?(gel\. \d)? ?(?:- )?((.+?)(?= - )(:? - )?)((?:(?! - ).)+)[^-]*$/mg

//v5 two stage: /^HZ\+ ?: ?((?:CU|EN)\d+\w*) - (VT|ICT2(?:(?:_|-)NL)?) (?:- )?(gel\. \d)? ?(?:- )?(.+)$/mg
''.matchAll(/^HZ\+ ?: ?((?:CU|EN)\d+\w*) - (VT|ICT2(?:(?:_|-)NL)?) (?:- )?(gel\. \d)? ?(?:- )?(.+)$/mg)