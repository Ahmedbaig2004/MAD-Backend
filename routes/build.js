const express = require('express');
const Build = require('../models/Build');
const router = express.Router();

// Save a build
router.post('/savebuild', async (req, res) => {
    try {
        const { name, processor, gpu, motherboard, ram, ssd, case: pcCase, psu, totalPrice } = req.body;

        const build = new Build({
            name,
            processor,
            gpu,
            motherboard,
            ram,
            ssd,
            case: pcCase,
            psu,
            totalPrice
        });

        const savedBuild = await build.save();
        
        res.json(savedBuild);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occurred");
    }
});

// Get all builds
router.get('/getbuilds', async (req, res) => {
    try {
        const builds = await Build.find()
            .populate('processor', 'CPU_name Image Price')
            .populate('gpu', 'GPU_name Image Price')
            .populate('motherboard', 'MOBO_name Image Price')
            .populate('ram', 'RAM_name Image Price')
            .populate('ssd', 'SSD_name Image Price')
            .populate('case', 'CASE_name Image Price')
            .populate('psu', 'PSU_name Image Price')
            .sort({ date: -1 });
        
        res.json(builds);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occurred");
    }
});

// Get a specific build by ID
router.get('/getbuild/:id', async (req, res) => {
    try {
        const build = await Build.findById(req.params.id)
            .populate('processor')
            .populate('gpu')
            .populate('motherboard')
            .populate('ram')
            .populate('ssd')
            .populate('case')
            .populate('psu');
        
        if (!build) {
            return res.status(404).json({ message: "Build not found" });
        }
        
        res.json(build);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occurred");
    }
});

// Delete a build
router.delete('/deletebuild/:id', async (req, res) => {
    try {
        const build = await Build.findByIdAndDelete(req.params.id);
        
        if (!build) {
            return res.status(404).json({ message: "Build not found" });
        }
        
        res.json({ message: "Build deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occurred");
    }
});

module.exports = router; 