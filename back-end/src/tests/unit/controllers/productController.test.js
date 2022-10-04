const sinon = require("sinon");
const { expect } = require("chai");
const productService = require("../../../services/productService");
const productController = require("../../../controllers/productController");
const { productsMock } = require("../../mocks/products.mocks");

describe("Product controller", () => {
  const response = {};
  const request = {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productService, "list").resolves(productsMock);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("Should return status 200 and the correct array of products", async () => {
    await productController.list(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
    expect(response.json.calledWith(productsMock)).to.be.equal(true);
  });
});
