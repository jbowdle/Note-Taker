const express = require("express");
const path = require("path");
const apiRouter = require("./routes/api");

const PORT = process.env.PORT || 3001;

app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, () => console.log(`App is listening at http://localhost:${PORT}`));

// replace with 404 page?
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});