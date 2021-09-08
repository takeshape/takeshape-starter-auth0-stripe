# TakeShape Starter Auth0 + Stripe

The following is a guide to launch a Next.JS project that uses Auth0 for authentication, Stripe for purchasing
subscription products, and TakeShape to store custom user profile information and generate an easy-to-use, user-scoped
Stripe GraphQL API.

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Instructions

### Auth0

1. Create an Auth0 account, if you haven't already at [auth0.com](https://auth0.com/).

2. Create an Auth0 application by going to the `Applications` page under the `Applications` tab on the left.

   - Choose to create a `Regular Web Application`.
   - Skip the `Quick Start` tab, and click the `Settings` tab.
   - Take note of your `domain`, you'll need it later. It typically looks like this: `dev-by9w1mxg.us.auth0.com`.
   - Scroll down, and fill in the following fields:
     - Allowed Callback URLs: http://localhost:3000/api/auth/callback
     - Allowed Logout URLs: http://localhost:3000/
     - Allowed Web Origins: http://localhost:3000/
     - Allowed Origins (CORS): http://localhost:3000/
   - Scroll down to the very bottom of page and click Save Changes; the application doesn't automatically save itself!

3. Create a TakeShape project using the pattern in this repo. This button will deploy the project for you:

   - <a href="https://app.takeshape.io/add-to-takeshape?repo=https://github.com/takeshape/takeshape-starter-auth0-stripe/tree/main/.takeshape/pattern"><img alt="Deploy To TakeShape" src="https://camo.githubusercontent.com/1b580e3ce353d235bde0f376ca35b0fb26d685f3750a3013ae4b225dd3aaf344/68747470733a2f2f696d616765732e74616b6573686170652e696f2f32636363633832352d373062652d343331632d396261302d3130616233386563643361372f6465762f38653266376264612d306530382d346564652d613534362d3664663539626536613862622f4465706c6f79253230746f25323054616b65536861706525343032782e706e673f6175746f3d666f726d6174253243636f6d7072657373" width="205" height="38" data-canonical-src="https://images.takeshape.io/2cccc825-70be-431c-9ba0-10ab38ecd3a7/dev/8e2f7bda-0e08-4ede-a546-6df59be6a8bb/Deploy%20to%20TakeShape%402x.png?auto=format%2Ccompress" style="max-width:100%;"></a>

4. Create an Auth0 service in your new TakeShape project.

   - Go to the `Schema` tab, then click `Connect Service`.
   - Type in your Auth0 `domain` from the earlier step.
   - Take note of the `audience` from the TakeShape config screen, you'll need it later.
   - Save the service.

5. Set up your TakeShape API Key.

   - Go to the API tab, then to API Keys.
   - Create a new API Key.
   - Give it `Read` permissions.
   - Copy the key and save it somewhere. This is the only time you'll see it.

6. Now go back to your Auth0 account and create an API (it's on the `APIs` page under the `Applications` tab on the
   left).

   - Set the `identifier` to the `audience` you encountered earlier on the TakeShape Auth0 Service page.
   - Leave the signing algorithm as `RS256`.
   - Scroll down to Access Settings and turn on `Allow Offline Access` — this will allow your project to generate
     refresh tokens and then refresh user tokens when they expire.
   - Create the API.

7. Head over to your trusty terminal or tool of choice.

   - Clone this repo with `git clone https://github.com/takeshape/takeshape-starter-auth0.git`.
   - `cd` into the folder that the cloning created.
   - Run `mv .env.local-example .env.local` to rename the environment variables file.
   - Run `npm install`.

8. Follow the instructions in `.env.local`. Some of the data you enter will be from Auth0; some of it will be from
   TakeShape.

### Stripe

::: tip  
For the purposes of this starter it's assumed you are using Stripe in Test Mode, and using appropriately scoped API
keys. Please do not run the demo on a live account as you may incur unexpected charges from Stripe.  
:::

1. In TakeShape, create a Stripe service.

   - Select **Stripe** from the service selection screen.
   - Copy the Stripe API Secret Key from the Stripe Developer Dashboard and use that for the Authentication field.

2. Copy the Stripe API Public Key to your `.env.local` file where indicated.

3. Create your business model in Stripe.

   - Go to [Products → Add Product](https://dashboard.stripe.com/test/products/create).
   - Provide a name, description and image for your product.
   - Use the `Standard pricing` pricing model, provide a recurring price, then save the product.
   - Do this a few time to add several products. You can experiment with multiple / different pricing options, but
     please stick to the `Standard pricing` model.

4. Give your Stripe account a name. This is required for Stripe Checkout.

   - Go to [Settings → Account Details](https://dashboard.stripe.com/settings/account).
   - Enter an Account Name where indicated.

### Running the Starter

1. Run `npm run dev` to start the application and open [http://localhost:3000](http://localhost:3000) with your browser
   to play around!

2. First, login using a valid Auth0 or third-party account. You can also sign up for a new account.

3. Go to the `Products` page from the top nav, add an item to your cart.

4. Click the Cart icon in the top nav. Review your cart, then click `Checkout Now`.

5. On the Stripe Checkout page, use one of the [Stripe test credit card numbers](https://stripe.com/docs/testing).
   `4242 4242 4242 4242` is commonly used, and will allow you to complete a successful purchase with no secondary
   authentication.

6. Upon a successful purchase you should be directed back to your dev site, and the snackbar will pop up.

7. Play around, update your profile, create more users, more purchases. Try products with multiple prices...

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!
