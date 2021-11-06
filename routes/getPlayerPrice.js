const axios = require("axios");

const { BASE_URL, ENDPOINT, PARAMETER } = require("../constants/constants");
const validate = require("../utils/validate");

const REQUIRED_PARAMETERS = [PARAMETER.RESOURCE_ID, PARAMETER.PLATFORM];

const getPlayerPrice = async (req, res) => {
  const validationResponse = validate(req, REQUIRED_PARAMETERS);
  if (!validationResponse.isValid) {
    return res.status(400).json({
      error: validationResponse.error,
    });
  }
  const { resourceId, platform } = req.body;
  const url = getUrl(resourceId, platform);
  const response = await axios.get(url);
  res.send({ data: response.data });
};

const getUrl = (resourceId, platform) => {
  return `${BASE_URL}${ENDPOINT.FETCH_PRICE_INFORMATION}?playerresource=${resourceId}&platform=${platform}`;
};

module.exports = getPlayerPrice;
