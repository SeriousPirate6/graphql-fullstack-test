const { UserList, MovieList } = require("../fakeData");
const _ = require("lodash");

const resolvers = {
  Query: {
    // User resolvers
    users: () => {
      return UserList;
    },
    // parent refers to the parent in query chain
    user: (parent, args) => {
      const id = args.id;
      // if the name of the param passed is equal to the name of the param required, it can be write one time only
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },

    // Movie resolvers
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name: name });
      return movie;
    },
  },

  // in graphql if you have two different table, you can join them simply by putting the adding the field
  // in the type-defs and creating a resolver like this one below
  User: {
    favouriteMovies: () => {
      return _.filter(MovieList, (movie) => movie.year >= 2014);
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      // adding the new user to the table
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      console.log(user);
      return user;
    },
    updateUsername: (parent, args) => {
      // -1 because the ids of the users starts from 1 while the list as always starts from 0
      const { id, newUsername } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });
      return userUpdated;
    },
    deleteUser: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      _.remove(UserList, (user) => user.id === Number(id));
      return user;
    },
  },
};

module.exports = { resolvers };
