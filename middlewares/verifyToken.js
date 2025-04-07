const Vendor = require('../models/vendor');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');
dotEnv.config();
const secretKey = process.env.WhatIsYourName;
const verifyToken = async (req, res, next) => {
    
        const token = req.headers.token;
        if (!token) return res.status(403).json({ msg: 'Token not provided' });

        try {
            const decoded = jwt.verify(token, secretKey);
            const vendor = await Vendor.findById(decoded.vendorId);
            if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
            req.vendorId=vendor._id;
            next();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Invalid token' });
        }
};

module.exports = verifyToken;