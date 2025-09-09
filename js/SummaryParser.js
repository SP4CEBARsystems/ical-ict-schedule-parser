/**
 * SummaryParser
 * Extracts structured fields from SUMMARY strings.
 */
export class SummaryParser {
    /**
     * 
     * @param {string} summary 
     */
    constructor(summary){
        const parts = [...summary.matchAll(/^HZ\+ ?: ?((?:CU|EN)\d+\w*) - (VT|ICT2(?:(?:_|-)NL)?) (?:- )?(gel\. \d)? ?(?:- )?(.+)$/mg)][0]??[]
        // console.log('parts', summary, parts);
        this.code = parts[1] ?? '';
        this.class = parts[2] ?? '';
        const name = (parts[4] ?? '').split(' - ');
        this.name = name[0] ?? '';
        this.courseName = name[name.length - 1] ?? '';
        this.nameAddition1 = (name.length < 2 ? name[1] : '') ?? '';
        this.nameAddition2 = (name.length < 3 ? name[2] : '') ?? '';
    }

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



// console.log(rows.join("\n"));

//v1: /^HZ\+ ?: ?((?:CU|EN)\d+\w*) - (VT|ICT2(?:(?:_|-)NL)?) (?:- )?(gel\. \d)? ?(?:- )?([^-]*(:? - )?)([^-]*(:? - )?)[^-]*$/mg
//v2: /^HZ\+ ?: ?((?:CU|EN)\d+\w*) - (VT|ICT2(?:(?:_|-)NL)?) (?:- )?(gel\. \d)? ?(?:- )?((.+?)(?= - )(:? - )?)((.+?)((?= - )(:? - ))?)[^-]*$/mg
//v3: /^HZ\+ ?: ?((?:CU|EN)\d+\w*) - (VT|ICT2(?:(?:_|-)NL)?) (?:- )?(gel\. \d)? ?(?:- )?((.+?)(?= - )(:? - )?)((?:(?! - ).)+)[^-]*$/mg
//v4: /^HZ\+ ?: ?((?:CU|EN)\d+\w*) - (VT|ICT2(?:(?:_|-)NL)?) (?:- )?(gel\. \d)? ?(?:- )?((.+?)(?= - )(:? - )?)((?:(?! - ).)+)[^-]*$/mg

//v5 two stage: /^HZ\+ ?: ?((?:CU|EN)\d+\w*) - (VT|ICT2(?:(?:_|-)NL)?) (?:- )?(gel\. \d)? ?(?:- )?(.+)$/mg
// ''.matchAll(/^HZ\+ ?: ?((?:CU|EN)\d+\w*) - (VT|ICT2(?:(?:_|-)NL)?) (?:- )?(gel\. \d)? ?(?:- )?(.+)$/mg)