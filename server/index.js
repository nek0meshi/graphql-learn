import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  # comments

  type Book {
    id: Int
    title: String
    author_id: Int
    author: Author
  }

  type Author {
    id: Int
    name: String
  }

  type Query {
    books(title: String): [Book]
    book(id: ID!): Book
    authors(name: String): [Author]
  }

  type Mutation {
    addBook(title: String!, author_id: Int!): Book
  }
`;

const books = [
  {
    id: 1,
    title: 'The Awakening',
    author_id: 1,
  },
  {
    id: 2,
    title: 'City of Glass',
    author_id: 2,
  },
];

let idAutoIncrement = 3;

const authors = [
  {
    id: 1,
    name: 'Kate Chopin',
  },
  {
    id: 2,
    name: 'Paul Author',
  }
];

const resolvers = {
  Query: {
    books: (parent, args) => {
      let res = books

      if (args.title) {
        res = res.filter(({ title }) => title.includes(args.title))
      }

      res = res.map((item) => ({
        ...item,
        author: authors.find(({ id }) => id === item.author_id),
      }));

      return res
    },
    book: (parent, args) => {
      const book =  books.find(({ id }) => id === +args.id);

      return {
        ...book,
        author: authors.find(({ id }) => id === book.author_id),
      };
    },
    authors: (parent, args) => {
      let res = authors;

      if (args.name) {
        res = res.filter(({ name }) => name.includes(args.name))
      }

      return res;
    }
  },

  Mutation: {
    addBook: (parent, args) => {
      const book = {
        id: idAutoIncrement++,
        title: args.title,
        author_id: args.author_id,
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
