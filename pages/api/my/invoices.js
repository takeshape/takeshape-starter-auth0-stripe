import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { getMyInvoices } from 'lib/data/takeshape';

export default withApiAuthRequired(async function invoicesHandler(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const data = await getMyInvoices(accessToken);
    res.status(200).json(data || {});
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
});
