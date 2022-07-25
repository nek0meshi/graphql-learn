import fetch, { RequestInit } from 'node-fetch';

const SERVER_URL = 'http://localhost:4000';

async function getBooks() {
  const query = '{books{id title author {id name}}}';
  queryRequest(new URLSearchParams({ query }));
}

async function addBook() {
  const query = 'mutation AddBook($title: String!, $author_id: Int!) { addBook(title: $title, author_id: $author_id) { title } }';
  const variables = {
    title: 'タイトル1',
    author_id: 1,
  }
  mutationRequest({ query, variables });
}

async function queryRequest(queryParams: URLSearchParams) {
  return await request({}, queryParams);
}

type MutationRequestBodyType = {
  query: string,
  variables: object,
};

async function mutationRequest(body: MutationRequestBodyType) {
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

async function request(options: RequestInit, queryParams: URLSearchParams | null = null) {
  try {
    const res = await fetch(SERVER_URL + (queryParams ? '?' + queryParams : ''), options);

    if (!res.ok) {
      const data = await res.text();

      throw new Error(data);
    }

    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e);

    throw e;
  }
}

addBook();
getBooks();
