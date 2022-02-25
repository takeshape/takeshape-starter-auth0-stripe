# TakeShape API Indexing Starter: Auth0 + Stripe

TakeShape's API Indexing is not only useful as a fallback when external services go down, but also as a means of reducing overall requests to those services.

In this starter, we will demonstrate how you can use TakeShape to combine what would be multiple Stripe API requests into a single TakeShape API request that doesn't query Stripe directly. In this starter's schema, API Indexing is configured to index Stripe products once every 72 hours, so none of the queries made from the frontend application will hit Stripe's servers.

To learn more about API Indexing, [check out our guide on integrating it into your TakeShape projects](https://app.takeshape.io/docs/schema/api-indexing-guide/).

The following is a guide to launch a Next.JS project that uses Auth0 for authentication, Stripe for purchasing subscription products, and TakeShape to store custom user profile information and generate an easy-to-use, user-scoped Stripe GraphQL API.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Screenshot

<img width="991" alt="Screen Shot 2022-02-02 at 16 43 39" src="https://user-images.githubusercontent.com/277401/152242353-7fb5dd47-8e61-47bd-9ea6-1ed2e9c03bde.png">

## Instructions

### Auth0

1. Create an Auth0 account, if you haven't already at [auth0.com](https://auth0.com/).

2. Create an Auth0 application by going to the `Applications` page under the `Applications` tab on the left.

   - Choose to create a `Single Page Application`.
   - Skip the `Quick Start`, and go directly to the `Settings`.
   - Take note of your `domain`, you'll need it later. It typically looks like this: `dev-by9w1mxg.us.auth0.com`.
   - Scroll down, and fill in the following fields:
     - Allowed Callback URLs: http://localhost:3000/
     - Allowed Logout URLs: http://localhost:3000/
     - Allowed Web Origins: http://localhost:3000/
     - Allowed Origins (CORS): http://localhost:3000/
   - Now go to the `Advanced` section, select the `Grants` tab, and verify that `Authorization Code`, `Implicit` and
     `Refresh Token` are all selected.
   - Scroll down to the very bottom of page and click **Save Changes**; the application doesn't automatically save
     itself!

3. Create a TakeShape project using the pattern in this repo. This button will deploy the project for you:

   - <a href="https://app.takeshape.io/add-to-takeshape?repo=https://github.com/takeshape/takeshape-starter-auth0-stripe/tree/add-api-indexing/.takeshape/pattern"><img alt="Deploy To TakeShape" src="https://camo.githubusercontent.com/1b580e3ce353d235bde0f376ca35b0fb26d685f3750a3013ae4b225dd3aaf344/68747470733a2f2f696d616765732e74616b6573686170652e696f2f32636363633832352d373062652d343331632d396261302d3130616233386563643361372f6465762f38653266376264612d306530382d346564652d613534362d3664663539626536613862622f4465706c6f79253230746f25323054616b65536861706525343032782e706e673f6175746f3d666f726d6174253243636f6d7072657373" width="205" height="38" data-canonical-src="https://images.takeshape.io/2cccc825-70be-431c-9ba0-10ab38ecd3a7/dev/8e2f7bda-0e08-4ede-a546-6df59be6a8bb/Deploy%20to%20TakeShape%402x.png?auto=format%2Ccompress" style="max-width:100%;"></a>

4. With your project imported, you should see an Auth0 and a Stripe service on the dashboard.

   - Click on the Auth0 service.
   - Type in your Auth0 `domain` from the earlier step.
   - Take note of the `audience` from the TakeShape config screen, you'll need it later.
   - Save the service.

5. Set up your TakeShape API Key for making public queries. You'll need to use this for getting a list of products
   available to purchase.

   - Go to the `Settings` tab, then to `API Keys`.
   - Create a new API Key and name it whatever you like, such as `starter`.
   - Give it `read` permissions.
   - Copy the key and save it somewhere. This is the only time you'll see it.

6. Now go back to your Auth0 account where you'll create an API for your application.

   - Go to `Applications → APIs` and click **Create API**.
   - Set the `identifier` to the `audience` you encountered earlier on the TakeShape Auth0 Service page.
   - Leave the signing algorithm as `RS256`.
   - From the **Settings** tab, scroll down to **Access Settings** and turn on **Allow Offline Access** — this will
     allow your project to generate refresh tokens and then refresh user tokens when they expire.
   - **Save** the API.

### Stripe

> For the purposes of this starter it's assumed you are using Stripe in Test Mode, and using appropriately scoped API
> keys. Please do not run the demo on a live account as you may incur unexpected charges from Stripe.

1. Create a Stripe account.

2. Take note of your Stripe API keys.

   - Go to [Developers → API Keys](https://dashboard.stripe.com/test/apikeys)
   - You are going to need your **publishable key** and your **secret key**.

3. In TakeShape, set up your Stripe service.

   - Select **Stripe** from the list of services on the `API` tab, in the `Patterns & Services` pane.
   - Enter the Stripe secret key into the **Authentication → API Key** field.
   - **Save** the service.

4. Create your business model in Stripe.

   - Go to [Products → Add Product](https://dashboard.stripe.com/test/products/create).
   - Provide a name, description and image for your product.
   - Use the **standard pricing** pricing model, provide a **recurring** or **one time** price, then **save** the
     product. _Note: this starter supports a single active one time price, and multiple recurring prices per product._
   - Do this a few time to add several products. You can experiment with multiple / different pricing options, but
     please stick to the **Standard pricing** model.

5. Give your Stripe account a name. This is required for Stripe Checkout.

   - Go to [Settings → Account Details](https://dashboard.stripe.com/settings/account). In the Stripe UI, click the gear
     icon in the upper right. Then in the lower section of the page, "Business Settings," you'll see the
     `Account details` link.
   - Enter an `Account name` where indicated.
   - **Save** the settings.

6. Navigate to your TakeShape project dashboard and select the API tab. Open your schema by selecting Schema and
   selecting the JSON tab.

<img width="991" alt="The API tab." src="./images/api-tab.png">

2. Take note of your Stripe API keys.

   - Go to [Developers → API Keys](https://dashboard.stripe.com/test/apikeys)
   - You are going to need your **publishable key** and your **secret key**.

3. In TakeShape, set up your Stripe service.

   - Select **Stripe** from the list of services on the `API` tab, in the `Patterns & Services` pane.
   - Enter the Stripe secret key into the **Authentication → API Key** field.
   - **Save** the service.

4. Create your business model in Stripe.

   - Go to [Products → Add Product](https://dashboard.stripe.com/test/products/create).
   - Provide a name, description and image for your product.
   - Use the **standard pricing** pricing model, provide a **recurring** or **one time** price, then **save** the
     product. _Note: this starter supports a single active one time price, and multiple recurring prices per product._
   - Do this a few time to add several products. You can experiment with multiple / different pricing options, but
     please stick to the **Standard pricing** model.

5. Give your Stripe account a name. This is required for Stripe Checkout.

   - Go to [Settings → Account Details](https://dashboard.stripe.com/settings/account). In the Stripe UI, click the gear
     icon in the upper right. Then in the lower section of the page, "Business Settings," you'll see the
     `Account details` link.
   - Enter an `Account name` where indicated.
   - **Save** the settings.

### Running the Starter

1. Head over to your trusty terminal or tool of choice.

   - Clone this repo with `git clone https://github.com/takeshape/takeshape-starter-api-indexing-auth0-stripe`.
   - `cd` into the folder that the cloning created.
   - Run `mv .env.local-example .env.local` to rename the environment variables file.
   - Run `npm install`.

2. Follow the instructions in `.env.local`.

   - Some of the data you enter will be from Auth0, some will be from your TakeShape project
   - You'll use your Stripe API publishable key as well

3. Run `npm run dev` to start the application and open [http://localhost:3000](http://localhost:3000) with your browser
   to play around!

4. First, login using a valid Auth0 or third-party account. You can also sign up for a new account.

5. Go to the homepage, select a product and payment terms then add it to your cart.

6. Click the Cart icon in the top nav. Review your cart, then click `Checkout Now`.

7. On the Stripe Checkout page, use one of the [Stripe test credit card numbers](https://stripe.com/docs/testing).
   `4242 4242 4242 4242` is commonly used, and will allow you to complete a successful purchase with no secondary
   authentication.

8. Upon a successful purchase you should be directed back to your dev site, and a snackbar will pop up.

9. Try canceling a subscription from your **Purchases** page.

10. Play around, update your profile, create more users, more purchases. Try products with multiple prices...

### Known Limitations

- Due to limitations in the official Stripe Checkout, you will encounter an error if you try to check out with a cart
  containing items with different subscription periods. For example, if you have a month subscription option for Product
  A and a year subscription option for Product B, and you have both of those in the cart at the same time, Stripe will
  throw an error. A future version of this starter may shift to a custom checkout experience to work through this
  limitation.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!
