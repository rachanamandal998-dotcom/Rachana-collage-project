const express = require("express");
const app = express();

const cors = require("cors");
require("./src/database/index");
const adminSeeder = require("./adminSeeder");

app.use(cors());
app.use(express.json());

adminSeeder();

const path = require("path");
app.use("/storage", express.static(path.join(__dirname, "src/storage")));

const authRoutes =  require('./src/routes/adminRoute')
const courseRoutes = require('./src/routes/courseRoute')
const messageRoutes = require('./src/routes/messageRoute')
const userRoutes = require('./src/routes/userRoute')

app.use('/',authRoutes)
app.use('/course',courseRoutes)
app.use('/',messageRoutes)
app.use('/user/',userRoutes)


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Project has started at ${PORT}`);
});
