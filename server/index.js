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

  type Mutation {
    addBook(title: String!, author: String!): Book
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

let idAutoIncrement = 3;

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

  Mutation: {
    addBook: (parent, args) => {
      const book = {
        id: idAutoIncrement++,
        title: args.title,
        author: args.author,
      };

      books.push(book);

      return book;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
