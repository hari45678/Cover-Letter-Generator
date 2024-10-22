// server.js

const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const app = express();

app.use(express.json());
app.use(cors());

app.post('/generate-cover-letter', async (req, res) => {
  const { name, jobTitle, companyName, jobDescription } = req.body;

  const prompt = `
    Write a professional cover letter for ${name}, applying for the role of ${jobTitle} at ${companyName} with 3 paragraph total words will be of 300 words AI free. best
    The job description is as follows: ${jobDescription}.
  `;

  try {
    
    const result = await model.generateContent([prompt]);
    console.log(result.response.text());

    res.json({ coverLetter: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating cover letter');
  }
});

app.get('/', (req, res)=>{
  res.send('Welcome harry!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

