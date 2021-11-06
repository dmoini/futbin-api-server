const axios = require("axios");

const { BASE_URL, ENDPOINT, REQUIRED_PARAMETERS } = require("../constants/constants");
const validate = require("../utils/validate");

const requiredParameters = REQUIRED_PARAMETERS[ENDPOINT.GET_PLAYER_PRICE];

const getUrl = (resourceId, platform) => `${BASE_URL}${ENDPOINT.FETCH_PRICE_INFORMATION}?playerresource=${resourceId}&platform=${platform}`;

const getPlayerPrice = async (req, res) => {
  const validationResponse = validate(req, requiredParameters);
  if (!validationResponse.isValid) {
    return res.status(400).json({
      error: validationResponse.error,
    });
  }
  const { resourceId, platform } = req.body;
  const url = getUrl(resourceId, platform);
  const response = await axios.get(url);
  return res.send({ data: response.data });
};

module.exports = getPlayerPrice;
