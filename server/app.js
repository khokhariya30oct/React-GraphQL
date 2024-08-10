const express = require("express")
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schemas/schema')
const mongoose = require('mongoose');
const cors = require("cors")

const DB_USER = ''
const DB_PWD = ''

const app = express()

// Allow cross origin request
app.use(cors())

// MLab connection
// Connect to mongoose
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PWD}@gql-book.oarsfbz.mongodb.net/`)
mongoose.connection.once('open',() => {
    console.log('Database connection is done')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


app.listen(4000, () => {
    console.log("Server is listening on 4000 port ")
})
