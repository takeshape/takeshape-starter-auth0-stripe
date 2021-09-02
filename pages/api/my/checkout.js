import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { createMyCheckoutSession } from '../../../data/takeshape';

export default withApiAuthRequired(async function checkoutHandler(req, res) {
  try {
    if (req.method !== 'POST') {
      throw new Error('Bad request');
    }

    console.log(JSON.stringify(request, null, 2));

    const { accessToken } = await getAccessToken(req, res);
    const data = await createMyCheckoutSession(accessToken, {
      ...req.body,
      redirectUrl: `http://${req.headers.host}/checkout`
    });
    res.status(200).json(data || {});
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
});
