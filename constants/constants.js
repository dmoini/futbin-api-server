const BASE_URL = "https://www.futbin.org/futbin/api";
const MINIMUM_PLAYER_NAME_LENGTH = 3;

const VALID_PLATFORMS = ["XB", "PS", "PC"];

const ENDPOINT = {
  FETCH_PRICE_INFORMATION: "/fetchPriceInformation",
  SEARCH_PLAYER_BY_NAME: "/searchPlayersByName",
};

const PARAMETER = {
  PLATFORM: "platform",
  PLAYER_NAME: "playerName",
  RESOURCE_ID: "resourceId",
  RESOURCE_IDS: "resourceIds",
};

const ERROR_MESSAGE = {
  INVALID_PLATFORM: `Invalid platform. Platform must be one of the following: [${VALID_PLATFORMS.join(", ")}].`,
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
  VALID_PLATFORMS,
};
