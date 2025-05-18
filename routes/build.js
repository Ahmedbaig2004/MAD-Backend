const express = require('express');
const Build = require('../models/Build');
// Update all imports to use consistent casing
const Processor = require('../models/Processor');  // Make sure it matches actual filename
const Gpu = require('../models/gpu');  // Keep lowercase if that's the actual filename
const Motherboard = require('../models/Motherboard');
const Ram = require('../models/ram');
const Ssd = require('../models/SSD');  // Changed from SSD to Ssd for consistency
const Case = require('../models/Case');
const Psu = require('../models/PSU');

const router = express.Router();

// Save a build
router.post('/savebuild', async (req, res) => {
    try {
        const { name, processor, gpu, motherboard, ram, ssd, case: pcCase, psu, totalPrice } = req.body;

        // Better validation and logging
        console.log('Received build data:', req.body);

        if (!name) {
            return res.status(400).json({ error: "Build name is required" });
        }

        if (typeof totalPrice !== 'number') {
            return res.status(400).json({ error: "Total price must be a number" });
        }

        // Create the build object with validated fields
        const buildData = {
            name,
            totalPrice
        };

        // Only add component references if they exist and are valid
        if (processor && typeof processor === 'string') buildData.processor = processor;
        if (gpu && typeof gpu === 'string') buildData.gpu = gpu;
        if (motherboard && typeof motherboard === 'string') buildData.motherboard = motherboard;
        if (ram && typeof ram === 'string') buildData.ram = ram;
        if (ssd && typeof ssd === 'string') buildData.ssd = ssd;
        if (pcCase && typeof pcCase === 'string') buildData.case = pcCase;
        if (psu && typeof psu === 'string') buildData.psu = psu;

        console.log('Creating build with:', buildData);
        const build = new Build(buildData);
        const savedBuild = await build.save();
        
        // Return the saved build immediately without populating
        res.json(savedBuild);
    } catch (error) {
        console.error("Error saving build:", error);
        
        // Return a more specific error message if possible
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: "Validation error", details: error.message });
        }
        
        if (error.name === 'CastError') {
            return res.status(400).json({ error: "Invalid ID format", details: error.message });
        }
        
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
});

// Get all builds
// Get all builds
router.get('/getbuilds', async (req, res) => {
    try {
        // Get all builds with proper sorting
        let builds = await Build.find().sort({ date: -1 });
        
        // Populate with proper collection references
        try {
            builds = await Build.populate(builds, [
                { path: 'processor' },
                { path: 'gpu' },
                { path: 'motherboard' },
                { path: 'ram' },
                { path: 'ssd' },
                { path: 'case' },
                { path: 'psu' }
            ]);
        } catch (populateError) {
            console.error("Error populating builds:", populateError);
            // Continue with unpopulated builds
        }
        
        res.json(builds);
    } catch (error) {
        console.error("Critical error in getbuilds:", error);
        res.status(500).json({ error: "Internal Server error occurred" });
    }
});

// Get a specific build by ID
router.get('/getbuild/:id', async (req, res) => {
    try {
        // Fetch the build with all component data in one query
        let build = await Build.findById(req.params.id)
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
        console.error("Error in getbuild:", error);
        res.status(500).json({ error: "Internal Server error occurred" });
    }
});

module.exports = router;