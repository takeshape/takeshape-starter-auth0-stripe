# TakeShape Start Auth0

The following is a guide to launch a Next.JS projet that uses Auth0 for authentication
and TakeShape to store custom profile information.

## Getting Started

1. Create an Auth0 account.

2. Create an Auth0 application (Applications > Applications).

   - Choose Regular Web Application
   - Allowed Callback URLs: http://localhost:3000/api/auth/callback
   - Allowed Logout URLs: http://localhost:3000/
   - Allowed Web Origins: http://localhost:3000/
   - Allowed Origins (CORS): http://localhost:3000/
   - Copy your `domain`

3. Create a TakeShape project using the pattern in this repo.

4. Create an Auth0 service in your new TakeShape project.

   - Use your Auth0 `domain` from the previous step.
   - Copy the `audience` from the TakeShape config screen.
   - Save the service.

5. Set up your TakeShape roles.

   - Go to Settings > Roles
   - Create a new custom role named `auth0` and give it the following permissions:
     - `Admin.Workflow.*`
     - `Admin.WorkFlowStep.*`
     - `API.Queries.getMyProfile`
     - `API.Mutations.upsertMyProfile`
     - `API.Shapes.TSRelationship`
     - `API.Shapes.Asset`
     - `API.Shapes.GetMyProfileInput`
     - `API.Shapes.UpsertMyProfileInput`
     - `API.Shapes.Profile`

6. Set up your TakeShape API Key

   - Go to API > API Keys
   - Create a new API Key
   - Give it `Read` permissions
   - Copy the key

7. Create an Auth0 API (Applications > APIs).

   - Set the `audience` you copied from the TakeShape UI earlier as the `identifier`.
   - Create the API.
   - Got to the `Permissions` tab, add a `takeshape:auth0` scope.

8. Clone this repo and set up the project.

   - Create a copy of the file `.env.local-example`, name it `.env.local`
   - Fill in the values as instructed in the `.env.local` file.

9. Run `npm install`

10. Run `npm run dev` to start the application.

11. Open [http://localhost:3000](http://localhost:3000) with your browser and play around!

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
