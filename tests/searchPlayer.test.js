/* eslint no-undef: "off" */

const supertest = require("supertest");
const axios = require("axios");
const app = require("../server");
const { ENDPOINT, ERROR_MESSAGE, REQUIRED_PARAMETERS } = require("../constants/constants");
const mockData = require("./mock/searchPlayer");

const incorrectParametersBody = {
  incorrectParameterKey: "incorrectParameterValue",
};

jest.mock("axios");

describe("GET /searchPlayer", () => {
  describe("valid requests", () => {
    it("should return a 200 response", async () => {
      axios.get.mockResolvedValue(mockData);

      const body = {
        playerName: "Lionel Messi",
      };

      await supertest(app)
        .get(ENDPOINT.SEARCH_PLAYER)
        .send(body)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty("data");
          const { data } = response.body;
          expect(Array.isArray(data)).toBe(true);
          expect(data.length).toBe(2);
        });
    });
  });
});

describe("invalid requests", () => {
  const requiredParameters = REQUIRED_PARAMETERS[ENDPOINT.SEARCH_PLAYER];

  it("should return 400 with no parameters", async () => {
    await supertest(app)
      .get(ENDPOINT.SEARCH_PLAYER)
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveProperty("error");
        const expectedErrorMessage = ERROR_MESSAGE.getRequiredParametersErrorMessage(requiredParameters);
        expect(response.body.error).toBe(expectedErrorMessage);
      });
  });

  it("should return 400 with incorrect parameters", async () => {
    await supertest(app)
      .get(ENDPOINT.SEARCH_PLAYER)
      .send(incorrectParametersBody)
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveProperty("error");
        const expectedErrorMessage = ERROR_MESSAGE.getRequiredParametersErrorMessage(requiredParameters);
        expect(response.body.error).toBe(expectedErrorMessage);
      });
  });

  it("should return 400 with parameter 'playerName' too short", async () => {
    await supertest(app)
      .get(ENDPOINT.SEARCH_PLAYER)
      .send({ playerName: "a" })
      .expect(400)
      .then((response) => {
        expect(response.body.error).toBe(ERROR_MESSAGE.PLAYER_NAME_TOO_SHORT);
      });
  });
});
