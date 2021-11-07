/* eslint no-undef: "off" */

const supertest = require("supertest");
const axios = require("axios");
const isObject = require("isobject");
const app = require("@src/server");
const { mockDataA, mockDataB, noDataMockData } = require("@mock/batchGetPlayerPrice");
const { ENDPOINT, ERROR_MESSAGE, PARAMETER, PLATFORM, REQUIRED_PARAMETERS } = require("@constants/constants");

const invalidParametersBody = {
  invalidParameterKey: "invalidParameterValue",
};

const buildBody = (resourceIds, platform) => ({ [PARAMETER.RESOURCE_IDS]: resourceIds, [PARAMETER.PLATFORM]: platform });

jest.mock("axios");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GET /batchGetPlayerPrice", () => {
  describe("valid requests", () => {
    describe("valid parameter values", () => {
      it("should return 200 response when given a single resource ID", async () => {
        axios.get.mockResolvedValue(mockDataA);

        const resourceId = "158023";
        const body = buildBody(resourceId, PLATFORM.XBOX);

        await supertest(app)
          .get(ENDPOINT.BATCH_GET_PLAYER_PRICE)
          .send(body)
          .expect(200)
          .then((response) => {
            expect(axios.get.mock.calls.length).toBe(1);
            expect(response.body).toHaveProperty("data");
            const { data } = response.body;
            expect(isObject(data)).toBe(true);
            expect(data).toHaveProperty(resourceId);
            const resourceIdPriceData = data[resourceId];
            expect(resourceIdPriceData).toHaveProperty("LCPrice");
          });
      });

      it("should return 200 response when given multiple resource IDs", async () => {
        axios.get.mockReturnValueOnce(mockDataA).mockReturnValueOnce(mockDataB);

        const resourceIds = ["158023", "50489671"];
        const body = buildBody(resourceIds.join(","), PLATFORM.XBOX);

        await supertest(app)
          .get(ENDPOINT.BATCH_GET_PLAYER_PRICE)
          .send(body)
          .expect(200)
          .then((response) => {
            expect(axios.get.mock.calls.length).toBe(resourceIds.length);
            expect(response.body).toHaveProperty("data");
            const { data } = response.body;
            expect(isObject(data)).toBe(true);
            resourceIds.forEach((resourceId) => {
              expect(data).toHaveProperty(resourceId);
            });
          });
      });

      it("should return 200 response when given resource ID with no price information found", async () => {
        axios.get.mockResolvedValue(noDataMockData);

        const resourceId = "1";
        const body = buildBody(resourceId, PLATFORM.XBOX);

        await supertest(app)
          .get(ENDPOINT.BATCH_GET_PLAYER_PRICE)
          .send(body)
          .expect(200)
          .then((response) => {
            expect(axios.get.mock.calls.length).toBe(1);
            expect(response.body).toHaveProperty("data");
            const { data } = response.body;
            expect(isObject(data)).toBe(true);
            expect(data).toHaveProperty(resourceId);
            const resourceIdPriceData = data[resourceId];
            expect(resourceIdPriceData).toHaveProperty("errormsg");
          });
      });
    });
  });
});

describe("invalid requests", () => {
  describe("invalid parameter keys", () => {
    const requiredParameters = REQUIRED_PARAMETERS[ENDPOINT.BATCH_GET_PLAYER_PRICE];
    const expectedErrorMessage = ERROR_MESSAGE.getRequiredParametersErrorMessage(requiredParameters);
    it("should return 400 response when given no parameters", async () => {
      await supertest(app)
        .get(ENDPOINT.BATCH_GET_PLAYER_PRICE)
        .expect(400)
        .then((response) => {
          expect(axios.get.mock.calls.length).toBe(0);
          expect(response.body).toHaveProperty("error");
          expect(response.body.error).toBe(expectedErrorMessage);
        });
    });

    it("should return 400 response when given invalid parameters", async () => {
      await supertest(app)
        .get(ENDPOINT.BATCH_GET_PLAYER_PRICE)
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
    it("should return 400 response when 'resourceIds' contains a non-integer", async () => {
      const body = buildBody("123,invalidResourceId", PLATFORM.XBOX);
      await supertest(app)
        .get(ENDPOINT.BATCH_GET_PLAYER_PRICE)
        .send(body)
        .expect(400)
        .then((response) => {
          expect(axios.get.mock.calls.length).toBe(0);
          expect(response.body).toHaveProperty("error");
          expect(response.body.error).toBe(ERROR_MESSAGE.INVALID_RESOURCE_IDS);
        });
    });

    it("should return 400 response when 'resourceIds' contains a non-positive integer", async () => {
      const body = buildBody("1,-1", PLATFORM.XBOX);
      await supertest(app)
        .get(ENDPOINT.BATCH_GET_PLAYER_PRICE)
        .send(body)
        .expect(400)
        .then((response) => {
          expect(axios.get.mock.calls.length).toBe(0);
          expect(response.body).toHaveProperty("error");
          expect(response.body.error).toBe(ERROR_MESSAGE.INVALID_RESOURCE_IDS);
        });
    });

    it("should return 400 response when 'resourceIds' contains a decimal", async () => {
      const body = buildBody("1,2.3", PLATFORM.XBOX);
      await supertest(app)
        .get(ENDPOINT.BATCH_GET_PLAYER_PRICE)
        .send(body)
        .expect(400)
        .then((response) => {
          expect(axios.get.mock.calls.length).toBe(0);
          expect(response.body).toHaveProperty("error");
          expect(response.body.error).toBe(ERROR_MESSAGE.INVALID_RESOURCE_IDS);
        });
    });

    it("should return 400 response when 'platform' is invalid", async () => {
      const body = buildBody("1,2", "invalidPlatform");
      await supertest(app)
        .get(ENDPOINT.BATCH_GET_PLAYER_PRICE)
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
