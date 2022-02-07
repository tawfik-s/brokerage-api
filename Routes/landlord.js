const express = require('express');
const router = express.Router();
const pool = require("../db");

//insert
router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        await pool.query(
            "INSERT INTO landlord (landlord_id,full_name,tel_number,email) values (?,?,?,?)",
            [req.body.landlord_id, req.body.full_name, req.body.tel_number,req.body.email]);
        res.json("landlord is added");

    } catch (err) {
        console.error(err.message);
        res.json("invalid input due to duplicate entry some one has the same id");
    }
});


//get all data
router.get("/", async (req, res) => {
    try {
        const landlord = await pool.query("SELECT landlord_id,full_name,tel_number,email FROM landlord");
        console.log(landlord);
        res.json(landlord[0]);
    } catch (err) {
        console.error(err.message);
        res.status(400).send({ message: 'error!' });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const landlord = await pool.query("SELECT landlord_id,full_name,tel_number,email FROM landlord where landlord_id=?", [req.params.id]);
        console.log(landlord);
        res.json(landlord[0]);
    } catch (err) {
        console.error(err.message);
        res.status(400).send({ message: 'error!' });
    }
});

//update 
router.put("/email/:id", async (req, res) => {
    try {
            await pool.query(
                "UPDATE landlord SET email=? WHERE landlord_id = ?",
                [req.body.email, req.params.id]
            );
            res.json("landlord was updated");
        } catch (err) {
        console.error(err.message);
        res.status(400).send({ message: 'error!' });
    }
});

//update tel_number
router.put("/tel_number/:id", async (req, res) => {
    try {
        await pool.query(
            "UPDATE landlord SET tel_number=? WHERE landlord_id = ?",
            [req.body.tel_number, req.params.id]
        );
        res.json("landlord was updated");
    } catch (err) {
    console.error(err.message);
    res.status(400).send({ message: 'error!' });
}
});
//delete Element
router.delete("/:id", async (req, res) => {
    try {

        await pool.query("DELETE FROM landlord WHERE landlord_id = ?", [req.params.id]);

        res.json("element  is deleted");
    } catch (err) {
        console.error(err.message);
        res.status(400).send({ message: 'error!' });
    }
});



module.exports=router;