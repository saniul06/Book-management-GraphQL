const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const graphqlSchema = require('./graphql/schema')
const graphqlResolvers = require('./graphql/resolvers')
const isAuth = require('./middlewares/auth')
const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))


app.use(express.json())

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));


app.use(isAuth)
app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,

}))


app.listen(4000, () => {
    console.log('server started at port 4000')
})

mongoose.connect('mongodb://localhost:27017/lemonhive')
mongoose.connection.once('open', () => console.log('database connected'))


