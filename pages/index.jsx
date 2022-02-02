import { Heading, Divider, Alert, Spinner, Container } from '@theme-ui/components';
import { Page } from 'components/layout';
import { ProductList } from 'components/products';
import { takeshapeApiUrl, takeshapeApiKey } from 'lib/config';
import { GetStripeProducts } from 'lib/queries';
import { createApolloClient } from 'lib/apollo';

function HomePage({ products, error }) {
  return (
    <Page>
      <Heading as="h1">Products</Heading>
      <Divider />

      {!products && (
        <Container variant="layout.loading">
          <Spinner />
        </Container>
      )}

      {products && <ProductList products={products} />}

      {error && (
        <>
          <Alert>Error loading products</Alert>
          <pre style={{ color: 'red' }}>{JSON.stringify(error, null, 2)}</pre>
        </>
      )}
    </Page>
  );
}

export async function getStaticProps() {
  const client = createApolloClient(takeshapeApiUrl, () => takeshapeApiKey);

  let products = [];
  let error = null;

  try {
    const { data } = await client.query({
      query: GetStripeProducts
    });

    if (data.errors) {
      error = data.errors;
    } else {
      products = data.products;
    }
  } catch (err) {
    console.error(err);
    error = Array.isArray(err) ? err.map((e) => e.message).join() : err.message;
  }

  return { props: { products, error } };
}

export default HomePage;
