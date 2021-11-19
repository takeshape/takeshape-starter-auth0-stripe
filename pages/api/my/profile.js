import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { upsertMyProfile, getMyProfile } from 'lib/data/takeshape';

export default withApiAuthRequired(async function profileHandler(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);

    let data;

    if (req.method === 'POST') {
      data = await upsertMyProfile(accessToken, req.body);
    } else {
      data = await getMyProfile(accessToken);
    }

    res.status(200).json(data || {});
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
});
