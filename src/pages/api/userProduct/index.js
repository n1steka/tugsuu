import {
  handlePostRequest,
  handleGetRequest,
} from "../../../../utils/controller/userProduct-controller";
import connectDB from "../../../../utils/db";

connectDB();
export default async function handler(req, res) {
  if (req.method === "POST") {
    await handlePostRequest(req, res);
  }
  if (req.method === "GET") {
    await handleGetRequest(req, res);
  }
  res.status(404).json({ msg: "aldaa grlaa" });
}
