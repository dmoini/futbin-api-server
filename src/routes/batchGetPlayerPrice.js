const axios = require("axios");
const { BASE_URL, ENDPOINT, REQUIRED_PARAMETERS } = require("@constants/constants");
const validate = require("@utils/validate");

const requiredParameters = REQUIRED_PARAMETERS[ENDPOINT.BATCH_GET_PLAYER_PRICE];

const getUrl = (resourceId, platform) => `${BASE_URL}${ENDPOINT.FETCH_PRICE_INFORMATION}?playerresource=${resourceId}&platform=${platform}`;

const batchGetPlayerPrice = async (req, res) => {
  const validationResponse = validate(req, requiredParameters);
  if (!validationResponse.isValid) {
    return res.status(400).send({
      error: validationResponse.error,
    });
  }
  const resourceIds = req.body.resourceIds.split(",");
  const { platform } = req.body;
  const playerPrices = await Promise.all(
    resourceIds.map(async (resourceId) => {
      const url = getUrl(resourceId, platform);
      const response = await axios.get(url);
      return { resourceId, data: response.data };
    })
  );
  const resourceIdToPlayerPriceMap = playerPrices.reduce(
    (_map, responseData) => ({
      ..._map,
      [responseData.resourceId]: responseData.data,
    }),
    {}
  );
  return res.send({ data: resourceIdToPlayerPriceMap });
};

module.exports = batchGetPlayerPrice;
