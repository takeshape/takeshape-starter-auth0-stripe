import { gql } from 'graphql-request';

export const GetStripeProducts = gql`
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
    customer: stripeCustomer {
      id
      name
      description
      address {
        line1
        line2
        city
        state
        postal_code
        country
      }
    }
  }
`;

export const GetMyProfile = gql`
  ${ProfileFieldsFragment}
  query GetMyProfile {
    profile: getMyProfile {
      ...ProfileFields
    }
  }
`;

export const UpsertMyProfile = gql`
  ${ProfileFieldsFragment}
  mutation UpsertMyProfile($firstName: String, $lastName: String, $bio: String, $avatarId: String) {
    profile: upsertMyProfile(firstName: $firstName, lastName: $lastName, bio: $bio, avatarId: $avatarId) {
      ...ProfileFields
    }
  }
`;

export const UploadAssets = gql`
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

export const GetMyCustomer = gql`
  query GetMyCustomer {
    profile: getMyProfile {
      customer: stripeCustomer {
        id
        name
        description
        address {
          line1
          line2
          city
          state
          postal_code
          country
        }
      }
    }
  }
`;

export const UpsertMyCustomer = gql`
  mutation UpsertMyCustomer($name: String, $description: String, $address: Stripe_CustomerAddressPropertyInput) {
    customer: upsertMyCustomer(name: $name, description: $description, address: $address) {
      id
      name
      description
    }
  }
`;

export const CreateMyCheckoutSession = gql`
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

export const GetMySubscriptions = gql`
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

export const DeleteMySubscription = gql`
  mutation DeleteMySubscription($subscriptionId: String!) {
    subscription: deleteMySubscription(subscriptionId: $subscriptionId) {
      id
      status
    }
  }
`;

export const GetMyInvoices = gql`
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

export const GetMyPayments = gql`
  query GetMyPaymentsQuery {
    payments: getMyPayments(limit: 50, expand: ["data.invoice"]) {
      id
      amount
      currency
      created
      invoice {
        ... on Stripe_Invoice {
          id
          paid
          invoicePdf: invoice_pdf
        }
      }
    }
  }
`;
