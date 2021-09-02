import { Grid, Box, Paragraph } from 'theme-ui';
import ProductCard from './product-card';

const ProductList = ({ products }) => {
  return (
    <>
      {products.length ? (
        <Grid gap={2} columns={4}>
          {products.map((product) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Grid>
      ) : (
        <Paragraph>No products to display!</Paragraph>
      )}
    </>
  );
};

export default ProductList;
