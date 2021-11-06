const BASE_URL = "https://www.futbin.org/futbin/api";
const MINIMUM_PLAYER_NAME_LENGTH = 3;

const PLATFORM = {
  PC: "PC",
  PLAYSTATION: "PS",
  XBOX: "XB",
};

const ENDPOINT = {
  BATCH_GET_PLAYER_PRICE: "/batchGetPlayerPrice",
  FETCH_PRICE_INFORMATION: "/fetchPriceInformation",
  GET_PLAYER_PRICE: "/getPlayerPrice",
  SEARCH_PLAYER: "/searchPlayer",
  SEARCH_PLAYERS_BY_NAME: "/searchPlayersByName",
};

const PARAMETER = {
  PLATFORM: "platform",
  PLAYER_NAME: "playerName",
  RESOURCE_ID: "resourceId",
  RESOURCE_IDS: "resourceIds",
};

const REQUIRED_PARAMETERS = {
  [ENDPOINT.BATCH_GET_PLAYER_PRICE]: [PARAMETER.RESOURCE_IDS, PARAMETER.PLATFORM],
  [ENDPOINT.GET_PLAYER_PRICE]: [PARAMETER.RESOURCE_ID, PARAMETER.PLATFORM],
  [ENDPOINT.SEARCH_PLAYER]: [PARAMETER.PLAYER_NAME],
};

const ERROR_MESSAGE = {
  INVALID_PLATFORM: `Invalid platform. Platform must be one of the following: [${Object.values(PLATFORM).join(", ")}].`,
  INVALID_RESOURCE_ID: `Invalid resource ID. Resource ID must be positive integers.`,
  INVALID_RESOURCE_IDS: `One or more invalid resource IDs. Resource IDs must be a comma-separated string of positive integers.`,
  PLAYER_NAME_TOO_SHORT: `Player name must be ${MINIMUM_PLAYER_NAME_LENGTH} or more characters.`,
  REQUEST_BODY_REQUIRED: "Request body is required.",
  getRequiredParametersErrorMessage: (parameters) => `The following parameters are required: [${parameters.join(", ")}].`,
};

module.exports = {
  BASE_URL,
  ENDPOINT,
  ERROR_MESSAGE,
  PARAMETER,
  PLATFORM,
  REQUIRED_PARAMETERS,
};
