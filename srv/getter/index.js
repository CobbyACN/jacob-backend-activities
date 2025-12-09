

const cds = require('@sap/cds');

async function FetchBooks(borrowerID, req) {
  const tx = cds.transaction(req);
  const { Books } = cds.entities('MyProject');

  if (!borrowerID || borrowerID === '') {
    return { MESSAGE: 'Parameter borrowerID is required.' };
  }

  const data = await tx.run(
    cds.ql.SELECT.from(Books)
      .where({ borrowerID })
      .orderBy({ readDate: 'desc' })   // descending by date
  );

  if (!data || data.length === 0) {
    return { MESSAGE: `No books found for borrower "${borrowerID}".` };
  }

  return data;
}

module.exports = { FetchBooks };
