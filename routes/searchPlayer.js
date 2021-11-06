const axios = require("axios");

const { BASE_URL, ENDPOINT, REQUIRED_PARAMETERS } = require("../constants/constants");
const validate = require("../utils/validate");

const requiredParameters = REQUIRED_PARAMETERS[ENDPOINT.SEARCH_PLAYER];

const getUrl = (playerName) => {
  const playerNameParameter = playerName.replace(" ", "%20");
  return `${BASE_URL}${ENDPOINT.SEARCH_PLAYERS_BY_NAME}?playername=${playerNameParameter}`;
};

const searchPlayer = async (req, res) => {
  const validationResponse = validate(req, requiredParameters);
  if (!validationResponse.isValid) {
    return res.status(400).json({
      error: validationResponse.error,
    });
  }

  const url = getUrl(req.body.playerName);
  const response = await axios.get(url);
  return res.send(response.data);
};

module.exports = searchPlayer;
