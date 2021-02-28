const graphql = require('graphql')
const { GraphQLObjectType, GraphQLSchema, GraphQLID,
  GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLFloat,
  GraphQLNonNull } = graphql


//Scalar Types - Primitives
//String, Int, Id, Float, Boolean
const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'Represents a Person Type',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    isMarried: { type: GraphQLBoolean },
    gpa: { type: GraphQLFloat },
    justAType: {
      type: Person,
      resolve (parent) {
        return parent
      }
    },
    family: {
      type: new graphql.GraphQLList(Person),
      resolve () {
        return []
      }
    }
  })
})


//RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Description',
  fields: {
    person: {
      type: Person,
      resolve () {
        return { name: 'Antonio', isMarried: true, gpa: 4.0 }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
