const express = require('express');
const router = express.Router();
const pool = require("../db");

//insert
router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        await pool.query(
            "INSERT INTO tenant (tenant_id,full_name,tel_number,email) values (?,?,?,?)",
            [req.body.tenant_id, req.body.full_name, req.body.tel_number,req.body.email]);
        res.json("tenant is added");

    } catch (err) {
        console.error(err.message);
        res.json("invalid input due to duplicate entry some one has the same id");
    }
});


//get all data
router.get("/", async (req, res) => {
    try {
        const tenant = await pool.query("SELECT tenant_id,full_name,tel_number,email FROM tenant");
        console.log(tenant);
        res.json(tenant[0]);
    } catch (err) {
        console.error(err.message);
        res.status(400).send({ message: 'error!' });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const tenant = await pool.query("SELECT tenant_id,full_name,tel_number,email FROM tenant where tenant_id=?", [req.params.id]);
        console.log(tenant);
        res.json(tenant[0]);
    } catch (err) {
        console.error(err.message);
        res.status(400).send({ message: 'error!' });
    }
});

//update 
router.put("/email/:id", async (req, res) => {
    try {
            await pool.query(
                "UPDATE tenant SET email=? WHERE tenant_id = ?",
                [req.body.email, req.params.id]
            );
            res.json("tenant was updated");
        } catch (err) {
        console.error(err.message);
        res.status(400).send({ message: 'error!' });
    }
});

//update tel_number
router.put("/tel_number/:id", async (req, res) => {
    try {
        await pool.query(
            "UPDATE tenant SET tel_number=? WHERE landlord_id = ?",
            [req.body.tel_number, req.params.id]
        );
        res.json("tenant was updated");
    } catch (err) {
    console.error(err.message);
    res.status(400).send({ message: 'error!' });
}
});
//delete Element
router.delete("/:id", async (req, res) => {
    try {

        await pool.query("DELETE FROM tenant WHERE landlord_id = ?", [req.params.id]);

        res.json("tenant  is deleted");
    } catch (err) {
        console.error(err.message);
        res.status(400).send({ message: 'error!' });
    }
});



module.exports=router;