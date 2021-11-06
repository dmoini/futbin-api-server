/* eslint no-undef: "off" */

const supertest = require("supertest");
const axios = require("axios");
const app = require("../server");
const { ENDPOINT, ERROR_MESSAGE, PLATFORM, REQUIRED_PARAMETERS } = require("../constants/constants");
const mockData = require("./mock/getPlayerPrice");

const invalidParametersBody = {
  invalidParameterKey: "invalidParameterValue",
};

jest.mock("axios");

describe("GET /getPlayerPrice", () => {
  describe("valid requests", () => {
    it("should return 200 response when given valid parameters", async () => {
      axios.get.mockResolvedValue(mockData);

      Object.values(PLATFORM).forEach(async (platform) => {
        const body = {
          resourceId: 158023,
          platform,
        };

        await supertest(app)
          .get(ENDPOINT.GET_PLAYER_PRICE)
          .send(body)
          .expect(200)
          .then((response) => {
            expect(response.body).toHaveProperty("data");
            const { data } = response.body;
            expect(typeof data === "object" && data !== null).toBe(true);
          });
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
            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toBe(expectedErrorMessage);
          });
      });
    });

    describe("invalid parameter values", () => {
      it("should return 400 response when 'resourceId' is not an integer", async () => {
        const body = {
          resourceId: "invalidResourceId",
          platform: PLATFORM.XBOX,
        };

        await supertest(app)
          .get(ENDPOINT.GET_PLAYER_PRICE)
          .send(body)
          .expect(400)
          .then((response) => {
            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toBe(ERROR_MESSAGE.INVALID_RESOURCE_ID);
          });
      });

      it("should return 400 response when 'resourceId' is a non-positive integer", async () => {
        const body = {
          resourceId: -1,
          platform: PLATFORM.XBOX,
        };

        await supertest(app)
          .get(ENDPOINT.GET_PLAYER_PRICE)
          .send(body)
          .expect(400)
          .then((response) => {
            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toBe(ERROR_MESSAGE.INVALID_RESOURCE_ID);
          });
      });

      it("should return 400 response when 'resourceId' is a decimal", async () => {
        const body = {
          resourceId: 1.2,
          platform: PLATFORM.XBOX,
        };

        await supertest(app)
          .get(ENDPOINT.GET_PLAYER_PRICE)
          .send(body)
          .expect(400)
          .then((response) => {
            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toBe(ERROR_MESSAGE.INVALID_RESOURCE_ID);
          });
      });

      it("should return 400 response when 'platform' is invalid", async () => {
        const body = {
          resourceId: 123,
          platform: "invalidPlatform",
        };

        await supertest(app)
          .get(ENDPOINT.GET_PLAYER_PRICE)
          .send(body)
          .expect(400)
          .then((response) => {
            expect(response.body).toHaveProperty("error");
            expect(response.body.error).toBe(ERROR_MESSAGE.INVALID_PLATFORM);
          });
      });
    });
  });
});
