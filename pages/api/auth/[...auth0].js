import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { upsertMyProfile } from '../../../data/takeshape';

const afterCallback = async (req, res, session) => {
  try {
    await upsertMyProfile(session.accessToken);
    return session;
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
});
