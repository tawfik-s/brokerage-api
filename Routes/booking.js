const express = require('express');
const router = express.Router();
const pool = require("../db");




router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        //need to check if its valid

        await pool.query(
            "Insert Into booking(booking_id,in_date,out_date,apartment_id,tenant_id) values(?,?,?,?,?)",
            [req.body.booking_id, req.body.in_date, req.body.out_date, req.body.apartment_id, req.body.tenant_id]);

        //make the apartment not free

        res.json("new booking is added");
    }
    catch (err) {
        console.log(err.message);
        res.json("error while inserting the data");
    }
});

router.get("/", async (req, res) => {
    try {
        const booking = await pool.query("select booking_id,in_date,out_date,apartment_id,tenant_id from booking");
        console.log(booking);

        res.json(booking[0]);

    } catch (err) {
        console.error(err.message);
        res.status(400).send({ message: 'error!' });
    }
});

router.delete("/:id", async (req, res) => {
    try {

        await pool.query("DELETE FROM booking WHERE booking_id = ?", [req.params.id]);

        //update the apartment table

        res.json("element  is deleted");
    } catch (err) {
        console.error(err.message);
        res.status(400).send({ message: 'error!' });
    }
});




module.exports = router;