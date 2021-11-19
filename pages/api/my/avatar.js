import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { uploadAssets } from 'lib/data/takeshape';

export default withApiAuthRequired(async function avatarHandler(req, res) {
  try {
    if (req.method !== 'POST') {
      throw new Error('Invalid request');
    }

    const { accessToken } = await getAccessToken(req, res);

    const assetUpload = await uploadAssets(accessToken, { files: [req.body] });

    res.status(200).json(assetUpload || {});
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
});
