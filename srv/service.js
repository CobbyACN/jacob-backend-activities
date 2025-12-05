
// srv/handler.js
const cds = require('@sap/cds');
const { LogBooks } = require('./setter/index');
const { FetchBooks } = require('./getter/index');

module.exports = (srv) => {
  srv.on('LogBooks', async (req) => {
    const { borrowerID, bookTitle, authorName, readDate } = req.data;
    return await LogBooks(borrowerID, bookTitle, authorName, readDate, req);
  });

  srv.on('FetchBooks', async (req) => {
    const { borrowerID } = req.data;
    return await FetchBooks(borrowerID, req);
  });
};
