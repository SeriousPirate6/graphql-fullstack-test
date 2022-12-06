const UserList = [
  {
    id: 1,
    name: "John",
    username: "guy",
    age: 20,
    nationality: "CANADA",
    friends: [
      {
        id: 2,
        name: "Max",
        username: "gah",
        age: 24,
        nationality: "UNITED_STATES",
      },
      {
        id: 3,
        name: "Alice",
        username: "lyce",
        age: 35,
        nationality: "UKRAINE",
      },
    ],
  },
  {
    id: 2,
    name: "Max",
    username: "gah",
    age: 24,
    nationality: "UNITED_STATES",
  },
  {
    id: 3,
    name: "Alice",
    username: "lyce",
    age: 35,
    nationality: "UKRAINE",
  },
  {
    id: 4,
    name: "Gian",
    username: "Sun",
    age: 18,
    nationality: "ITALY",
  },
  {
    id: 5,
    name: "Erika",
    username: "aname",
    age: 24,
    nationality: "AUSTRIA",
    friends: [
      {
        id: 3,
        name: "Alice",
        username: "lyce",
        age: 35,
        nationality: "UKRAINE",
      },
    ],
  },
];

const MovieList = [
  {
    id: 1,
    name: "Inception",
    year: 2010,
    isInCinema: true,
  },
  {
    id: 2,
    name: "Interstellar",
    year: 2014,
    isInCinema: true,
  },
  {
    id: 3,
    name: "The Conjuring",
    year: 2013,
    isInCinema: true,
  },
  {
    id: 4,
    name: "Diabolik",
    year: 2021,
    isInCinema: false,
  },
  {
    id: 5,
    name: "Home Alone",
    year: 1990,
    isInCinema: false,
  },
];

module.exports = { UserList, MovieList };
