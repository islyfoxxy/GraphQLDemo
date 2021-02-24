const graphql = require('graphql')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema } = graphql
const _ = require('lodash')

//dummy data
const userData = [
  { id: '1', name: 'Bond', age: 36, profession: 'Doctor' },
  { id: '13', name: 'Anna', age: 26, profession: 'IT' },
  { id: '211', name: 'Bella', age: 16, profession: 'Nurse' },
  { id: '19', name: 'Gina', age: 26, profession: 'Programmer' },
  { id: '150', name: 'Georgina', age: 36, profession: 'Baker' },
]

//dummy data
const hobbiesData = [
  { id: '1', title: 'Programming', description: 'Using computers to make the World better' },
  { id: '2', title: 'Rowing', description: 'Sweat and feel better before eating donuts' },
  { id: '3', title: 'Swimming', description: 'Get in the water and learn to become the water' },
  { id: '4', title: 'Fencing', description: 'A hobby for fency people' },
  { id: '5', title: 'Hiking', description: 'Where hiking boots and explore the World' },
]

//Create type/object/table
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user...',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString }
  })
})

const HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'Documentation for hobbies',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString }
  })
})

//RouteQuery get User with Id specified
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'RootQuery',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parent, args) {
        //resolve with data, get and return data from a dataStore
        return _.find(userData, { id: args.id })
      }
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve (parent, args) {
        //return data about hobby
        return {}
      }
    }

  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
