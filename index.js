const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  # comments

  type Book {
    id: Int
    title: String
    author: String
  }

  type Query {
    books: [Book]
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
    books: () => books,
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
