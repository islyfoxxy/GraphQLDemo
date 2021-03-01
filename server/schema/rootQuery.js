const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID } = require('graphql')
const User = require('../model/user')
const Hobby = require('../model/hobby')
const Post = require('../model/post')
const { UserType, HobbyType, PostType } = require('./schema')

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
        return User.findById(args.id)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve () {
        return User.find({})
      }
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve (_, args) {
        //return data about hobby
        return Hobby.findById(args.id)
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve () {
        return Hobby.find({})
      }
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve (_, args) {
        //return data
        return Post.findById(args.id)
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve () {
        return Post.find({})
      }
    }
  }
})

module.exports = RootQuery
