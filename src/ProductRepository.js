import axios from 'axios'

const client = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'X-Shopify-Access-Token': process.env.ACCESS_TOKEN,
    }
});

class ProductRepository {

    getAllProducts = async () => {
        return await client.get('/api/2022-10/products.json')
    }
    deleteProduct = async (id) => {
        return await client.delete(`/api/2022-10/products/${id}.json`)
    }
    createProduct = async (data) => {
        return await client.post('/api/2022-10/products.json', data)
    }
}

export default ProductRepository;