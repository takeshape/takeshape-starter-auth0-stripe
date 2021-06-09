import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient(process.env.TAKESHAPE_API);

const query = gql`
  mutation UpsertMyProfile {
    upsertMyProfile {
      _id
    }
  }
`;

const afterCallback = async (req, res, session, state) => {
  try {
    client.setHeader('authorization', `Bearer ${session.accessToken}`);
    // Create or update the TakeShape profile, ensuring the record is in sync
    await client.request(query);
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
