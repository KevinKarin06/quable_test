import ProductRepository from '../../../src/ProductRepository'
const productRepository = new ProductRepository()

export default async function handler(req, res) {
    let response = { data: null, error: null }

    if (req.method === 'GET') {
        // Get
    } else {
        try {
            const { id } = req.query
            const resp = await productRepository.deleteProduct(id)
            response.data = resp.data
        } catch (error) {
            response.error = error
            console.log(error);
        }
        return res.json(response)
    }
}