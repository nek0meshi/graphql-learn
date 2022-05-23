const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  # comments

  type Book {
    id: Int
    title: String
    author: String
  }

  type Query {
    books(title: String): [Book]
    book(id: ID!): Book
  }
`;

const books = [
  {
    id: 1,
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    id: 2,
    title: 'City of Glass',
    author: 'Paul Author',
  },
];

const resolvers = {
  Query: {
    books: (parent, args) => {
      let res = books

      if (args.title) {
        res = res.filter(({ title }) => title.includes(args.title))
      }

      return res
    },
    book: (parent, args) => {
      return books.find(({ id }) => id === +args.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
