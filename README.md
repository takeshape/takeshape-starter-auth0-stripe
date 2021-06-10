# TakeShape Starter Auth0

The following is a guide to launch a Next.JS project that uses Auth0 for authentication
and TakeShape to store custom user profile information.

## Instructions

1. Create an Auth0 account.

2. Create an Auth0 application (Applications > Applications).

   - Choose Regular Web Application
   - Go to the `Settings` tab
   - Copy all the following values to the indicated fields:
     - Allowed Callback URLs: http://localhost:3000/api/auth/callback
     - Allowed Logout URLs: http://localhost:3000/
     - Allowed Web Origins: http://localhost:3000/
     - Allowed Origins (CORS): http://localhost:3000/
   - Take note of your `domain`, you'll need it later. It typically looks like this: `dev-by9w1mxg.us.auth0.com`.

3. Create a TakeShape project using the pattern in this repo.

   - <a href="https://app.takeshape.io/add-to-takeshape?repo=https://github.com/takeshape/takeshape-starter-auth0/tree/main/.takeshape/pattern"><img alt="Deploy To TakeShape" src="https://camo.githubusercontent.com/1b580e3ce353d235bde0f376ca35b0fb26d685f3750a3013ae4b225dd3aaf344/68747470733a2f2f696d616765732e74616b6573686170652e696f2f32636363633832352d373062652d343331632d396261302d3130616233386563643361372f6465762f38653266376264612d306530382d346564652d613534362d3664663539626536613862622f4465706c6f79253230746f25323054616b65536861706525343032782e706e673f6175746f3d666f726d6174253243636f6d7072657373" width="205" height="38" data-canonical-src="https://images.takeshape.io/2cccc825-70be-431c-9ba0-10ab38ecd3a7/dev/8e2f7bda-0e08-4ede-a546-6df59be6a8bb/Deploy%20to%20TakeShape%402x.png?auto=format%2Ccompress" style="max-width:100%;"></a>

4. Create an Auth0 service in your new TakeShape project.
   
   - Go to `Schema`, then click `Connect Service`.
   - Use your Auth0 `domain` from the earlier step.
   - Take note of the `audience` from the TakeShape config screen, you'll need it later.
   - Save the service.

5. Set up your TakeShape roles.

   - Go to `Settings` > `Roles`
   - Create a new custom role named `auth0` and give it the following permissions:
     - `Admin.Workflow.*`
     - `Admin.WorkFlowStep.*`
     - `API.Queries.getMyProfile.*`
     - `API.Mutations.upsertMyProfile.*`
     - `API.Shapes.TSRelationship.*`
     - `API.Shapes.Asset.*`
     - `API.Shapes.GetMyProfileInput.*`
     - `API.Shapes.UpsertMyProfileInput.*`
     - `API.Shapes.Profile.*`
   - Click `Save`.

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
