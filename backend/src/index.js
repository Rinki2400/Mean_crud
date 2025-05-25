
const express = require('express')
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes'); 
const app = express()
const cors = require('cors');
app.use(cors());



const port = 3000
app.use(express.json());
 connectDB()



app.use('/', userRoutes); 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
