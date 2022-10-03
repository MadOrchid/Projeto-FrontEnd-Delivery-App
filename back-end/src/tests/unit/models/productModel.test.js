const sinon = require("sinon");
const { expect } = require("chai");
const { Product } = require("../../../database/models");
const { productsMock } = require("../../mocks/products.mocks");

describe("Product model:", () => {
  afterEach(() => {
    sinon.restore();
  });
  describe("findAll", () => {
    before(() => {
      sinon.stub(Product, "findAll").resolves(productsMock);
    });
    it("Should list all products", async () => {
      const result = await Product.findAll();
      expect(result).to.deep.equal(productsMock);
    });
  });
});
