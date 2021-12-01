import { Themed, Divider, Alert, Spinner, Container } from 'theme-ui';
import { Page } from 'components/layout';
import { ProductList } from 'components/products';
import useTakeshape from 'lib/hooks/use-takeshape';

function HomePage() {
  const { data: productsData, error: productsError } = useTakeshape('GetStripeProducts', {
    useApiKeyAuthentication: true
  });

  return (
    <Page>
      <Themed.h1>Products</Themed.h1>
      <Divider />

      {!productsData && (
        <Container variant="layout.loading">
          <Spinner />
        </Container>
      )}

      {productsData && <ProductList products={productsData.products} />}

      {productsError && (
        <>
          <Alert>Error loading products</Alert>
          <pre style={{ color: 'red' }}>{JSON.stringify(productsError, null, 2)}</pre>
        </>
      )}
    </Page>
  );
}

export default HomePage;
