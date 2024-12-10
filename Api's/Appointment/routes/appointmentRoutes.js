const express = require('express')
const router = express.Router()

const appointment_db = require('../models/db_schema')

router.post('/api/create', (req, res) => {
    const { title, time, date, banquet_id } = req.body;

    const dateinput = new Date(date)
    dateinput.setHours(0, 0, 0, 0)

    try {
        const appointment = new appointment_db({
            title,
            time,
            date: dateinput,
            banquet_id
        })
        appointment.save()
            .then(() => res.json({ status: true, msg: 'Data Stored successfully' }))
            .catch(err => res.json({ status: false, msg: 'failed to insert data' }))
        // below catch wont work as there's a catch on .save so the error msg will be 
        // handled there and below catch will never get a chance to get executed
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
})

router.get('/api/appointments', async (req, res) => {
    try {
        const appointments = await appointment_db.find({});
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
})

router.get('/api/appointment/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await appointment_db.findById(id)

        if (!appointment)
            return res.status(404).json({ status: false, msg: 'No appointment with given id' })

        res.status(200).json(appointment)
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
})

router.put('/api/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const updatedAppointment = await appointment_db.findByIdAndUpdate(id, data, { new: true })
        //new to get updated data in variable otherwise it will give old data

        if (!updatedAppointment)
            return res.status(404).json({ status: false, msg: 'Appointment with provided id not found' })

        res.status(200).json({ status: true, msg: updatedAppointment })
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
})

router.delete('/api/delete/:id', async (req, res) => {
    try {
        const { id } = req.params

        const deleteAppointment = await appointment_db.findByIdAndDelete(id)

        if (!deleteAppointment)
            return res.status(404).json({ status: false, msg: 'Appointment with provided id not found' })

        res.status(200).json({ status: true, msg: 'Appointment deleted successfully' })
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
})


module.exports=router