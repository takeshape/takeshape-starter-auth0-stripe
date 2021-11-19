import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { getMySubscriptions, deleteMySubscription } from 'lib/data/takeshape';

export default withApiAuthRequired(async function subscriptionsHandler(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);

    let data;

    if (req.method === 'DELETE') {
      data = await deleteMySubscription(accessToken, req.body);
    } else {
      data = await getMySubscriptions(accessToken);
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
