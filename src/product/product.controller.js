// Layer untuk Handle Request dan Response
// Handle Validasi Body

const express = require("express")
const { getAllProducts, getProductById, createProduct, deleteProduct, editProduct } = require("./product.service")

const router = express.Router()

router.get("/", async (req, res) => {
    const products = await getAllProducts()

    res.send(products)
})

router.get("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id)
        const product = await getProductById(parseInt(productId))

        res.send(product)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post("/", async (req, res) => {
    try {
        const newProductData = req.body

        const product = await createProduct(newProductData)

        res.send({
            data: product,
            message: "Create Product Success"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const productId = req.params.id

        await deleteProduct(parseInt(productId))

        res.send("Product Deleted")
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.put("/:id", async (req, res) => {
    const productId = req.params.id
    const productData = req.body

    if (!(productData.name && productData.description && productData.price && productData.image)) {
        return res.status(400).send("Some Fields Missing")
    }

    const product = await editProduct(parseInt(productId), productData)

    res.send({
        data: product,
        message: "Edit Product Success"
    })
})

router.patch("/:id", async (req, res) => {
    try {
        const productId = req.params.id
        const productData = req.body

        const product = await editProduct(parseInt(productId), productData)

        res.send({
            data: product,
            message: "Edit Product Success"
        })
    } catch (error) {
        res.status(404).send(error.message)
    }

})

module.exports = router