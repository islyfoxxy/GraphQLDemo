const express = require('express')
const { graphqlHTTP, getGraphQLParams } = require('express-graphql')
const mongoose = require('mongoose')
const app = express()
const { user, password } = require('./mongocredentials')
const uri = `mongodb+srv://${user}:${password}@graphqldb.q7nal.mongodb.net/graphqldb?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connections error'))
db.once('open', () => {
  console.log('Yes! We are Connected!')
})

const schema = require('./schema/schema')
// const testSchema = require('./schema/types_schema')

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema
}))

app.listen(4000,//localhost:4000
  () => {
    console.log('Listening for requests on my Port 4000!')
  })
