import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient(process.env.TAKESHAPE_API);
const apiKey = process.env.TAKESHAPE_API_KEY;

const getProfileListQuery = gql`
  query getProfileListQuery {
    profileList: getProfileList {
      items {
        _id
        firstName
        lastName
        bio
        avatar {
          path
        }
      }
    }
  }
`;

async function everybody(req, res) {
  try {
    client.setHeader('Authorization', `Bearer ${apiKey}`);
    const data = await client.request(getProfileListQuery);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
}

export default everybody;
