const Book = require('../../models/book')
const User = require('../../models/user')
const { transformBook } = require('./helpers')

module.exports = {
    books: async () => {
        const books = await Book.find()
        return books.map(book => {
            book._doc.author.password = null
            return transformBook(book)
        })
    },
    addBook: async (args, req) => {
        try {
            if (!req.isAuth) {
                throw new Error("Unauthenticated user");
            }

            const bookName = args.bookInput.bookName
            const author = args.bookInput.author
            const publishedYear = args.bookInput.publishedYear
            const category = args.bookInput.category

            const obj = {
                bookName,
                author,
                publishedYear,
                category,
                rating: [],
                user: req.userId
            }

            const book = await new Book(obj)
            await book.save()
            const user = await User.findById(req.userId)
            user.bookList.push(book)
            user.save()
            return { message: "Book added successfully", bookId: book._id }

        } catch (err) {
            throw err
        }
    },
    addRating: async ({ bookId, rating }, req) => {
        try {
            if (!req.isAuth) {
                throw new Error("Unauthenticated user")
            }

            const book = await Book.findById(bookId)
            const isRated = book.ratings.find(item => item.userId.toString() === req.userId.toString())
            if (isRated) {
                throw new Error("You have already rate this book")
            }

            book.ratings.push({ userId: req.userId, value: rating })
            await book.save()
            return { message: "Rating added successfully" }

        } catch (err) {
            throw err
        }
    }
}