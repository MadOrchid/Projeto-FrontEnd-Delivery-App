const sinon = require("sinon");
const { expect } = require("chai");

const { Sale, SalesProducts } = require("../../../database/models");
const { saleArgs, fetchedSale } = require("../../mocks/sales.mocks");
const saleService = require("../../../services/saleService");
const salesProductsServices = require("../../../services/salesProductsService");

describe("Sale service:", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("create sale:", () => {
    before(() => {
      sinon.stub(saleService, "findUSer").resolves();
      sinon.stub(salesProductsServices, "create").resolves();
      sinon.stub(Sale, "create").resolves({ dataValues: { id: 1 } });
      sinon.stub(SalesProducts, "bulkCreate").resolves();
    });
    it("Should succesfully create a sale", async () => {
      const result = await saleService.createOrder(saleArgs);
      expect(result).to.deep.equal(1);
    });
  });

  describe("Get sales", () => {
    beforeEach(() => {
      sinon.stub(Sale, "findByPk").resolves({ dataValues: fetchedSale });
      sinon.stub(Sale, "findAll").resolves([{ dataValues: fetchedSale }]);
    });
    const saleId = 1;
    it("Should list all sales by saleId", async () => {
      const result = await saleService.findById(saleId);
      expect(result).to.deep.equal(fetchedSale);
    });
    it("Should list all sales by userId", async () => {
      const userId = 3;
      const result = await saleService.findByUserId(userId);
      expect(result).to.deep.equal(fetchedSale);
    });
  });

  describe("Find Seller Id", () => {
    before(() => {
      sinon.stub(Sale, "findOne").resolves(2);
    });
    it("Should return the sellerId", async () => {
      const result = await saleService.findUSer("Fulana Pereira");
      expect(result).to.deep.equal(2);
    });
  });

  describe("Find User Id", () => {
    before(() => {
      sinon.stub(Sale, "findOne").resolves(3);
    });
    it("Should return the sellerId", async () => {
      const result = await saleService.findUSer("Cliente Zé Birita");
      expect(result).to.deep.equal(3);
    });
  });
});
