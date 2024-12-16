// Interaksi dengan database

const prisma = require("../db");

const findProducts = async () => {
    const products = await prisma.product.findMany()

    return products
}

const findProductById = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })

    return product
}

const insertProduct = async (ProductData) => {
    const product = await prisma.product.create({
        data: {
            name: ProductData.name,
            description: ProductData.description,
            price: ProductData.price,
            image: ProductData.image
        }
    })

    return product
}

const deleteProductById = async (id) => {
    await prisma.product.delete({
        where: {
            id
        }
    })
}

const editProductById = async (id, productData) => {
    const product = await prisma.product.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            image: productData.image
        }
    })

    return product
}

module.exports = {
    findProducts,
    findProductById,
    insertProduct,
    deleteProductById,
    editProductById
}