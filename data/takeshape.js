import { GraphQLClient, gql } from 'graphql-request';

const apiUrl = process.env.TAKESHAPE_API_URL;
const apiKey = process.env.TAKESHAPE_API_KEY;

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

export async function getProfileList() {
  const client = new GraphQLClient(apiUrl);
  client.setHeader('Authorization', `Bearer ${apiKey}`);
  const data = await client.request(getProfileListQuery);
  return data?.profileList?.items;
}

const getMyProfileQuery = gql`
  ${ProfileFieldsFragment}
  query GetMyProfile {
    profile: getMyProfile {
      ...ProfileFields
    }
  }
`;

export async function getMyProfile(accessToken) {
  const client = new GraphQLClient(apiUrl);
  client.setHeader('Authorization', `Bearer ${accessToken}`);
  const data = await client.request(getMyProfileQuery);
  return data?.profile;
}

const upsertMyProfileMutation = gql`
  ${ProfileFieldsFragment}
  mutation UpsertMyProfile($firstName: String, $lastName: String, $bio: String, $avatarId: String) {
    profile: upsertMyProfile(firstName: $firstName, lastName: $lastName, bio: $bio, avatarId: $avatarId) {
      ...ProfileFields
    }
  }
`;

export async function upsertMyProfile(accessToken, payload) {
  const client = new GraphQLClient(apiUrl);
  client.setHeader('Authorization', `Bearer ${accessToken}`);
  const data = await client.request(upsertMyProfileMutation, payload);
  return data?.profile;
}

const uploadAssetsMutation = gql`
  mutation UploadAssets($files: [TSFile]!) {
    uploadAssets(files: $files) {
      uploadUrl
      asset {
        _id
        _version
        filename
      }
    }
  }
`;

export async function uploadAssets(accessToken, payload) {
  const client = new GraphQLClient(apiUrl);
  client.setHeader('Authorization', `Bearer ${accessToken}`);
  const data = await client.request(uploadAssetsMutation, payload);
  return data?.uploadAssets?.[0];
}
