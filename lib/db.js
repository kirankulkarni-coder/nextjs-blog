import mongoose from "mongoose";
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Error Connecting the DB", err);
  });

export default mongoose;
