const mockDataA = {
  data: {
    LCPrice: 640000,
    LCPrice2: 645000,
    LCPrice3: 645000,
    updatedon: 14,
    MinPrice: 80000,
    MaxPrice: 1500000,
  },
};

const mockDataB = {
  data: {
    LCPrice: 1748000,
    LCPrice2: 1775000,
    LCPrice3: 1849000,
    updatedon: 126,
    MinPrice: 172000,
    MaxPrice: 4300000,
  },
};

const noDataMockData = {
  data: {
    errorcode: "010",
    errormsg: "NODATA",
    errordesc: "No price information found, please try again",
  },
};

module.exports = {
  mockDataA,
  mockDataB,
  noDataMockData,
};
