import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import contactRoute from "./routes/contact.route.js";
import { join } from "@prisma/client/runtime/library";

const app = express();
const port = process.env.PORT || 8800;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/contacts", contactRoute);

app.listen(8800, () => {
  console.log("Server is running!");
});
