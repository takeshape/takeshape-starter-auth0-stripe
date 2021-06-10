import { getProfileList } from '../../data/takeshape';

export default async function everybodyHandler(req, res) {
  try {
    const profileList = await getProfileList();
    res.status(200).json(profileList || []);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
}
