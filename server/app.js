const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const URI = require('./mongoDbUri')
const schema = require('./schema/index')
// const testSchema = require('./schema/types_schema')
const cors = require('cors')
const app = express()

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connections error'))
db.once('open', () => {
  console.log('Yes! We are Connected!')
})

app.use(cors())
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema
}))

app.listen(4000,//localhost:4000
  () => console.log('Listening for requests on my Port 4000!'))
