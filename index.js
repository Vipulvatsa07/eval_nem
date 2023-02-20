const { connection } = require("./config/db");
const express = require("express");
const { userRouter } = require("./Routes/User.route");
const { UserModel } = require("./model/User.model");
const {authentication}=require("./middleware/authenticate.middleware")
const {postRouter}=require("./Routes/Post.route")
const cors=require("cors")

require("dotenv").config();

const app = express();

app.use(cors())
app.use(express.json());    

app.use("/users", userRouter);
app.use(authentication)
app.use("/posts",postRouter)

app.use("/homepage",async (req, res) => {
})

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch {
    console.log("not connected to db");
  }

  console.log(`server running at port ${process.env.port}`);
});
