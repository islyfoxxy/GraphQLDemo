const graphql = require('graphql')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = graphql
const User = require('../model/user')
const Hobby = require('../model/hobby')
const Post = require('../model/post')

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
  { id: '1', title: 'Programming', description: 'Using computers to make the World better', userId: '1' },
  { id: '2', title: 'Rowing', description: 'Sweat and feel better before eating donuts', userId: '13' },
  { id: '3', title: 'Swimming', description: 'Get in the water and learn to become the water', userId: '211' },
  { id: '4', title: 'Fencing', description: 'A hobby for fency people', userId: '19' },
  { id: '5', title: 'Hiking', description: 'Where hiking boots and explore the World', userId: '1' },
]

//dummy posts
const postsData = [
  { id: '1', comment: 'Building a Mind', userId: '1' },
  { id: '2', comment: 'GraphQL is Amaizing', userId: '1' },
  { id: '3', comment: 'How to Chamge the World', userId: '19' },
  { id: '4', comment: 'How to Chamge the World', userId: '211' },
  { id: '5', comment: 'How to Chamge the World', userId: '1' },
]

//Create type/object/table
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user...',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve (parent) {
        return postsData.filter(post => post.userId === parent.id)
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve (parent) {
        return hobbiesData.filter(hobby => hobby.userId === parent.id)
      }
    }
  })
})

const HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'Documentation for hobbies',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve (parent) {
        return userData.find(item => item.id === parent.userId)
      }
    }
  })
})

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Documentation for Posts',
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve (parent) {
        return userData.find(item => item.id === parent.userId)
      }
    }
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
      resolve (_, args) {
        //resolve with data, get and return data from a dataStore
        return userData.find(user => user.id === args.id)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve () {
        return userData
      }
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve (_, args) {
        //return data about hobby
        return hobbiesData.find(user => user.id === args.id)
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve () {
        return hobbiesData
      }
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve (_, args) {
        //return data
        return postsData.find(user => user.id === args.id)
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve () {
        return postsData
      }
    }
  }
})

//Mutations
const Mutation = new graphql.GraphQLObjectType({
  name: 'Mutaion',
  fields: {
    CreateUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString }
      },
      resolve (_, { name, age, profession }) {
        return { name, age, profession }
      }
    },
    CreatePost: {
      type: PostType,
      args: {
        // id: { type: GraphQLID },
        comment: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve (_, { comment, userId }) {
        return { comment, userId }
      }
    },
    CreateHobby: {
      type: HobbyType,
      args: {
        // id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve (_, { title, description, userId }) {
        return { title, description, userId }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
