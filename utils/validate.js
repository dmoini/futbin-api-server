const isNumber = require("is-number");
const { ERROR_MESSAGE, PARAMETER, VALID_PLATFORMS } = require("../constants/constants");

const validateRequiredParameters = (request, requiredParameters) => {
  const missingParameters = requiredParameters.filter((parameter) => !Object.prototype.hasOwnProperty.call(request.body, parameter));
  const isValid = missingParameters.length === 0;
  return {
    isValid,
    error: isValid ? "" : ERROR_MESSAGE.getRequiredParametersErrorMessage(missingParameters),
  };
};

const validatePlayerName = (playerName) => {
  const isValid = playerName.length >= 3;
  return {
    isValid,
    error: isValid ? "" : ERROR_MESSAGE.PLAYER_NAME_TOO_SHORT,
  };
};

const validatePlatform = (platform) => {
  const isValid = VALID_PLATFORMS.includes(platform);
  return {
    isValid,
    error: isValid ? "" : ERROR_MESSAGE.INVALID_PLATFORM,
  };
};

const validateResourceId = (resourceId) => {
  const isValid = isNumber(resourceId) && parseInt(resourceId, 10) > 0 && parseInt(resourceId, 10) % 1 === 0;
  return {
    isValid,
    error: isValid ? "" : ERROR_MESSAGE.INVALID_RESOURCE_ID,
  };
};

const validateResourceIds = (resourceIds) => {
  const invalidResourceIds = resourceIds
    .split(",")
    .map(validateResourceId)
    .filter((validationResponse) => !validationResponse.isValid);
  const isValid = invalidResourceIds.length === 0;
  return {
    isValid,
    error: isValid ? "" : ERROR_MESSAGE.INVALID_RESOURCE_IDS,
  };
};

const parameterToValidationMethodMap = {
  [PARAMETER.PLATFORM]: validatePlatform,
  [PARAMETER.PLAYER_NAME]: validatePlayerName,
  [PARAMETER.RESOURCE_ID]: validateResourceId,
  [PARAMETER.RESOURCE_IDS]: validateResourceIds,
};

const validate = (request, requiredParameters) => {
  const requiredParametersValidationResponse = validateRequiredParameters(request, requiredParameters);
  if (!requiredParametersValidationResponse.isValid) {
    return requiredParametersValidationResponse;
  }

  const invalidParameterValidationResponses = requiredParameters
    .map((parameter) => {
      const parameterValue = request.body[parameter];
      const parameterValidationMethod = parameterToValidationMethodMap[parameter];
      return parameterValidationMethod(parameterValue);
    })
    .filter((validationResponse) => !validationResponse.isValid);

  const isValid = invalidParameterValidationResponses.length === 0;
  return {
    isValid,
    error: isValid ? "" : invalidParameterValidationResponses[0].error,
  };
};

module.exports = validate;
