const sinon = require("sinon");
const { expect } = require("chai");

const { Product } = require("../../../database/models");
const productService = require("../../../services/productService");
const { productsMock } = require("../../mocks/products.mocks");

describe("Product service:", () => {
  beforeEach(() => {
    sinon.stub(Product, "findAll").returns(productsMock);
  });
  afterEach(() => {
    sinon.restore();
  });

  describe("Get all products", () => {
    it("Should return all products", async () => {
      const result = await productService.list();
      expect(result).to.be.deep.equal(productsMock);
    });
  });
});
