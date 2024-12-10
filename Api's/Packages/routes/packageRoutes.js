const express = require('express')
const router = express.Router()

const package_db = require('../models/db_schema')

router.post('/api/create', (req, res) => {
    const { name, price, banquet_id } = req.body;

    try {
        const package = new package_db({
            name,
            price,
            banquet_id
        })
        package.save()
        
        res.json({ status: true, msg: 'Data Stored successfully' })
    } catch (err) {
        res.status(500).json({ status: false, msg: `failed to insert data: ${err.message}` })
    }
})

router.get('/api/packages', async (req, res) => {
    try {
        const packages = await package_db.find({});
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
})

router.get('/api/package/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const package = await package_db.findById(id)

        if (!package)
            return res.status(404).json({ status: false, msg: 'No package with given id' })

        res.status(200).json(package)
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
})

router.put('/api/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const updatedPackage = await package_db.findByIdAndUpdate(id, data, { new: true })
        //new to get updated data in variable otherwise it will give old data

        if (!updatedPackage)
            return res.status(404).json({ status: false, msg: 'Package with provided id not found' })

        res.status(200).json({ status: true, msg: updatedPackage })
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
})

router.delete('/api/delete/:id', async (req, res) => {
    try {
        const { id } = req.params

        const deletePackage = await package_db.findByIdAndDelete(id)

        if (!deletePackage)
            return res.status(404).json({ status: false, msg: 'Package with provided id not found' })

        res.status(200).json({ status: true, msg: 'Package deleted successfully' })
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
})


module.exports=router