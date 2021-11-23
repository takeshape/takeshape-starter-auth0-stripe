import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { createMyCheckoutSession } from 'lib/data/takeshape';

const getRedirectUrl = (req) => {
  const redirectUrl = req.body.redirectUrl ?? req.headers.referer;

  if (redirectUrl.startsWith('http')) {
    return redirectUrl;
  }

  return new URL(redirectUrl, req.headers.referer).href;
};

export default withApiAuthRequired(async function checkoutHandler(req, res) {
  try {
    if (req.method !== 'POST') {
      throw new Error('Bad request');
    }

    const { accessToken } = await getAccessToken(req, res);

    const data = await createMyCheckoutSession(accessToken, {
      ...req.body,
      redirectUrl: getRedirectUrl(req)
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
