
// srv/handler.js
const cds = require('@sap/cds');

module.exports = async (srv) => {
  const { Books } = cds.entities('MyProject');
  const { SELECT, INSERT } = cds.ql;

  // --- your existing hooks (leave as-is) ---
  srv.before('CREATE', 'Students', (req) => {
    if (req.data.age < 0) req.reject(400, 'Age must be positive');
  });
  srv.before('UPDATE', 'Students', (req) => {
    if ('age' in req.data && req.data.age < 0) req.reject(400, 'Age must be positive');
  });
  srv.before('DELETE', 'Students', (req) => {
    console.log(`Deleting student with ID: ${req.data.ID}`);
  });

  srv.on('LogBooks', async (req) => {
    try {
      const { borrowerID, bookTitle, authorName, readDate } = req.data;

      // Validate inputs
      for (const [k, v] of Object.entries({ borrowerID, bookTitle, authorName, readDate })) {
        if (v === undefined || v === null || v === '') req.reject(400, `Parameter ${k} is required`);
      }

      // Prevent duplicate: same borrowerID + title + date
      const exists = await SELECT.one.from(Books).where({ borrowerID, bookTitle, readDate });
      if (exists) req.reject(409, `Duplicate: "${bookTitle}" already logged for borrower "${borrowerID}" on ${readDate}`);

      await INSERT.into(Books).entries({
        ID: cds.utils.uuid(),
        borrowerID,
        bookTitle,
        authorName,
        readDate
      });

      return `Successfully logged: "${bookTitle}" by ${authorName} for borrower "${borrowerID}" on ${readDate}.`;
    } catch (err) {
      req.reject(400, err.message || 'Failed to log book');
    }
  });

  srv.on('FetchBooks', async (req) => {
    try {
      const { borrowerID } = req.data;
      if (!borrowerID) req.reject(400, 'Parameter borrowerID is required');

      const rows = await SELECT.from(Books)
        .where({ borrowerID })
        .orderBy({ readDate: 'desc' });

      if (!rows || rows.length === 0) {
        req.info(204, `No book logs found for borrowerID: ${borrowerID}`);
        return [];
      }

      return rows;
    } catch (err) {
      req.reject(400, err.message || 'Failed to fetch books');
    }
  });

  // 🔹 SIMPLE: Replace codes with names in response (no schema change)
  const borrowerNameMap = {
    'BRW-001': 'Jacob',
    'BRW-002': 'Gab',
    'BRW-003': 'Tin',
    'BRW-004': 'Hannah',
    'BRW-005': 'Rochelle',
    'BRW-006': 'Roro',
    'BRW-007': 'Josh'
  };

  srv.after('READ', 'Books', (rows) => {
    const list = Array.isArray(rows) ? rows : [rows];
    for (const row of list) {
      const codeOrName = row.borrowerID;
      // Replace code with human name; if already a name, keep as-is
      row.borrowerID = borrowerNameMap[codeOrName] || codeOrName;
    }
  });
};
