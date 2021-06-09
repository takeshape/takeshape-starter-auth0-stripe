import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { gql } from 'graphql-request';
import graphqlClient from '../../../lib/graphql-client';

const getMyProfileQuery = gql`
  query GetMyProfile {
    profile: getMyProfile {
      id
      email
      firstName
      lastName
      bio
    }
  }
`;

const upsertMyProfileQuery = gql`
  mutation UpsertMyProfile($firstName: String, $lastName: String, $bio: String) {
    profile: upsertMyProfile(firstName: $firstName, lastName: $lastName, bio: $bio) {
      id
      email
      firstName
      lastName
      bio
    }
  }
`;

export default withApiAuthRequired(async function profile(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['takeshape:auth0']
    });

    graphqlClient.setHeader('Authorization', `Bearer ${accessToken}`);

    let data;

    if (req.method === 'POST') {
      data = await graphqlClient(upsertMyProfileQuery, req.body);
    } else {
      data = await graphqlClient(getMyProfileQuery);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
});
