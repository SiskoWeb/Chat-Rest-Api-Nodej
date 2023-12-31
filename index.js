const express = require("express");
const { responseCHat } = require("./chatService");
require("dotenv").config();
const cors = require('cors');

const app = express();
app.use(cors({
    origin: '*',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type',
}));

app.use(express.json({ extended: false }));
app.post("/checker", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {

        return res.status(400).json("prompt is required")
    }

    const response = await responseCHat(prompt)
    if (response.success) {
        return res.status(200).json(response)
    } else {
        return res.status(400).json(response)
    }
});

app.get("/", async (req, res) => {
    return res.status(200).json({ msg: "live" })
})

const port = 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));