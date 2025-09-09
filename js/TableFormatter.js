export default class TableFormatter {
    /**
     * Formats an array of objects into a Google Sheets compatible table string.
     * Columns are separated by tab (\t), rows by line breaks (\n).
     * @param {Array<Object>} data - Array of objects (each object is a row).
     * @returns {string} - Formatted table string.
     */
    static format(data) {
        if (!Array.isArray(data) || data.length === 0) return '';

        console.log('s1', data);

        // Get all unique keys (columns)
        const columns = Array.from(
            data.reduce((cols, row) => {
                Object.keys(row).forEach(key => cols.add(key));
                return cols;
            }, new Set())
        );
        console.log('s2', columns);

        // Build header row
        const header = columns.join('\t');

        // Build data rows
        const rows = data.map(row =>
            columns.map(col => row[col] !== undefined ? row[col] : '').join('\t')
        );
        console.log('s3 h+r', header, rows);

        // Combine header and rows
        return [header, ...rows].join('\r\n');
    }
}