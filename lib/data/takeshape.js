import { GraphQLClient, gql } from 'graphql-request';

const apiUrl = process.env.TAKESHAPE_API_URL;
const apiKey = process.env.TAKESHAPE_API_KEY;

const ProfileFieldsFragment = gql`
  fragment ProfileFields on Profile {
    id
    email
    firstName
    lastName
    bio
    avatar {
      path
    }
    stripeCustomer {
      description
      name
      id
    }
  }
`;

const getProfileListQuery = gql`
  query GetProfileListQuery {
    profileList: getProfileList {
      items {
        _id
        firstName
        lastName
        bio
        avatar {
          path
        }
      }
    }
  }
`;

export async function getProfileList() {
  const client = new GraphQLClient(apiUrl);
  client.setHeader('Authorization', `Bearer ${apiKey}`);
  const data = await client.request(getProfileListQuery);
  return data?.profileList?.items;
}

const getMyProfileQuery = gql`
  ${ProfileFieldsFragment}
  query GetMyProfile {
    profile: getMyProfile {
      ...ProfileFields
    }
  }
`;

export async function getMyProfile(accessToken) {
  const client = new GraphQLClient(apiUrl);
  client.setHeader('Authorization', `Bearer ${accessToken}`);
  const data = await client.request(getMyProfileQuery);
  return data?.profile;
}

const upsertMyProfileMutation = gql`
  ${ProfileFieldsFragment}
  mutation UpsertMyProfile($firstName: String, $lastName: String, $bio: String, $avatarId: String) {
    profile: upsertMyProfile(firstName: $firstName, lastName: $lastName, bio: $bio, avatarId: $avatarId) {
      ...ProfileFields
    }
  }
`;

export async function upsertMyProfile(accessToken, payload) {
  const client = new GraphQLClient(apiUrl);
  client.setHeader('Authorization', `Bearer ${accessToken}`);
  const data = await client.request(upsertMyProfileMutation, payload);
  return data?.profile;
}

const uploadAssetsMutation = gql`
  mutation UploadAssets($files: [TSFile]!) {
    uploadAssets(files: $files) {
      uploadUrl
      asset {
        _id
        _version
        filename
      }
    }
  }
`;

export async function uploadAssets(accessToken, payload) {
  const client = new GraphQLClient(apiUrl);
  client.setHeader('Authorization', `Bearer ${accessToken}`);
  const data = await client.request(uploadAssetsMutation, payload);
  return data?.uploadAssets?.[0];
}

const getMyCustomerQuery = gql`
  query GetMyCustomer {
    profile: getMyProfile {
      stripeCustomer {
        id
        name
        description
      }
    }
  }
`;

export async function getMyCustomer(accessToken, payload) {
  const client = new GraphQLClient(apiUrl);
  client.setHeader('Authorization', `Bearer ${accessToken}`);
  const data = await client.request(getMyCustomerQuery, payload);
  return data?.profile?.stripeCustomer;
}

const upsertMyCustomerQuery = gql`
  mutation UpsertMyCustomer($name: String, $description: String) {
    customer: upsertMyCustomer(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export async function upsertMyCustomer(accessToken, payload) {
  const client = new GraphQLClient(apiUrl);
  client.setHeader('Authorization', `Bearer ${accessToken}`);
  const data = await client.request(upsertMyCustomerQuery, payload);
  return data?.customer;
}

const getMySubscriptionsQuery = gql`
  query GetMySubscriptionsQuery {
    subscriptions: getMySubscriptions(
      expand: ["data.items", "data.plan.product", "data.latest_invoice.payment_intent"]
    ) {
      id
      current_period_end
      items {
        data {
          id
          price {
            currency
            unitAmount: unit_amount
            product {
              id
              name
              description
              images
            }
            recurring {
              interval
            }
          }
        }
      }
    }
  }
`;

export async function getMySubscriptions(accessToken) {
  const client = new GraphQLClient(apiUrl);
  client.setHeader('Authorization', `Bearer ${accessToken}`);
  const data = await client.request(getMySubscriptionsQuery);
  return data?.subscriptions;
}

const createMyCheckoutSessionQuery = gql`
  mutation CreateMyCheckoutSession(
    $redirectUrl: String!
    $lineItems: [Stripe_CheckoutSessionLineItemsPropertyInput!]!
    $mode: String
  ) {
    session: createMyCheckoutSession(lineItems: $lineItems, redirectUrl: $redirectUrl, mode: $mode) {
      id
    }
  }
`;

export async function createMyCheckoutSession(accessToken, payload) {
  const client = new GraphQLClient(apiUrl);
  client.setHeader('Authorization', `Bearer ${accessToken}`);
  const data = await client.request(createMyCheckoutSessionQuery, payload);
  return data?.session;
}

const getStripeProductQuery = gql`
  query GetStripeProductsQuery {
    products: getStripeProducts {
      id
      name
      description
      images
      prices {
        id
        unitAmount: unit_amount
        currency
        recurring {
          interval
          intervalCount: interval_count
        }
      }
    }
  }
`;

export async function getStripeProductList() {
  const client = new GraphQLClient(apiUrl);
  client.setHeader('Authorization', `Bearer ${apiKey}`);
  const data = await client.request(getStripeProductQuery);
  return data?.products;
}

const deleteMySubscriptionQuery = gql`
  mutation DeleteMySubscription($subscriptionId: String!) {
    subscription: deleteMySubscription(subscriptionId: $subscriptionId) {
      id
      status
    }
  }
`;

export async function deleteMySubscription(accessToken, payload) {
  const client = new GraphQLClient(apiUrl);
  client.setHeader('Authorization', `Bearer ${accessToken}`);
  const data = await client.request(deleteMySubscriptionQuery, payload);
  return data?.subscription;
}

const getMyInvoicesQuery = gql`
  query GetMyInvoicesQuery {
    invoices: getMyInvoices(status: "paid") {
      id
      total
      currency
      invoicePdf: invoice_pdf
      paid
      created
      lines {
        data {
          id
          amount
          currency
          description
          quantity
        }
      }
    }
  }
`;

export async function getMyInvoices(accessToken) {
  const client = new GraphQLClient(apiUrl);
  client.setHeader('Authorization', `Bearer ${accessToken}`);
  const data = await client.request(getMyInvoicesQuery);
  return data?.invoices;
}
