const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // context query: retrieve logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("books");
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
    saveBook: async (parent, { input }, context) => {
      // context for user logged in
      if (context.user) {
          return User.findOneAndUpdate(
              { _id: context.user._id },
              {
                $addToSet: { savedBooks: input }
              },
              { new: true, runValidators: true }
          ); 
      }
      // If user is not logged in, throw error
      throw new AuthenticationError('You need to be logged in!!!');
  },
    // A logged in user can remove a book from their `savedBooks`
    deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { 
            $pull: { savedBooks: { bookId: bookId } } 
          },
          { new: true }
        );
      }
      // If user is not logged in, throw error
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;