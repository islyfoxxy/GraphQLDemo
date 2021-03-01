const graphql = require('graphql')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } = graphql
const User = require('../model/user')
const Hobby = require('../model/hobby')
const Post = require('../model/post')

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
        return Post.find({ userId: parent.id })
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve (parent) {
        return Hobby.find({ userId: parent.id })
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
        return User.findById(parent.userId)
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
        return User.findById(parent.userId)
      }
    }
  })
})

module.exports = { UserType, HobbyType, PostType }
