import fetch from 'node-fetch';

const SERVER_URL = 'http://localhost:4000';

async function getBooks() {
  const query = '{books{id title author}}';
  queryRequest(new URLSearchParams({ query }));
}

async function addBook() {
  const query = 'mutation AddBook($title: String!, $author: String!) { addBook(title: $title, author: $author) { title } }';
  const variables = {
    title: 'aaa',
    author: 'bbb',
  }
  mutationRequest({ query, variables });
}

async function queryRequest(query) {
  return await request({}, query);
}

async function mutationRequest(body) {
  return await request(
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),

    }
  )
}

async function request(options, queryParams = null) {
  try {
    const res = await fetch(SERVER_URL + (queryParams ? '?' + queryParams : ''), options);

    if (!res.ok) {
      const data = await res.text();

      throw new Error(data);
    }

    const data = await res.json();
    console.log(JSON.stringify(data));
  } catch (e) {
    console.error(e);

    throw e;
  }
}

addBook();
getBooks();