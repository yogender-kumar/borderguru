import Order from '../controllers/order';
import express from 'express';

let router = express.Router();

// module.exports =  app => {
//     /**
//     * @swagger
//     * /login:
//     *   post:
//     *     description: Login to the application
//     *     produces:
//     *       - application/json
//     *     parameters:
//     *       - name: username
//     *         description: Username to use for login.
//     *         in: formData
//     *         required: true
//     *         type: string
//     *       - name: password
//     *         description: User's password.
//     *         in: formData
//     *         required: true
//     *         type: string
//     *     responses:
//     *       200:
//     *         description: login
//     */
//     // app.route('/v1/orders').post(Order.post);
//     // app.route('/v1/orders').get(Order.list);
//     // app.route('/v1/orders/:id').get(Order.get);
//     // app.route('/v1/orders/:id').put(Order.put);
//     // app.route('/v1/orders/:id').delete(Order.delete);
//     router.post('/v1/orders', Order.post);
//     router.get('/v1/orders', Order.list);
//     router.get('/v1/orders/:id', Order.get);
//     router.put('/v1/orders/:id', Order.put);
//     router.delete('/v1/orders/:id', Order.delete);

//     return router;
// };

router.post('/v1/orders', Order.post);
router.get('/v1/orders', Order.list);
router.get('/v1/orders/:id', Order.get);
router.put('/v1/orders/:id', Order.put);
router.delete('/v1/orders/:id', Order.delete);

module.exports = router;