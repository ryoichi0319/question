// __mocks__/node-fetch.js

const fetchMock = jest.fn();

fetchMock.mockImplementation(async (url, options) => {
  if (url === 'http://localhost:3000/users' && options.method === 'POST') {
    return {
      ok: true,
      json: async () => ({ message: 'アンケートが送信されました' }),
    };
  }
  throw new Error(`Unhandled fetch: ${url}`);
});

export default fetchMock;
