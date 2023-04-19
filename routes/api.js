const api = require("express").Router();
// https://nodejs.org/api/fs.html
const fs = require("fs");
// https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// from localhost will appear as localhost/api/notes
api.get("/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;

        res.json(JSON.parse(data));
    });
});

api.post("/notes", (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const id = uuidv4();

        const newNote = {
            title,
            text,
            id,
        }

        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) {
                throw err;
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(newNote);
                fs.writeFile("./db/db.json", JSON.stringify(parsedData, null, 4), (err) => 
                    err ? console.error(err) : console.info("\nData added to db.json")
                );
            }
        });
        
        res.json("Data added to db.json")
    } else {
        res.error("Error in writing note");
    }
    
});

module.exports = api;