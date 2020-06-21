import fetch from 'node-fetch';

const gqlEndpoint = 'http://graphql-engine:8080/v1/graphql';

export const fetchGraphql = (query: string) => {
  return fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': process.env['HASURA_GRAPHQL_ADMIN_SECRET'] as string,
    },
    body: JSON.stringify({ query }),
  }).then(res => {
    if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`);

    return res.json();
  });
};
