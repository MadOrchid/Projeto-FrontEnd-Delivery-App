const sinon = require("sinon");
const { expect } = require("chai");
const saleController = require("../../../controllers/saleController");
const saleService = require("../../../services/saleService");
const {
  saleBody,
  resultSale,
  fetchedSale,
} = require("../../mocks/sales.mocks");

describe("Sale controller", () => {
  afterEach(() => {
    sinon.restore();
  });
  describe("create", () => {
    const response = {};
    const request = {};
    before(() => {
      request.body = saleBody;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, "createOrder").resolves(resultSale.id);
    });
    it("Should return status 201 and the created sale object", async () => {
      await saleController.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith({ id: resultSale.id })).to.be.equal(true);
    });
  });

  describe("findById", () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, "findById").resolves(fetchedSale);
    });
    it("Should return the sale object with the specified ID", async () => {
      await saleController.findById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(fetchedSale)).to.be.equal(true);
    });
  });

  describe("findByUserId", () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 3 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, "findById").resolves(fetchedSale);
    });
    it("Should return the sale object with the specified ID", async () => {
      await saleController.findById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(fetchedSale)).to.be.equal(true);
    });
  });
});
