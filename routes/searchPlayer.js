const axios = require("axios");

const { BASE_URL, ENDPOINT, PARAMETER } = require("../constants/constants");
const validate = require("../utils/validate");

const REQUIRED_PARAMETERS = [PARAMETER.PLAYER_NAME];

const searchPlayer = async (req, res) => {
  const validationResponse = validate(req, REQUIRED_PARAMETERS);
  if (!validationResponse.isValid) {
    return res.status(400).json({
      error: validationResponse.error,
    });
  }
  const url = getUrl(req.body.playerName);
  const response = await axios.get(url);
  res.send(response.data);
};

const getUrl = (playerName) => {
  const playerNameParameter = playerName.replace(" ", "%20");
  return `${BASE_URL}${ENDPOINT.SEARCH_PLAYER_BY_NAME}?playername=${playerNameParameter}`;
};

module.exports = searchPlayer;
