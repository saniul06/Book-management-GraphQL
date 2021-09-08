const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type Book {
            _id: ID!
            bookName: String!
            author: String!
            publishedYear: String!
            category: String!
            ratings: [Rating]
            user: User!
        }

        type Rating {
            userId: ID
            value: Int
        }

        type User {
            _id: ID!
            email: String!
            password: String
            bookList: [Book!]
        }

        type AuthData {
            userId: ID!
            token: String!
            success: Boolean!
        }

        type Success {
            message: String!
        }

        type BookSuccess {
            bookId: ID!
            message: String!
        }

        input BookInput {
            bookName: String!
            author: String!
            publishedYear: String!
            category: String!
        }

        input UserInput {
            email: String!
            password: String!
        }

        type RootQuery {
            books: [Book!]!
        }

        type RootMutation {
            register(userInput: UserInput): Success!
            login(email: String!, password: String!): AuthData!
            addBook(bookInput: BookInput): BookSuccess!
            addRating(bookId: ID!, rating: Int!): Success!
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
        
    `)