const express = require("express");
require("dotenv").config();
const { OpenAI } = require("openai");

const app = express();

app.use(express.json());
app.post("/checker", async (req, res) => {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPEN_AI_KEY
        });
        const { prompt } = req.body;

        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `is ${prompt} used in food or recipe true or false` }],
            model: 'gpt-3.5-turbo',
            max_tokens: 1,

        });

        console.log(chatCompletion.choices);
        console.log(chatCompletion.choices[0].message.content[0]);

        return res.status(200).json({
            success: true,
            data: chatCompletion.choices[0].message.content,
        });

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            error: error.response
                ? error.response.data
                : "There was an issue on the server",
        });
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));