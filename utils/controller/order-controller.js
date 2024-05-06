import Order from "../models/order-model";

export async function handleGetRequest(req, res) {
  try {
    const orders = await Order.find().populate("productId");
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error in GET handler:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

export async function handleGetDetailRequest(req, res) {
  try {
    const { id } = req.query;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Missing order ID" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Error in GET detail handler:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

export async function handleGetRequestDetail(req, res) {
  try {
    const { id } = req.params; // Ensure consistent retrieval of ID
    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Missing order ID" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Error in GET request detail handler:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

export async function handlePostRequest(req, res) {
  try {
    const newOrder = await Order.create(req.body); // Validate input if needed

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    console.error("Error in POST handler:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to create order",
    });
  }
}

export async function handleDeleteRequest(req, res) {
  try {
    const { id } = req.query;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Missing order ID" });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    res.status(204).json(); // No content, as the item is deleted
  } catch (error) {
    console.error("Error in DELETE handler:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}

export async function handlePutRequest(req, res) {
  try {
    const { id } = req.query;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Missing order ID" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error in PUT handler:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to update order",
    });
  }
}
