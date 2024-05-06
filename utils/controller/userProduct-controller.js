import Template from "../models/userProduct";

export async function handleGetRequest(req, res) {
  try {
    const data = await Template.find().populate("productId");
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in GET handler:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

export async function handleGetDetailRequest(req, res) {
  try {
    const { id } = req.query;
    console.log(id);
    const data = await Template.findById(id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in GET handler:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
export async function handleGetRequestDetail(req, res) {
  try {
    const data = await Template.findById(req.params.id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in GET handler:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

export async function handlePostRequest(req, res) {
  try {
    console.log("----------------- rq ", req.body);
    const input = {
      ...req.body,
    };
    const data = await Template.create(input);

    res.status(201).json({
      success: true,
      msg: "Post created successfully",
      data,
    });
  } catch (error) {
    console.error("Error in POST handler:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}

export async function handleDeleteRequest(req, res) {
  try {
    const { id } = req.query;
    const data = await Template.findByIdAndDelete(id, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      msg: "Post deleted successfully",
      data: data,
    });
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
    const input = {
      ...req.body,
    };
    const data = await Template.findByIdAndUpdate(id, input, { new: true });
    res.status(201).json({
      success: true,
      msg: "Post updated successfully",
      data,
    });
  } catch (error) {
    console.error("Error in PUT handler:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
