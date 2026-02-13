const API_URL = 'http://localhost:3007/graphql';

export async function graphqlRequest(query, variables = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0]?.message || 'GraphQL error');
  }
  return json.data;
}

export async function generateArsCode(arsPhone) {
  const query = `
    mutation GenerateArsCode($input: ArsGenerateInput!) {
      generateArsCode(input: $input) {
        arsId
        arsPhone
        arsCode
        expiresInSeconds
      }
    }
  `;
  const data = await graphqlRequest(query, { input: { arsPhone } });
  return data.generateArsCode;
}

export async function verifyArsCode(arsId, arsCode) {
  const query = `
    mutation VerifyArsCode($input: ArsVerifyInput!) {
      verifyArsCode(input: $input) {
        verified
        message
      }
    }
  `;
  const data = await graphqlRequest(query, { input: { arsId, arsCode } });
  return data.verifyArsCode;
}

export async function checkArsStatus(arsId) {
  const query = `
    query CheckArsStatus($arsId: String!) {
      checkArsStatus(arsId: $arsId) {
        verified
        message
      }
    }
  `;
  const data = await graphqlRequest(query, { arsId });
  return data.checkArsStatus;
}
