const User = require('../../models/user')
const Book = require('../../models/book')

// this function is used for performing infinite level nested query for users and books from frontend like
/*
query{
    books{
      publishedYear,
      rating,
      user{
        email,
        _id,
        bookList{
          bookName,
          author,
          user{
            email,
            _id,
            bookList{
              category,
              rating
            }
          }
        }
      }
    }
  }
  */
const books = async bookIds => {
  try {
    const books = await Book.find({ _id: { $in: bookIds } })
    return books.map(book => (transformBook(book)))

  } catch (err) {
    throw err
  }
}

// this function is used for performing infinite level nested query for users and books from frontend
const user = async id => {
  try {
    const user = await User.findById(id)
    return { ...user._doc, bookList: books.bind(this, user._doc.bookList) }

  } catch (err) {
    throw err
  }
}

// this function is used for performing repeated task
const transformBook = book => (
  {
    ...book._doc,
    user: user.bind(this, book._doc.user)
  }
)

exports.transformBook = transformBook
