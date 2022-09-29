const sinon = require("sinon");
const { expect } = require("chai");
const { SalesProducts } = require("../../../database/models");

describe("SalesProducts", () => {
  afterEach(() => {
    sinon.restore();
  });
  describe("bulkCreate", () => {
    const products = [
      {
        productId: "8",
        quantity: "4",
      },
      {
        productId: "4",
        quantity: "1",
      },
      {
        productId: "2",
        quantity: "2",
      },
    ];
    const salesProducts = [
      {
        saleId: 1,
        productId: 2,
        quantity: 2,
      },
      {
        saleId: 1,
        productId: 4,
        quantity: 1,
      },
    ];
    before(() => {
      sinon
        .stub(SalesProducts, "bulkCreate")
        .withArgs(products)
        .resolves(salesProducts);
    });
    it("Should insert all the products data", async () => {
      const result = await SalesProducts.bulkCreate(products);
      expect(result).to.deep.equal(salesProducts);
    });
  });
});
