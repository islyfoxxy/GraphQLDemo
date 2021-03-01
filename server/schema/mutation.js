const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLUnionType } = require('graphql')
const User = require('../model/user')
const Hobby = require('../model/hobby')
const Post = require('../model/post')
const { UserType, HobbyType, PostType } = require('./schema')

//Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutaion',
  fields: {
    CreateUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        profession: { type: GraphQLString }
      },
      resolve (_, { name, age, profession }) {
        const newUser = new User({ name, age, profession })
        return newUser.save()
      }
    },
    UpdateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString }
      },
      resolve (_, { id, name, age, profession }) {
        return User.findByIdAndUpdate(id,
          { $set: { name, age, profession } },
          {
            new: true, // send back the updated objectType
            omitUndefined: true, // delete undefined properties before sending update to DB
            useFindAndModify: false // use native findByIdAndUpdate
          })
      }
    },
    RemoveUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve (_, { id }) {
        const removedUser = User.findByIdAndRemove(id, { useFindAndModify: false }).exec()

        if (!removedUser) {
          throw new (`Error, no User found with id: ${id}`)
        }
        return removedUser
      }
    },
    CreatePost: {
      type: PostType,
      args: {
        comment: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve (_, { comment, userId }) {
        const newPost = new Post({ comment, userId })
        return newPost.save()
      }
    },
    UpdatePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        comment: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve (_, { id, comment, userId }) {
        return Post.findByIdAndUpdate(id,
          { $set: { comment } },
          {
            new: true,
            omitUndefined: true,
            useFindAndModify: false
          })
      }
    },
    RemovePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve (_, { id }) {
        const removedPost = Post.findByIdAndRemove(id, { useFindAndModify: false }).exec()

        if (!removedPost) {
          throw new Error(`Error, no Post found with id: ${id}`)
        }
        return removedPost
      }
    },
    CreateHobby: {
      type: HobbyType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve (_, { title, description, userId }) {
        const newHobby = new Hobby({ title, description, userId })
        return newHobby.save()
      }
    },
    UpdateHobby: {
      type: HobbyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve (_, { id, title, description }) {
        return Hobby.findByIdAndUpdate(id,
          { $set: { title, description } },
          {
            new: true,
            omitUndefined: true,
            useFindAndModify: false
          })
      }
    },
    RemoveHobby: {
      type: HobbyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve (_, { id }) {
        const removedHobby = Hobby.findByIdAndRemove(id, { useFindAndModify: false }).exec()

        if (!removedHobby) {
          throw new Error(`Error, no Hobby found with id: ${id}`)
        }
        return removedHobby
      }
    }
  }
})

module.exports = Mutation
