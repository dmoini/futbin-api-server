const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const routes = require("./routes");

const port = process.env.port || 3000;

app.get("/searchPlayer", routes.searchPlayer);

app.get("/getPlayerPrice", routes.getPlayerPrice);

app.get("/batchGetPlayerPrice", routes.batchGetPlayerPrice);

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
