import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { GraphQLClient, gql } from 'graphql-request';

const scope = process.env.TAKESHAPE_ROLE_SCOPE;
const client = new GraphQLClient(process.env.TAKESHAPE_API_URL);

const ProfileFieldsFragment = gql`
  fragment ProfileFields on Profile {
    id
    email
    firstName
    lastName
    bio
    avatar {
      path
    }
  }
`;

const getMyProfileQuery = gql`
  ${ProfileFieldsFragment}
  query GetMyProfile {
    profile: getMyProfile {
      ...ProfileFields
    }
  }
`;

const upsertMyProfileMutation = gql`
  ${ProfileFieldsFragment}
  mutation UpsertMyProfile($firstName: String, $lastName: String, $bio: String, $avatarId: String) {
    profile: upsertMyProfile(firstName: $firstName, lastName: $lastName, bio: $bio, avatarId: $avatarId) {
      ...ProfileFields
    }
  }
`;

export default withApiAuthRequired(async function profile(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: [scope]
    });

    client.setHeader('Authorization', `Bearer ${accessToken}`);

    let data;

    if (req.method === 'POST') {
      data = await client.request(upsertMyProfileMutation, req.body);
    } else {
      data = await client.request(getMyProfileQuery);
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
