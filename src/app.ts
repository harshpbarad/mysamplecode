import express from "express";
import dbInit from "./model/init";
import cors from "cors";
import appRouter from "./routes/v1";

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.use("/api", appRouter);

app.patch("/api/sync", async (req, res) => {
  try {
    const sync = await dbInit();
    res.status(200).json({ ...sync, error: false });
  } catch (err) {
    console.log("ERR", err);
    let msg: any = "Internal Server Error";
    if (err instanceof Error) {
      msg = err.message;
    } else if (err) {
      msg = err;
    }
    return res.status(400).json({ errorMsg: msg, error: true });
  }
});

export default app;
