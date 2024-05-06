import {
  handleDeleteRequest,
  handleGetDetailRequest,
  handlePutRequest,
} from "../../../../utils/controller/order-controller";
import connectDB from "../../../../utils/db";

export default async function handler(req, res) {
  await connectDB(); // Ensure the database is connected

  switch (req.method) {
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    case "GET":
      await handleGetDetailRequest(req, res);
      break;

    case "PUT":
      await handlePutRequest(req, res);
      break;

    default:
      res.status(405).json({
        success: false,
        message: "Method Not Allowed",
        allowedMethods: ["DELETE", "PUT"],
      });
      break;
  }
}
