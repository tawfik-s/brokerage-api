const express = require('express');
const router = express.Router();
const pool = require("../db");



router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        await pool.query(
            "Insert Into apartment(apartment_id,address,rooms,description,price,free,landlord_id) values(?,?,?,?,?,?,?)",
            [req.body.apartment_id, req.body.address, req.body.rooms, req.body.description, req.body.price, req.body.free, req.body.landlord_id]);

        res.json("apartment is added");
    }
    catch (err) {
        console.log(err.message);
        res.json("error while inserting the data");
    }
});

router.get("/", async (req, res) => {
    try {
        const apartment = await pool.query("select apartment_id,address,rooms,description,price,free,landlord_id from apartment");
        console.log(apartment);
        res.json(apartment[0]);

    } catch (err) {
        console.error(err.message);
        res.status(400).send({ message: 'error!' });
    }
});

router.delete("/:id", async (req, res) => {
    try {

        await pool.query("DELETE FROM apartment WHERE apartment_id = ?", [req.params.id]);

        res.json("element  is deleted");
    } catch (err) {
        console.error(err.message);
        res.status(400).send({ message: 'error!' });
    }
});



module.exports = router;