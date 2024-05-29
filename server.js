const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const API_KEY = '0b688e0bd491bd0c5193f1f9dabc482c35c396a1'; // Your Delhivery API Key

app.get('/api/proxy', async (req, res) => {
  const { waybill } = req.query;

  try {
    const response = await axios.get(`https://track.delhivery.com/api/v1/packages/json/?waybill=${waybill}`, {
      headers: {
        'Authorization': `Token ${API_KEY}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Delhivery API' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
