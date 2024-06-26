import {
  handleDeleteRequest,
  handleGetDetailRequest,
  handlePutRequest,
} from "../../../../utils/controller/product-controller";
import connectDB from "../../../../utils/db";

connectDB();
export default async function handler(req, res) {
  if (req.method === "DELETE") {
    await handleDeleteRequest(req, res);
  }
  if (req.method === "PUT") {
    await handlePutRequest(req, res);
  }
  if (req.method === "GET") {
    await handleGetDetailRequest(req, res);
  }
  res.status(404).json({ msg: "aldaa grlaa" });
}
