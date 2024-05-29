const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/proxy', async (req, res) => {
  const { waybill } = req.query;

  try {
    const response = await axios.get(`https://track.delhivery.com/api/v1/packages/json/?waybill=${waybill}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Delhivery API' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
