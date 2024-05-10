import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/db.js";
dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, async () => {
      const serverURL = `http://localhost:${PORT}`;
      console.log(`SERVER is RUNNING on : ${serverURL}`);
    });
  })
  .catch((err) => {
    console.error(`DATABASE CONNECTION FAILED !!! ${err}`);
    process.exit(1);
  });
