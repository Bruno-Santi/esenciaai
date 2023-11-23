const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv'); dotenv.config();
const { HS_API_KEY, HS_PASSWORD, HS_NAME } = process.env;


const getAllProducts = async () => {

    try {
        const baseUrl = `https://${HS_API_KEY}:${HS_PASSWORD}@${HS_NAME}.myshopify.com`;

        const response = await axios.get(`${baseUrl}/admin/api/2021-07/products.json`);
        return response.data.products;
    } catch (error) { throw error }
}

const filterProducts = (list) => {
    try {
        const result = [];

        list.forEach(product => {

            const parent = {
                parent_id: uuidv4(),
                name: product.title,
                search_text: product.title,
                image: product.image.src,
                json_product: JSON.stringify(product),
            };

            product.variants.forEach(variant => {
                result.push({
                    ...parent,
                    product_id: uuidv4(),
                    external_id: variant.id,
                    search_text: parent.search_text + " " + variant.title,
                    name: parent.name + " " + variant.title,
                    price: parseInt(variant.price) || 0,
                    sku: variant.sku || "",
                    store_product_id: variant.product_id,
                });
            });

        });
        return result;
    } catch (error) { throw error };
};

const getAllProductsFromHeavenStore = async () => {
    const listProducts = await getAllProducts();
    return filterProducts(listProducts);
};

module.exports = getAllProductsFromHeavenStore;