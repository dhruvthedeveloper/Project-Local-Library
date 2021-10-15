function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((firstAccount, secondAccount) =>
    firstAccount.name.last.toLowerCase() > secondAccount.name.last.toLowerCase()
      ? 1
      : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  // first, we take the account object's id and compare it to the book object's borrowed id.
  // if it matches, then we increment the number of borrows by 1 - setting up an accumulator pattern
  // once we're done with the accumulator pattern, we return the number of borrows.
  // possibly use .reduce()
  let initialAcc = 0;
  return books.reduce((accumulate, book) => {
    let numberOfBorrows = 0;
    accumulate += book.borrows.reduce(
      (borrows, borrow) => (borrows += borrow.id === account.id ? 1 : 0),
      numberOfBorrows
    );
    return accumulate;
  }, initialAcc);
}

function getBooksPossessedByAccount(account, books, authors) {
  //this function requires the number of books that are currently checked out by a single user
  const borrow = books.filter((book) => book.borrows[0].id === account.id);
  return borrow.map((borrows) => {
    const authorOfBook = authors.find(
      (author) => author.id === borrows.authorId
    );
    return {
      id: borrows.id,
      title: borrows.title,
      genre: borrows.genre,
      authorId: borrows.authorId,
      author: authorOfBook,
      borrows: borrows.borrow,
    };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
