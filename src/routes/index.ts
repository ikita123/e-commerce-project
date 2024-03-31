import { Router } from 'express';
import {default as UserRoute} from './user.route'
import {default as ProductRoute} from './product.route'
import {default as OrderRoute} from './order.route'
import {default as CategoryRoute} from './category.route'
import {default as CardRoute} from './card.route'
import { RoutePath } from '../constants'


const { apiV1 } = RoutePath;
const routesList: any[] = [
    UserRoute, ProductRoute, OrderRoute, CategoryRoute, CardRoute
]
const router: Router = Router()

routesList.forEach((route: any) => 
    router.use(`${apiV1}${route.path}`, route.mainRouter))

export default router;


