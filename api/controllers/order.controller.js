import Order from "../modules/order.module.js";

// create new order

export const createOrder = async (req, res, next) => {
  try {
    const { orderDate, address, foodMenus } = req.body;
    const userId = req.user.id;

    const newOrder = await Order.create({
      orderDate: orderDate,
      address: address,
      user: userId,
      foodMenus: foodMenus,
    });

    if (!newOrder) {
      return res.json({
        status: 400,
        message: "Order wasn't created",
      });
    }

    res.json({
      status: 200,
      message: "Thank you! We are preparing your delicious food.",
      newOrder,
    });

  } catch (err) {
    next(err);
  }
};


//  update order 

export const updateOrder = async (req, res, next) => {
  try {
    const { orderDate, address, foodMenus } = req.body;
    const orderId = req.params.id;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        orderDate,
        address,
        foodMenus,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.json({
        status: 404,
        message: "Order not found",
      });
    }

    res.json({
      status: 200,
      message: "Order successfully updated",
      updatedOrder,
    });

  } catch (err) {
    next(err);
  }
};


// get one order by Id

export const getUniqueOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    const currentOrder = await Order.findById(orderId);

    if (!currentOrder) {
      return res.json({
        status: 404,
        message: "Order not found",
      });
    }

    res.json({
      status: 200,
      currentOrder
    });

  } catch (err) {
    next(err);
  }
};



// get all orders

export const getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await Order.find();

    if (!allOrders) {
        return res.json({
          status: 404,
          message: "Orders not found",
        });
      }

    res.json({
      status: 200,
      allOrders,
    });

  } catch (err) {
    next(err);
  }
};


// delete order by Id

export const deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.json({
        status: 404,
        message: "Order not found",
      });
    }

    res.json({
      status: 200,
      message: "Order successfully deleted",
      deletedOrder,
    });

  } catch (err) {
    next(err);
  }
};
