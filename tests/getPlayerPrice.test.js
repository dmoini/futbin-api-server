/* eslint no-undef: "off" */

const supertest = require("supertest");
const axios = require("axios");
const isObject = require("isobject");
const app = require("@src/server");
const mockData = require("@mock/getPlayerPrice");
const { ENDPOINT, ERROR_MESSAGE, PARAMETER, PLATFORM, REQUIRED_PARAMETERS } = require("@constants/constants");

const invalidParametersBody = {
  invalidParameterKey: "invalidParameterValue",
};

const buildBody = (resourceId, platform) => ({ [PARAMETER.RESOURCE_ID]: resourceId, [PARAMETER.PLATFORM]: platform });

jest.mock("axios");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GET /getPlayerPrice", () => {
  describe("valid requests", () => {
    it("should return 200 response when given valid parameters", async () => {
      axios.get.mockResolvedValue(mockData);

      const body = buildBody("158023", PLATFORM.XBOX);

      await supertest(app)
        .get(ENDPOINT.GET_PLAYER_PRICE)
        .send(body)
        .expect(200)
        .then((response) => {
          expect(axios.get.mock.calls.length).toBe(1);
          expect(response.body).toHaveProperty("data");
          const { data } = response.body;
          expect(isObject(data)).toBe(true);
        });
    });
  });

  describe("invalid requests", () => {
    describe("invalid parameter keys", () => {
      const requiredParameters = REQUIRED_PARAMETERS[ENDPOINT.GET_PLAYER_PRICE];
      const expectedErrorMessage = ERROR_MESSAGE.getRequiredParametersErrorMessage(requiredParameters);

      it("should return 400 response when given no parameters", async () => {
        await supertest(app)
          .get(ENDPOINT.GET_PLAYER_PRICE)
          .expect(400)
          .then((response) => {
            expect(axios.get.mock.calls.length).toBe(0);
            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toBe(expectedErrorMessage);
          });
      });

      it("should return 400 response when given invalid parameters", async () => {
        await supertest(app)
          .get(ENDPOINT.GET_PLAYER_PRICE)
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
      it("should return 400 response when 'resourceId' is not an integer", async () => {
        const body = buildBody("invalidResourceId", PLATFORM.XBOX);

        await supertest(app)
          .get(ENDPOINT.GET_PLAYER_PRICE)
          .send(body)
          .expect(400)
          .then((response) => {
            expect(axios.get.mock.calls.length).toBe(0);
            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toBe(ERROR_MESSAGE.INVALID_RESOURCE_ID);
          });
      });

      it("should return 400 response when 'resourceId' is a non-positive integer", async () => {
        const body = buildBody("-1", PLATFORM.XBOX);

        await supertest(app)
          .get(ENDPOINT.GET_PLAYER_PRICE)
          .send(body)
          .expect(400)
          .then((response) => {
            expect(axios.get.mock.calls.length).toBe(0);
            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toBe(ERROR_MESSAGE.INVALID_RESOURCE_ID);
          });
      });

      it("should return 400 response when 'resourceId' is a decimal", async () => {
        const body = buildBody("1.2", PLATFORM.XBOX);

        await supertest(app)
          .get(ENDPOINT.GET_PLAYER_PRICE)
          .send(body)
          .expect(400)
          .then((response) => {
            expect(axios.get.mock.calls.length).toBe(0);
            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toBe(ERROR_MESSAGE.INVALID_RESOURCE_ID);
          });
      });

      it("should return 400 response when 'platform' is invalid", async () => {
        const body = buildBody("123", "invalidPlatform");

        await supertest(app)
          .get(ENDPOINT.GET_PLAYER_PRICE)
          .send(body)
          .expect(400)
          .then((response) => {
            expect(axios.get.mock.calls.length).toBe(0);
            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toBe(ERROR_MESSAGE.INVALID_PLATFORM);
          });
      });
    });
  });
});
