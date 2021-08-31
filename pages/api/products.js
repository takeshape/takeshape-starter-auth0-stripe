import { getStripeProductList } from '../../data/takeshape';

export default async function productsHandler(req, res) {
  try {
    const productList = await getStripeProductList();
    res.status(200).json(productList || []);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
}
