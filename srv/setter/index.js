
// srv/setter/index.js
const cds = require('@sap/cds');

async function LogBooks(borrowerID, bookTitle, authorName, readDate, req) {
  const tx = cds.transaction(req);
  const { Books } = cds.entities('MyProject');

  // Required fields validation
  for (const [k, v] of Object.entries({ borrowerID, bookTitle, authorName, readDate })) {
    if (v === undefined || v === null || v === '') {
      return 'All fields (borrowerID, bookTitle, authorName, readDate) are required.';
    }
  }

  // Duplicate check: borrowerID + bookTitle + readDate
  const exists = await tx.run(
    cds.ql.SELECT.one.from(Books).where({ borrowerID, bookTitle, readDate })
  );
  if (exists) {
    return `Duplicate: "${bookTitle}" already logged for borrower "${borrowerID}" on "${readDate}".`;
  }

  // Insert
  await tx.run(
    cds.ql.INSERT.into(Books).entries({
      ID: cds.utils.uuid(),
      borrowerID,
      bookTitle,
      authorName,
      readDate
    })
  );

  await tx.commit();
  return `Book "${bookTitle}" has been successfully logged for borrower "${borrowerID}".`;
}

module.exports = { LogBooks };
