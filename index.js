const express = require('express');
const productRoutes= require('./routes/productRoutes');
const cors= require('cors');
const app = express();
const dotEnv= require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes=require('./routes/vendorRoutes');

const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const PORT=process.env.PORT || 4000;
const path=require('path');

dotEnv.config();
app.use(cors());
mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));
app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);

app.use('/firm',firmRoutes);

app.use('/product',productRoutes);

app.use('/uploads',express.static('uploads'));

app.listen(PORT, (req, res) => {    
    console.log(`Server is running on port ${PORT}`);
});    

app.use('/', (req, res) => {
    res.send('<h1>Welcome to Ruchulu<h1>');
});
