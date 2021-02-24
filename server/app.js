const express = require('express')
const { graphqlHTTP, getGraphQLParams } = require('express-graphql')
const schema = require('./schema/schema')
const app = express()

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema
}))

app.listen(4000,//localhost:4000
  () => {
    console.log('Listening for requests on my Port 4000!')
  })
