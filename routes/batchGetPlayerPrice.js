const axios = require("axios");
const { BASE_URL, ENDPOINT, PARAMETER } = require("../constants/constants");
const validate = require("../utils/validate");

const REQUIRED_PARAMETERS = [PARAMETER.RESOURCE_IDS, PARAMETER.PLATFORM];

const batchGetPlayerPrice = async (req, res) => {
  const validationResponse = validate(req, REQUIRED_PARAMETERS);
  if (!validationResponse.isValid) {
    return res.status(400).send({
      error: validationResponse.error,
    });
  }

  const resourceIds = req.body.resourceIds.split(",");
  const platform = req.body.platform;
  const playerPrices = await Promise.all(
    resourceIds.map(async (resourceId) => {
      const url = getUrl(resourceId, platform);
      const response = await axios.get(url);
      return { resourceId, data: response.data };
    })
  );
  const resourceIdToPlayerPriceMap = playerPrices.reduce((resourceIdToPlayerPriceMap, responseData) => {
    resourceIdToPlayerPriceMap[responseData.resourceId] = responseData.data;
    return resourceIdToPlayerPriceMap;
  }, {});
  res.send({ data: resourceIdToPlayerPriceMap });
};

const getUrl = (resourceId, platform) => {
  return `${BASE_URL}${ENDPOINT.FETCH_PRICE_INFORMATION}?playerresource=${resourceId}&platform=${platform}`;
};

module.exports = batchGetPlayerPrice;
