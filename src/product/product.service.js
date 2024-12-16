// Handle business Logic

const { findProducts, findProductById, insertProduct, deleteProductById, editProductById } = require("./product.repository");

const getAllProducts = async () => {
    const products = await findProducts()

    return products
}

const getProductById = async (id) => {

    const product = await findProductById(id)

    if (!product) {
        throw Error("Product not Found")
    }

    return product
}

const createProduct = async (newProductData) => {

    const product = await insertProduct(newProductData)

    return product
}

const deleteProduct = async (id) => {

    await getProductById(id)

    await deleteProductById(id)
}

const editProduct = async (id, productData) => {

    await getProductById(id)

    const product = await editProductById(id, productData)

    return product
}



module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    editProduct
}