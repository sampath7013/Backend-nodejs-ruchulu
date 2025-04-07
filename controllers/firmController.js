const Firm=require('../models/Firm');
const Vendor=require('../models/vendor');

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

const addFirm=async(req,res)=>{
    try{
        const {firmName,area,category,region,offer}=req.body;
    const image=req.file?req.file.filename:undefined;
    

    const vendor= await Vendor.findById(req.vendorId);
    if(!vendor) return res.status(404).json({message:"Vendor not found"});
    if (!Array.isArray(vendor.firm)) {
        vendor.firm = [];
    }
    const firm=new Firm({
        firmName,
        area,
        category,
        region,
        offer,
        image,
        vendor:vendor._id
    })
    const savedFirm= await firm.save();
    
    vendor.firm.push(savedFirm._id);
    
    await vendor.save();
    return res.status(200).json({message:"Firm added successfully"});
    }
    catch(err){
        console.error(err);
        res.status(500).json("Internal server error");
    }
};

const deleteFirmById = async (req, res) => {
    try{
            const firmId=req.params.firmId;
            const firm=await Firm.findByIdAndDelete(firmId);
            if(!firm) return res.status(404).json({message:"Firm not found"});
            res.status(200).json({message:"Firm deleted successfully"});
        }
        catch(err){
            console.log(err);    
            res.status(500).json("Internal server error");
        }
};


module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmById};