const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//get all ads

app.get("/ads", async (req, res) => {
    try {
      const allAds = await pool.query("SELECT * FROM prices");
      res.json(allAds.rows);
    } catch (err) {
      console.error(err.message);
    }
  });


//get an ad

app.get("/ads/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM prices WHERE id = $1", [
        id
      ]);
  
      res.json(todo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });


//update an ad

app.put("/ads/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { ad } = req.body;
      const { price } = req.body;
      const { hot } = req.body;
      const updateAd = await pool.query(
        "UPDATE prices SET ad = $1, price = $2, hot = $3 WHERE id = $4",
        [ad, price, hot, id]
      );
  
      res.json("Ad was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //delete an ad
  
  app.delete("/ads/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteAd = await pool.query("DELETE FROM prices WHERE id = $1", [
        id
      ]);
      res.json("Ad was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });
  
  app.listen(5000, () => {
    console.log("server has started on port 5000");
  });