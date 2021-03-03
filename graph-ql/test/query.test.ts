import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import { readFileSync } from 'fs';

import { resolvers } from '../src/resolvers';
import { db } from '../src/db';

const typeDefs = readFileSync('./src/typeDefs.graphql', 'utf-8');
const context = { db };

const setupServer = () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context,
  });
  const { query } = createTestClient(server);
  return query;
};

const GET_LOGIN_DOM_BY_URL = `query test($url: ID!) {
  getLoginDomByUrl(url: $url) {
    url
    name
    idXPath
    pwXPath
    submitXPath
  }
}`;

const GET_CREDENTIAL = `query test($input: GetCredentialInput!){
  getCredential(input: $input) {
    id
    apiToken
    url
    userID
    userPW
  }
}`;

describe('test getLoginDomByUrl', () => {
  const query = setupServer();

  test('URLを入力し、DOMを返す。', async () => {
    const res = await query({
      query: GET_LOGIN_DOM_BY_URL,
      variables: {
        url: 'https://id.nikkei.com/lounge/nl/auth/bpgw/LA0310.seam',
      },
    });
    const actual = res.data.getLoginDomByUrl;
    const expected = {
      url: 'https://id.nikkei.com/lounge/nl/auth/bpgw/LA0310.seam',
      name: 'Nikkei X tech',
      idXPath: '//*[@id="LA0310Form01:LA0310Email"]',
      pwXPath: '//*[@id="LA0310Form01:LA0310Password"]',
      submitXPath: '//*[@id="LA0310Form01"]/div/div/label/button',
    };
    expect(actual).toEqual(expected);
  });

  test('URLを入力し、見つからない場合nullを返す', async () => {
    const res = await query({
      query: GET_LOGIN_DOM_BY_URL,
      variables: {
        url: 'https://notexist.com',
      },
    });
    const actual = res.data.getLoginDomByUrl;
    const expected = null;
    expect(actual).toEqual(expected);
  });
});

describe('test getCredential', () => {
  const query = setupServer();

  test('URLと拡張機能のユーザーIDを入力し、WebサイトのログインIDとパスワードを返す。', async () => {
    const res = await query({
      query: GET_CREDENTIAL,
      variables: {
        input: {
          apiToken: 'test1',
          url: 'https://id.nikkei.com/lounge/nl/auth/bpgw/LA0310.seam',
        },
      },
    });
    const actual = res.data.getCredential;
    const expected = {
      id: '1',
      apiToken: 'test1',
      url: 'https://id.nikkei.com/lounge/nl/auth/bpgw/LA0310.seam',
      userID: 'testid',
      userPW: 'testpw',
    };
    expect(actual).toEqual(expected);
  });

  test('ユーザー見つからなかった場合nullを返す。', async () => {
    const res = await query({
      query: GET_CREDENTIAL,
      variables: {
        input: {
          apiToken: 'notexist',
          url: 'https://id.nikkei.com/lounge/nl/auth/bpgw/LA0310.seam',
        },
      },
    });
    const actual = res.data.getCredential;
    const expected = null;
    expect(actual).toEqual(expected);
  });

  test('webサイトが見つからなかった場合nullを返す。', async () => {
    const res = await query({
      query: GET_CREDENTIAL,
      variables: {
        input: {
          apiToken: 'test1',
          url: 'https://notexist.com',
        },
      },
    });
    const actual = res.data.getCredential;
    const expected = null;
    expect(actual).toEqual(expected);
  });
});
