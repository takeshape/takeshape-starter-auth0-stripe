# TakeShape Start Auth0

## Getting Started

1. Create an Auth0 account.
2. Create an Auth0 application (Applications > Applications).
   - Choose Regular Web Application
   - Allowed Callback URLs: http://localhost:3000/api/auth/callback
   - Allowed Logout URLs: http://localhost:3000/
   - Allowed Web Origins: http://localhost:3000/
   - Allowed Origins (CORS): http://localhost:3000/
   - Copy your `domain`
3. Create an Auth0 service in your TakeShape project.
   - Use your Auth0 `domain` from the previous step.
   - Copy the `audience` from the TakeShape config screen.
   - Save the service.
4. Set up your TakeShape roles.
   - Go to Settings > Roles
   - Create a new custom role named `auth0`
   - Give it the following permissions: `getMyProfile`, `upsertMyProfile`
5. Create an Auth0 API (Applications > APIs). Use the `audience` you copied from the TakeShape UI and use as the `identifier`.
6. Add a scope to the Auth0 API config (Permissions tab) to grant a TakeShape role.
   - Add `takeshape:auth0`.
7. Clone this repo. Add a file `src/auth_config.json`. Fill it with the following, with your own Auth0 instance info.

```json
{
  "domain": "YOUR_AUTH0_DOMAIN",
  "clientId": "YOUR_AUTH0_CLIENT_ID",
  "audience": "YOUR_AUDIENCE_FROM_TAKESHAPE",
  "apiOrigin": "YOUR_API_ORIGIN",
  "scope": "takeshape:read"
}
```

> For the PR, `YOUR_API_ORIGIN` will be along the lines of `https://pr2850.api.dev.takeshape.io/project/35357479-4135-4a9a-b2ec-72bb0c7199db/v3/graphql`.

7. `npm install` the project
8. `npm run spa` to start the client
9. Create a multiple shape in TakeShape called `Profile` with fields `id` (single line string), `fullName` (single line string) and `bio` (paragraph).
10. Add the following query by editing your schema

```json
    "getMyProfile": {
      "shape": "Profile",
      "resolver": {
        "name": "takeshape:find",
        "service": "takeshape:local",
        "options": {"model": "Profile"},
        "argsMapping": {"where.id.eq": [["get", {"path": "claims.sub"}]]}
      },
      "description": "Get a Profile by ID",
      "args": {"type": "object", "properties": {}}
    },
```

11. Sign up for an Auth0 account using the locally running SPA. Once created, click on the `Profile` link from the dropdown and copy your `sub`. It will be similar to `auth0|60945b2cb1cc580071d093dc`.
12. Add the sub id as the `id` in a new Profile. Fill in the other values.
13. Click on `External API` in the SPA. Click the `Ping API` button. You should see a valid query result...
14.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
