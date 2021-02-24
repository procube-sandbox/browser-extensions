import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import { readFileSync } from 'fs';

import { resolvers } from '../src/resolvers';
import { db } from '../src/db';

const typeDefs = readFileSync('./src/typeDefs.graphql', 'utf-8');
const context = { db };

const LOGIN_DOM_BY_QUELY = `query test($url: ID!) {
  loginDomByUrl(url: $url) {
    url
    name
    idFormId
    idFormClass
    idFormClassOrder
    idFormName
    idFormType
    pwFormId
    pwFormClass
    pwFormClassOrder
    pwFormName
    pwFormType
  }
}`;

describe('test query', () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context,
  });
  const { query } = createTestClient(server);

  test('loginDomByUrl', async () => {
    const res = await query({
      query: LOGIN_DOM_BY_QUELY,
      variables: {
        url: 'https://id.nikkei.com/lounge/nl/auth/bpgw/LA0310.seam',
      },
    });
    const actual = res.data.loginDomByUrl;
    const expected = {
      url: 'https://id.nikkei.com/lounge/nl/auth/bpgw/LA0310.seam',
      name: 'Nikkei X tech',
      idFormId: 'LA0310Form01:LA0310Email',
      idFormClass: null,
      idFormClassOrder: null,
      idFormName: 'LA0310Form01:LA0310Email',
      idFormType: null,
      pwFormId: 'LA0310Form01:LA0310Password',
      pwFormClass: null,
      pwFormClassOrder: null,
      pwFormName: 'LA0310Form01:LA0310Password',
      pwFormType: 'password',
    };
    expect(actual).toEqual(expected);
  });
});
