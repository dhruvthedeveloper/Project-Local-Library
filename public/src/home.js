const { findAuthorById } = require("./books");

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let numberOfBorrows = 0;
  books.forEach((book) => {
    if (!book.borrows[0].returned) numberOfBorrows++;
  });
  return numberOfBorrows;
}

function getBooksBorrowedCount(books) {
  let numberOfBorrows = 0;
  books.forEach((book) => {
    if (!book.borrows[0].returned) numberOfBorrows++;
  });
  return numberOfBorrows;
}

function getMostCommonGenres(books) {
  const genres = [];

  books.forEach((book) => {
    const genreName = book.genre;

    let found = false;
    genres.forEach((genre) => {
      if (genre.name === genreName) {
        genre.count++;
        found = true;
        return;
      }
    });

    if (!found) {
      genres.push(createObject(genreName, 1));
    }
  });

  genres.sort((genreA, genreB) => (genreA.count > genreB.count ? -1 : 1));

  deleteExtraObjects(genres, 5);

  return genres;
}

function getMostPopularBooks(books) {
  const mostPopularBooks = [];

  books.forEach((book) => {
    mostPopularBooks.push(createObject(book.title, book.borrows.length));
  });

  mostPopularBooks.sort((bookA, bookB) => (bookA.count > bookB.count ? -1 : 1));
  deleteExtraObjects(mostPopularBooks, 5);

  return mostPopularBooks;
}

function getMostPopularAuthors(books, authors) {
  const mostPopularAuthors = [];

  books.forEach((book) => {
    let nameOfAuthor = findAuthorById(authors, book.authorId).name;
    const numberOfBorrows = book.borrows.length;

    let flag = false;
    mostPopularAuthors.forEach((author) => {
      if (author.name === nameOfAuthor) {
        author.count += numberOfBorrows;
        flag = true;
        return;
      }
    });

    if (!flag) {
      mostPopularAuthors.push(
        createObject(
          nameOfAuthor.first + " " + nameOfAuthor.last,
          numberOfBorrows
        )
      );
    }
  });

  mostPopularAuthors.sort((firstAuthor, secondAuthor) =>
    firstAuthor.count > secondAuthor.count ? -1 : 1
  );
  deleteExtraObjects(mostPopularAuthors, 5);
  return mostPopularAuthors;
}

function createObject(keyName, keyCount) {
  return {
    name: keyName,
    count: keyCount,
  };
}

function deleteExtraObjects(receivedArray, number) {
  while (receivedArray.length > number) {
    receivedArray.pop();
  }
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
