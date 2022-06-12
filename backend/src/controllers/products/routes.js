import { ProductsController } from './productsController.js'
import { createRouter } from '../../utils/createRouter.js'


const productsController = new ProductsController()

const routes = [
    {
        path: '/products',
        method: 'GET',
        handler: productsController.getProducts.bind(productsController)
    },
    {
        path: '/products/slug/:slug',
        method: 'GET',
        handler: productsController.getProductBySlug.bind(productsController)
    },
    {
        path: '/products/:id',
        method: 'GET',
        handler: productsController.getProductById.bind(productsController)
    },

]


export default createRouter(routes)
