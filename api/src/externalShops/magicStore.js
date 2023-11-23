const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { URLSearchParams } = require('url');
const dotenv = require('dotenv'); dotenv.config();
const { MS_APP_KEY, MS_APP_TOKEN, MS_ACCOUNT_NAME, MS_ENVIRONMENT} = process.env;

const getAllProducts = async () => {
    try {

        const baseUrl = `https://${MS_ACCOUNT_NAME}.${MS_ENVIRONMENT}.com.br/api/catalog_system/pub/products/search`;
        const response = await axios.get(baseUrl, {
            headers: {
                'X-VTEX-API-AppKey': MS_APP_KEY,
                'X-VTEX-API-AppToken': MS_APP_TOKEN,
            }
        });
        return response.data;
    } catch (error) { throw error }
}

const filterProducts = (list) => {
    try {
        const result = [];

        list.forEach(product => {

            const parent = {
                parent_id: uuidv4(),
                external_id: product.productId,
                json_product: JSON.stringify(product),
            };

            product.items.forEach(variant => {

                const urlWithSku = variant.sellers[0].addToCartLink || "";
                const getSkuParam = new URLSearchParams(new URL(urlWithSku).search).get('sku');

                result.push({
                    ...parent,
                    product_id: uuidv4(),
                    name: variant.nameComplete,
                    search_text: variant.nameComplete,
                    price: variant.sellers[0].commertialOffer.Price || 0,
                    sku: getSkuParam,
                    store_product_id: variant.itemId,
                    image: variant.images[0].imageUrl || "",
                });
            });

        });
        return result;
    } catch (error) { throw error };
};


const getAllProductsFromMagicStore = async () => {
    const listProducts = await getAllProducts();
    return filterProducts(listProducts);
};

module.exports = getAllProductsFromMagicStore;