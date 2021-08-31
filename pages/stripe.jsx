import React, { useState, useContext } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR, { mutate } from 'swr';
import getStripe from '../lib/utils/stripe';
import { CartDispatchContext, addToCart } from '../lib/contexts/cart';
import Layout from '../components/layout';
import CustomerForm from '../components/customer-form';
import { get, post } from '../lib/utils/fetcher';

// const addSubscription = async (e) => {
//   const session = await post('/api/my/checkout', { price: e.target.value });
//   const stripe = await getStripe();
//   await stripe.redirectToCheckout({
//     sessionId: session.id
//   });
//   mutate('/api/my/subscriptions');
// };

const Product = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useContext(CartDispatchContext);
  const { name, prices, description } = product;

  const handleAddToCart = (e) => {
    const priceIndex = e.target.value;
    const price = prices[priceIndex];
    console.log({ ...product, price });
    addToCart(dispatch, { ...product, price });
    setIsAdded(true);
  };

  return (
    <div>
      <div>{name}</div>
      <div>{description}</div>
      {prices.map((price, priceIndex) => (
        <div key={price.id}>
          <div>
            {(price.unit_amount / 100).toFixed(2)} {price.currency.toUpperCase()} / {price.recurring.interval}
          </div>
          <div>
            <button className={!isAdded ? '' : 'added'} type="button" value={priceIndex} onClick={handleAddToCart}>
              {!isAdded ? 'ADD TO CART' : '✔ ADDED'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default withPageAuthRequired(function StripePage() {
  const { data: subscriptions, error: subscriptionsError } = useSWR('/api/my/subscriptions', get);
  const { data: customer, error: customerError } = useSWR('/api/my/customer', get);
  const { data: products, error: productsError } = useSWR('/api/products', get);

  return (
    <Layout>
      <h1>Stripe</h1>

      {!customer && <p>Loading Stripe customer...</p>}

      {customer && (
        <div>
          <h2>Customer</h2>
          <hr />
          {customer ? <pre>{JSON.stringify(customer, null, 2)}</pre> : <pre>No customer created yet.</pre>}

          <h2>Update Stripe Customer</h2>
          <hr />
          <CustomerForm customer={customer} />
        </div>
      )}

      {customerError && (
        <>
          <p>Error loading Stripe customer</p>
          <pre style={{ color: 'red' }}>{JSON.stringify(customerError, null, 2)}</pre>
        </>
      )}

      {!subscriptions && <p>Loading Stripe subscriptions...</p>}

      {subscriptions && (
        <div>
          <h2>Subscriptions</h2>
          <hr />

          {subscriptions.length ? (
            <ul>
              {subscriptions.map((subscription) => (
                <li key={subscription.id}>
                  {subscription.items.data.map((item) => (
                    <div key={item.id}>
                      <div>{item.price.product.name}</div>
                      <div>
                        {(item.price.unit_amount / 100).toFixed(2)} {item.price.currency.toUpperCase()} /{' '}
                        {item.price.recurring.interval}
                      </div>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          ) : (
            <span>No subscriptions to display!</span>
          )}
        </div>
      )}

      {subscriptionsError && (
        <>
          <p>Error loading Stripe subscriptions</p>
          <pre style={{ color: 'red' }}>{JSON.stringify(subscriptionsError, null, 2)}</pre>
        </>
      )}

      {!products && <p>Loading Stripe products...</p>}

      {products && (
        <div>
          <h2>Products</h2>
          <hr />

          {products.length ? (
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <Product product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <span>No products to display!</span>
          )}
        </div>
      )}

      {productsError && (
        <>
          <p>Error loading Stripe products</p>
          <pre style={{ color: 'red' }}>{JSON.stringify(productsError, null, 2)}</pre>
        </>
      )}
    </Layout>
  );
});
