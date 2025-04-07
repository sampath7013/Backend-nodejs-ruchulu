const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {    
        type: String,
    },
    category: {
        type: [
            {
                type: String,
                enum:['veg','nonveg']
            }
        ]
    },
    bestSeller: {
        type:String
    },
    firm: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm'
      }]
      
    
    });

    const  Product = mongoose.model('Product', productSchema);  
    module.exports = Product;  // make this available to other files in the project
    