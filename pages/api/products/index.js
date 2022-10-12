import ProductRepository from "../../../src/ProductRepository"
const productRepository = new ProductRepository()

export default async function handler(req, res) {
    let response = { data: null, error: null }

    if (req.method === 'POST') {
        try {
            const resp = await productRepository.createProduct(req.body)
            response.data = resp.data
        } catch (error) {
            response.error = error
            console.log(error.data);
        }
        return res.json(response)
    } else {
        // Get
        try {
            const resp = await productRepository.getAllProducts()
            response.data = resp.data.products
        } catch (error) {
            response.error = error
        }
        return res.json(response)
    }

}