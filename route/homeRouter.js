const express = require('express')
const router = express.Router()
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

router.get('/', (req, res) => {
    const openai = new OpenAIApi(configuration);
    async function runCompletion(prompt) {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 1000,
        })
        return await completion.data.choices[0].text;
    }
    const { requestText } = req.query;
    runCompletion(requestText).then(function (result) {
        res.status(200).json(result)
    })
})

module.exports = router