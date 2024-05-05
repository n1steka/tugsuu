import {
  handleDeleteRequest,
  handlePutRequest,
} from "../../../../utils/controller/order-controller";
import connectDB from "../../../../utils/db";

connectDB();
export default async function handler(req, res) {
  if (req.method === "DELETE") {
    await handleDeleteRequest(req, res);
  }
  if (req.method === "PUT") {
    await handlePutRequest(req, res);
  }
  res.status(404).json({ msg: "aldaa grlaa" });
}
