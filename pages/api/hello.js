import ProductRepository from '../../src/ProductRepository'
const productRepository = new ProductRepository()



export default async function handler(req, res) {
  const products = await productRepository.getAllProducts()
  console.log(products.data.products[0]);
  res.status(200).json(products.data)
}
