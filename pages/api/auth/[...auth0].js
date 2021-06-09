import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { gql } from 'graphql-request';
import graphqlClient from '../../../lib/graphql-client';

const upsertMyProfileQuery = gql`
  mutation UpsertMyProfile {
    profile: upsertMyProfile {
      _id
    }
  }
`;

const afterCallback = async (req, res, session) => {
  try {
    const { accessToken } = session;
    graphqlClient.setHeader('Authorization', `Bearer ${accessToken}`);
    await graphqlClient.request(upsertMyProfileQuery);
    return session;
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
});
