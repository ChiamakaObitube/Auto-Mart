import Helper from '../../middleware/helper';
import orderQueries from '../../models/V2/order';
import db from '../../database/index';


class orderController {
  static async postOrder(req, res) {
    try {
      const { token } = req;
      const status = 'pending';

      const values = [
        req.body.car_id,
        req.user.id,
        new Date(),
        status,
        parseFloat(req.body.amount),
        prseFloat(areq.body.price_offered),
      ];
      const { rows } = await db.query(orderQueries.createOrderQuery, values);

      const {
        id,
        car_id,
        buyer,
        created_on,
        price: amount,
        price,
        price_offered,
      } = rows[0];

      const orderData = {
        token,
        id,
        car_id,
        buyer,
        // status,
        // created_on,
        // price,
        amount,
        price_offered,
      };

      return res.status(201).send({
        status: 201,
        message: 'Purchase Order created successfully',
        data: orderData,
      });
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        status: 500,
        error,
      });
    }
  }

  static async updatePurchaseOrderPrice(req, res) {
    try {
      const { rows } = await db.query(orderQueries.getOrderByIdQuery, [req.params.id]);
      const values = [
        req.params.id,
        req.body.price_offered,
      ];
      // Purchase order price offered can only be updated if order status is pending
      const updatedOrderPrice = await db.query(orderQueries.updateOrderPriceQuery, values);
      const token = Helper.generateToken(updatedOrderPrice);
      if (!rows[0]) {
        return res.status(404).send({
          message: 'order does not exist',
        });
      }
      const updatedOrder = {
        token,
        updatedOrderPrice,
      };
      if (updatedOrderPrice.rows[0].status !== 'pending') {
        return res.status(400).send({
          error: 'you can only update a pending order.',
        });
      }
      return res.status(200).send({
        status: 200,
        data: updatedOrder,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: 'Error updating purchase order price offered, try again',
      });
    }
  }

  static async getAllOrders(req, res) {
    try {
      const { rows, rowCount } = await db.query(orderQueries.allOrdersQuery);
      if (rowCount === 0) {
        return res.status(404).send({
          message: 'There are no orders in this database',
        });
      }
      if (!req.user.isAdmin) {
        return res.status(401).send({
          status: 401,
          error: 'You are not authorized to perform this action',
        });
      }
      return res.status(200).send({
        message: 'All orders retrieved successfully',
        data: rows,
        rowCount,
      });
    } catch (error) {
      return res.status(400).send({
        status: 500,
        error: 'Error fetching orders, try again',
      });
    }
  }

  static async getSpecificOrder(req, res) {
    try {
      const { rows } = await db.query(orderQueries.specificOrderQuery, [req.params.id]);

      if (!rows[0]) {
        return res.status(404).send({
          message: 'order does not exist',
        });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: 'Error fetching order, try again',
      });
    }
  }

  
}

export default orderController;
