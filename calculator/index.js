const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 9876;
const windowSize = 10;
let numbersStore = [];
let accessToken = "";

const authenticate = async () => {
  try {
    const response = await axios.post("http://20.244.56.144/test/auth", {
      companyName: "University School of Automation and Robotics",
      clientID: "abb832a5-aee5-43c8-b1f1-3af4da5e1a57",
      clientSecret: "TrIPNhyOIPquefTC",
      ownerName: "Gauranshi Gupta",
      ownerEmail: "gauranshigupta2000@gmail.com",
      rollNo: "00719011921",
    });
    console.log("Authentication successful:", response.data);
    return response.data.access_token;
  } catch (error) {
    console.error("Error during authentication:", error.message);
  }
};

const getNum = async (type, token) => {
  const Map = {
    p: "http://20.244.56.144/test/primes",
    f: "http://20.244.56.144/test/fibo",
    e: "http://20.244.56.144/test/even",
    r: "http://20.244.56.144/test/rand",
  };

  if (!Map[type]) {
    console.error(`Invalid number type: ${type}`);
    return [];
  }

  try {
    const response = await axios.get(Map[type], {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 500,
    });
    console.log(`Fetched numbers for type ${type}:`, response.data.numbers);
    return response.data.numbers;
  } catch (error) {
    console.error(`Error fetching numbers for type ${type}:`, error.message);
    return [];
  }
};

const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return (sum / numbers.length).toFixed(2);
};

app.get("/numbers/:numberId", async (req, res) => {
  const numberId = req.params.numberId;
  const newNumbers = await getNum(numberId, accessToken);
  const uniqueNumbers = newNumbers.filter((num) => !numbersStore.includes(num));
  const windowPrevState = [...numbersStore];

  uniqueNumbers.forEach((num) => {
    if (numbersStore.length >= windowSize) {
      numbersStore.shift();
    }
    numbersStore.push(num);
  });

  const avg = calculateAverage(numbersStore);
  console.log(`Current numbers store: ${numbersStore}`);
  console.log(`Current average: ${avg}`);

  res.json({
    windowPrevState,
    windowCurrState: [...numbersStore],
    numbers: newNumbers,
    avg,
  });
});

const server = async () => {
  accessToken = await authenticate();
  if (accessToken) {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
};

server();
