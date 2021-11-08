const express = require("express");
const cors = require("cors");
const { marked } = require("marked");
const fs = require("fs");
const routes = require("@routes");

const { ENDPOINT } = require("@constants/constants");

const app = express();
app.use(cors());
app.use(express.json());

const printUsage = (_, res) => {
  fs.readFile("./docs/usage.md", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({
        error: "Could not load usage instructions.",
      });
    }
    return res.send(marked(data.toString()));
  });
};

app.get("/", printUsage);
app.get(ENDPOINT.SEARCH_PLAYER, routes.searchPlayer);
app.get(ENDPOINT.GET_PLAYER_PRICE, routes.getPlayerPrice);
app.get(ENDPOINT.BATCH_GET_PLAYER_PRICE, routes.batchGetPlayerPrice);

module.exports = app;
