import { gql } from 'graphql-request';
import graphqlClient from '../../../lib/graphql-client';

const apiKey = process.env.TAKESHAPE_API_KEY;

const getProfileListQuery = gql`
  query getProfileListQuery {
    profileList: getProfileList {
      items {
        _id
        firstName
        lastName
        bio
      }
    }
  }
`;

async function everybody(req, res) {
  try {
    graphqlClient.setHeader('Authorization', `Bearer ${apiKey}`);
    const data = await graphqlClient.request(getProfileListQuery);
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
