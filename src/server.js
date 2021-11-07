const express = require("express");
const cors = require("cors");
const routes = require("@routes");

const { ENDPOINT } = require("@constants/constants");

const app = express();
app.use(cors());
app.use(express.json());

app.get(ENDPOINT.SEARCH_PLAYER, routes.searchPlayer);
app.get(ENDPOINT.GET_PLAYER_PRICE, routes.getPlayerPrice);
app.get(ENDPOINT.BATCH_GET_PLAYER_PRICE, routes.batchGetPlayerPrice);

module.exports = app;
