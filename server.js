const express = require("express");
const path = require("path");
const apiRouter = require("./routes/api");

const PORT = process.env.PORT || 3001;

app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// the api endpoint contains the get, post and delete methods for handling the notes
app.use("/api", apiRouter);

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, () => console.log(`App is listening at http://localhost:${PORT}`));

// Going to any non specified endpoints will lead the user back to the homepage
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});