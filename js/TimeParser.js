/**
 * EventTimeFormatter
 * Utility to convert ICS datetime strings into sheet-friendly strings.
 */
export default class EventTimeFormatter {
    /**
     * 
     * @param {string} start 
     * @param {string} end 
     */
    constructor(start, end){
        const startDate = EventTimeFormatter.parseIcsDate(start);
        const endDate = EventTimeFormatter.parseIcsDate(end);
        if (startDate && endDate) {
            this.startDate = EventTimeFormatter.formatDate(startDate);
            this.startTime = EventTimeFormatter.formatTime(startDate);
            this.endTime = EventTimeFormatter.formatTime(endDate);
        }
    }

    /**
     * Parse an ICS datetime (basic format: YYYYMMDDTHHmmss or YYYYMMDDTHHmm).
     * NOTE: This ignores TZID; assumes local time.
     * @param {string} icsDate
     * @returns {Date|null}
     */
    static parseIcsDate(icsDate) {
        if (!icsDate) return null;
        const m = icsDate.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?$/);
        if (!m) return null;

        const year = parseInt(m[1], 10);
        const month = parseInt(m[2], 10) - 1; // JS months are 0-based
        const day = parseInt(m[3], 10);
        const hour = parseInt(m[4], 10);
        const minute = parseInt(m[5], 10);
        const second = m[6] ? parseInt(m[6], 10) : 0;

        return new Date(year, month, day, hour, minute, second);
    }

    /**
     * Format a Date into DD-MM-YYYY string
     * @param {Date} date
     * @returns {string}
     */
    static formatDate(date) {
        if (!date) return '';
        const d = date.getDate().toString().padStart(2, '0');
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const y = date.getFullYear();
        return `${d}-${m}-${y}`;
    }

    /**
     * Format a Date into HH:mm (24-hour)
     * @param {Date} date
     * @returns {string}
     */
    static formatTime(date) {
        if (!date) return '';
        const h = date.getHours().toString().padStart(2, '0');
        const min = date.getMinutes().toString().padStart(2, '0');
        return `${h}:${min}`;
    }

    /**
     * Convert event object (with start/end strings) into sheet row
     * @param {Object} event
     * @returns {string|null} - tab-separated row "date<TAB>start<TAB>end"
     */
    static toSheetRow(event) {
        const startDate = EventTimeFormatter.parseIcsDate(event.start);
        const endDate = EventTimeFormatter.parseIcsDate(event.end);
        if (!startDate || !endDate) {
            return null;
        }
        return [
            EventTimeFormatter.formatDate(startDate),
            EventTimeFormatter.formatTime(startDate),
            EventTimeFormatter.formatTime(endDate)
        ].join('\t');
    }
}
