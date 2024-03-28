
import { handleDeleteRequest } from "../../../../utils/controller/product-controller";
import connectDB from "../../../../utils/db";

connectDB();
export default async function handler(req, res) {
    if (req.method === "DELETE") {
        await handleDeleteRequest(req, res);
    }
    res.status(404).json({ msg: "aldaa grlaa" });
}
