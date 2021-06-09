import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient(process.env.TAKESHAPE_API);
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
    client.setHeader('Authorization', `Bearer ${accessToken}`);
    await client.request(upsertMyProfileQuery);
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
