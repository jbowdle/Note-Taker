const api = require("express").Router();
// https://nodejs.org/api/fs.html
const fs = require("fs");
// https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// the following endpoints will appear as /api/notes.
// They are implemented in the server.js file.

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

        // stores the title and text taken from the request body, along with the freshly generated unique id
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
                // Adds the new note to the data array
                parsedData.push(newNote);
                // converts the data array back into the db.json file
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

// to delete notes. A delete request is sent when the user clicks on the red trashcan next to a note
api.delete("/notes/:id", (req, res) => {
    const target = req.params.id;

    if (req.body) {
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) {
                throw err;
            } else {
                const parsedData = JSON.parse(data);
                let newData = [];

                // if the array item's id doesn't match the target id, it will be added to the newData array.
                // the target note will not get added.
                for (let i = 0; i < parsedData.length; i++) {
                    if (parsedData[i].id != target) {
                        newData.push(parsedData[i]);
                    }
                }

                // the db.json file is overwritten with the newData array that doesn't contain the target note.
                fs.writeFile("./db/db.json", JSON.stringify(newData, null, 4), (err) => 
                    err ? console.error(err) : console.info("\nData deleted from db.json")
                );
            }
        });
        
        res.json("File deleted")
    } else {
        res.error("Error in deleting note");
    }
});

// exports the api for server.js to implement
module.exports = api;