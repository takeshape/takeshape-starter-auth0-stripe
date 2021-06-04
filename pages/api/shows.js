import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

const query = /* GraphQL */ `
  {
    profile: getProfile(_id: "fa989e5f-6016-4280-b731-7ef999ee7576") {
      fullName
    }
  }
`;

export default withApiAuthRequired(async function shows(req, res) {
  try {
    const apiOrigin = process.env.TAKESHAPE_API;

    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['takeshape:auth0']
    });

    const response = await fetch(apiOrigin, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ query })
    });

    // try {
    //   const { accessToken } = await getAccessToken(req, res, {
    //     scopes: ['read:shows']
    //   });

    //   const baseURL =
    //     process.env.AUTH0_BASE_URL?.indexOf('http') === 0
    //       ? process.env.AUTH0_BASE_URL
    //       : `https://${process.env.AUTH0_BASE_URL}`;

    //   // This is a contrived example, normally your external API would exist on another domain.
    //   const response = await fetch(baseURL + '/api/my/shows', {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`
    //     }
    //   });

    const results = await response.json();
    res.status(response.status || 200).json(results.data);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
});
