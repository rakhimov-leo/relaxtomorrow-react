const API_URL = 'http://localhost:3007/graphql';

interface GraphQLResponse {
  data?: Record<string, unknown>;
  errors?: Array<{ message: string }>;
}

export interface ArsGenerateResult {
  arsId: string;
  arsPhone: string;
  arsCode: string;
  expiresInSeconds: number;
}

export interface ArsVerifyResult {
  verified: boolean;
  message?: string;
}

export async function graphqlRequest(query: string, variables: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const json: GraphQLResponse = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0]?.message || 'GraphQL error');
  }
  return json.data as Record<string, unknown>;
}

export async function generateArsCode(arsPhone: string): Promise<ArsGenerateResult> {
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
  return data.generateArsCode as ArsGenerateResult;
}

export async function verifyArsCode(arsId: string, arsCode: string): Promise<ArsVerifyResult> {
  const query = `
    mutation VerifyArsCode($input: ArsVerifyInput!) {
      verifyArsCode(input: $input) {
        verified
        message
      }
    }
  `;
  const data = await graphqlRequest(query, { input: { arsId, arsCode } });
  return data.verifyArsCode as ArsVerifyResult;
}

export async function checkArsStatus(arsId: string): Promise<ArsVerifyResult> {
  const query = `
    query CheckArsStatus($arsId: String!) {
      checkArsStatus(arsId: $arsId) {
        verified
        message
      }
    }
  `;
  const data = await graphqlRequest(query, { arsId });
  return data.checkArsStatus as ArsVerifyResult;
}
