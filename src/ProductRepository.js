import axios from 'axios'

const client = axios.create({
    baseURL: 'https://test1-2661.myshopify.com/admin/',
    headers: {
        'X-Shopify-Access-Token': process.env.ACCESS_TOKEN,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
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