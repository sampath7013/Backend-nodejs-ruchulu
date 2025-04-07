const Product= require("../models/Product");

const Firm= require("../models/Firm");
const multer = require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+Path.extname(file.originalname));
    }
});
const upload=multer({storage:storage});

const addProduct=async(req,res)=>{
    try{
        const {name,price,description,category,bestSeller}=req.body;
        const image=req.file?req.file.filename:undefined;
        const firmId=req.params.firmId;
        const firm=await Firm.findById(firmId);
        if(!firm) return res.status(404).json({message:"Firm not found"});
        const product=new Product({name,price,description,category,bestSeller,image,firm:firm._id});
        const savedProduct=await product.save();
        firm.products.push(savedProduct);
        await firm.save();
        res.status(200).json(savedProduct);
    }
    catch(err){
        console.log(err);
        res.status(500).json("Internal server error");
    }
}

const getProductsByFirm=async(req,res)=>{
    try{
        const firmId=req.params.firmId;
        const firm=await Firm.findById(firmId).populate('products');
        if(!firm) return res.status(404).json({message:"Firm not found"});
        const restaurantName=firm.firmName;
        const products=await Product.find({firm:firmId});
        res.status(200).json({restaurantName,products});

    }
    catch(err){
        console.log(err);
        res.status(500).json("Internal server error");
    }
}

const deleteProductById=async(req,res)=>{
    try{
        const productId=req.params.productId;
        const product=await Product.findByIdAndDelete(productId);
        if(!product) return res.status(404).json({message:"Product not found"});
        res.status(200).json({message:"Product deleted successfully"});
    }
    catch(err){
        console.log(err);    
        res.status(500).json("Internal server error");
    }
}

module.exports={addProduct:[upload.single('image'),addProduct],getProductsByFirm,deleteProductById};