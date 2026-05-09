import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const API_KEY = process.env.API_KEY;

// BUY NUMBER
app.post("/buy", async (req, res) => {
  const { service, country } = req.body;

  try {
    const response = await axios.get(
      `https://5sim.net/v1/user/buy/activation/${country}/any/${service}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CHECK SMS
app.get("/sms/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://5sim.net/v1/user/check/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("SMS backend running");
});
