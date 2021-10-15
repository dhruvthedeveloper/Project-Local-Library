const { findAccountById } = require("./accounts");

function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const returnedBooks = books.filter((book) => book.borrows[0].returned);
  const loanedOutBooks = books.filter((book) => !book.borrows[0].returned);
  return [loanedOutBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  const borrowersList = book.borrows.map((lenders) => {
    const accountInfo = findAccountById(accounts, lenders.id);
    return {
      id: lenders.id,
      returned: lenders.returned,
      ...accountInfo,
    };
  });

  while (borrowersList.length > 10) {
    borrowersList.pop();
  }

  return borrowersList;
}

module.exports = {
  findAccountById,
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
