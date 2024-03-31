export default {
    apiV1: '/api/v1',
    userRoute: {
        root: '/auth',
        register: '/register',
        login: '/login'
    },
    productRoute: {
        root: '/product',
        webAppList: '/web-app-list',
        createNewOne: '/create-new-one',
        findOne: '/find-one/:id'
    },
    orderRoute: {
        root: '/order',
        webAppList: '/web-app-list',
        placeOrder: '/place-order',
        findOne: '/find-one/:id',

    },
    cardRoute: {
        root: '/card',
        addToCart: '/add-to-cart',
        viewCart: '/view-cart',
        updateCartItem: '/update-cart-item',
        removeCartItem: '/remove-cart-item'
    },
    categoryRoute: {
        root: '/category',
        webAppList: '/web-app-list',
        createNewOne: '/create-new-one',
    },
    
}