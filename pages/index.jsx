import useSWR from 'swr';
import { Themed, Divider, Heading } from 'theme-ui';
import { Page } from 'components/layout';
import { ProductList } from 'components/products';
import { get } from 'lib/utils/fetcher';

export default function HomePage() {
  const { data: products, error: productsError } = useSWR('/api/products', get);

  return (
    <Page>
      <Themed.h1>Products</Themed.h1>
      <Divider />

      {!products && <Heading>Loading products...</Heading>}

      {products && <ProductList products={products} />}

      {productsError && (
        <>
          <Heading>Error loading products</Heading>
          <pre style={{ color: 'red' }}>{JSON.stringify(productsError, null, 2)}</pre>
        </>
      )}
    </Page>
  );
}
