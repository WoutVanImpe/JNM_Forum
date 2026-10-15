import express from "express";
import path from "node:path";
import cors from "cors";
import userRoutes from "./routes/user.routes"

const PORT = process.env.API_PORT

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(process.cwd(), "public")));

app.use("/api/users", userRoutes);


app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

export default app;