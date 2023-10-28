const { OpenAI } = require("openai");
exports.responseCHat = async (prompt) => {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPEN_AI_KEY
        });


        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: ` is ${prompt.toUpperCase()}   keyword can use in food , recip world  in Arabic word or english ?answar only  true or false ` }],
            model: 'gpt-3.5-turbo',
            max_tokens: 30,

        });

        console.log(chatCompletion.choices);
        console.log(chatCompletion.choices[0].message.content[0]);

        return {
            success: true,
            data: chatCompletion.choices[0].message.content,
        }

    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: error.response
                ? error.response.data
                : "There was an issue on the server",
        }

    }
} 