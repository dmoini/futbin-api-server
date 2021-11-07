/* eslint no-undef: "off" */

const supertest = require("supertest");
const axios = require("axios");
const app = require("@src/server");
const mockData = require("@mock/searchPlayer");
const { ENDPOINT, ERROR_MESSAGE, PARAMETER, REQUIRED_PARAMETERS } = require("@constants/constants");

const invalidParametersBody = {
  invalidParameterKey: "invalidParameterValue",
};

const buildBody = (playerName) => ({ [PARAMETER.PLAYER_NAME]: playerName });

jest.mock("axios");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GET /searchPlayer", () => {
  describe("valid requests", () => {
    it("should return 200 response when given valid parameters", async () => {
      axios.get.mockResolvedValue(mockData);

      const body = buildBody("Lionel Messi");

      await supertest(app)
        .get(ENDPOINT.SEARCH_PLAYER)
        .send(body)
        .expect(200)
        .then((response) => {
          expect(axios.get.mock.calls.length).toBe(1);
          expect(response.body).toHaveProperty("data");
          const { data } = response.body;
          expect(Array.isArray(data)).toBe(true);
          expect(data.length).toBe(2);
        });
    });
  });
});

describe("invalid requests", () => {
  describe("invalid parameter keys", () => {
    const requiredParameters = REQUIRED_PARAMETERS[ENDPOINT.SEARCH_PLAYER];
    const expectedErrorMessage = ERROR_MESSAGE.getRequiredParametersErrorMessage(requiredParameters);

    it("should return 400 response when given no parameters", async () => {
      await supertest(app)
        .get(ENDPOINT.SEARCH_PLAYER)
        .expect(400)
        .then((response) => {
          expect(axios.get.mock.calls.length).toBe(0);
          expect(response.body).toHaveProperty("error");
          expect(response.body.error).toBe(expectedErrorMessage);
        });
    });

    it("should return 400 response when given invalid parameters", async () => {
      await supertest(app)
        .get(ENDPOINT.SEARCH_PLAYER)
        .send(invalidParametersBody)
        .expect(400)
        .then((response) => {
          expect(axios.get.mock.calls.length).toBe(0);
          expect(response.body).toHaveProperty("error");
          expect(response.body.error).toBe(expectedErrorMessage);
        });
    });
  });

  describe("invalid parameter values", () => {
    it("should return 400 response when 'playerName' is too short", async () => {
      const body = buildBody("a");

      await supertest(app)
        .get(ENDPOINT.SEARCH_PLAYER)
        .send(body)
        .expect(400)
        .then((response) => {
          expect(axios.get.mock.calls.length).toBe(0);
          expect(response.body).toHaveProperty("error");
          expect(response.body.error).toBe(ERROR_MESSAGE.PLAYER_NAME_TOO_SHORT);
        });
    });
  });
});
