import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { GraphQLClient, gql } from 'graphql-request';

const apiKey = process.env.TAKESHAPE_API_KEY;
const client = new GraphQLClient(process.env.TAKESHAPE_API);

const getProfileListQuery = gql`
  query getProfileListQuery {
    profileList: getProfileList {
      items {
        firstName
        lastName
        bio
      }
    }
  }
`;

export default withApiAuthRequired(async function everybody(req, res) {
  try {
    client.setHeader('authorization', `Bearer ${apiKey}`);

    const data = await client.request(getProfileListQuery);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
});
