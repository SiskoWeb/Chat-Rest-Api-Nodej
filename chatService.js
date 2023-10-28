const { OpenAI } = require("openai");
exports.responseCHat = async (prompt) => {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPEN_AI_KEY
        });


        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `Is "${prompt}" a keyword used in the culinary or recipe world OR foor, either in Arabic, English, or Darija Maghribia? True or False?` }],
            model: 'gpt-3.5-turbo',
            // temperature: 0.2,
            temperature: 0,
            max_tokens: 3,

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