import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient(process.env.TAKESHAPE_API);

const upsertMyProfileMutation = gql`
  mutation UploadProfileAssets($files: [TSFile]!) {
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

// export async function getUploadUrls(files: File[]): Promise<UploadFile[]> {
//   const res = await client.mutate(UPLOAD_ASSETS_MUTATION, { files: files.map(({ name, type }) => ({ name, type })) });

//   return res.uploadAssets.map((upload: Upload, i: number): UploadFile => ({ file: files[i], ...upload }));
// }

export default withApiAuthRequired(async function profile(req, res) {
  try {
    if (req.method !== 'POST') {
      throw new Error('Invalid request');
    }

    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['takeshape:auth0']
    });

    client.setHeader('Authorization', `Bearer ${accessToken}`);

    const data = await client.request(upsertMyProfileMutation, { files: [req.body] });

    res.status(200).json(data.uploadAssets[0]);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
});
