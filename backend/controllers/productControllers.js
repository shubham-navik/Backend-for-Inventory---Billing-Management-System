const Product = require("../models/Product");
// const User = require("../models/User");
// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    // BusinessId comes from token, not body
    const businessId = req.user.businessId;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and Price are required" });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      businessId,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({message:"product cretaed succesfully",savedProduct});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all products for a business
exports.getProducts = async (req, res) => {
    try {
        const businessId = req.user.businessId;
        const products = await Product.find({ businessId });

        res.status(200).json({
            message: "products fetched succesfully",
            products
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "error in featching products"
        });
    }
}

// update products
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const businessId = req.user.businessId;
        const existProduct = await Product.findOne({_id:id});
        if (!existProduct) {
            return res.status(404).json({
                message: "product not found"
            })
        }
        if (existProduct.businessId !== businessId) {
            return res.status(403).json({
                message: "you are not authorized to update this product"
            })
        }
        const updatedProduct = await Product.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({
            message: "product updated succesfully",
            updatedProduct
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:"server error"
        })
    }
}


//delete Product by id
exports.deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const businessId = req.user.businessId;
        const existProduct = await Product.findOne({_id:id});
        if (!existProduct) {
            return res.status(404).json({
                message: "product not found"
            })
        }
        if (existProduct.businessId !== businessId) {
            return res.status(403).json({
                message: "you are not authorized to update this product"
            })
        }

        await Product.findByIdAndDelete(id);
        res.status(200).json({
            message: "product deleted succesfully"
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"server error in deleting product"
        })
    }
}