import React from 'react';
import useSWR from 'swr';
import { Themed, Divider, Heading } from 'theme-ui';
import Layout from '../components/layout';
import { ProductList } from '../components/products';
import { get } from '../lib/utils/fetcher';

export default function ProductsPage() {
  const { data: products, error: productsError } = useSWR('/api/products', get);

  return (
    <Layout>
      <Themed.h1>Products</Themed.h1>
      <Divider />

      {!products && <Heading>Loading Stripe products...</Heading>}

      {products && <ProductList products={products} />}

      {productsError && (
        <>
          <Heading>Error loading products</Heading>
          <pre style={{ color: 'red' }}>{JSON.stringify(productsError, null, 2)}</pre>
        </>
      )}
    </Layout>
  );
}
