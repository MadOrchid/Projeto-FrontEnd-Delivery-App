const sinon = require("sinon");
const { expect } = require("chai");
const { Sale } = require("../../../database/models");
const { saleArgs, fetchedSale } = require("../../mocks/sales.mocks");

describe("Sale model:", () => {
  afterEach(() => {
    sinon.restore();
  });
  describe("create", () => {
    const sale = {
      id: 1,
      userId: 3,
      sellerId: 2,
      totalPrice: "38.50",
      deliveryAddress: "Rua do teste",
      deliveryNumber: "123",
      saleDate: "2022-09-28T20:18:00.000Z",
      status: "Pendente",
    };
    before(() => {
      sinon.stub(Sale, "create").withArgs(saleArgs).resolves(sale);
    });
    it("Should successfully create a sale", async () => {
      const result = await Sale.create(saleArgs);
      expect(result).to.deep.equal(sale);
    });

    describe("find", () => {
      beforeEach(() => {
        sinon.stub(Sale, "findByPk").resolves(fetchedSale);
        sinon.stub(Sale, "findAll").resolves(fetchedSale);
      });
      it("Should get a specific sale by the specified ID", async () => {
        const result = await Sale.findByPk(1);
        expect(result).to.deep.equal(fetchedSale);
      });
      it("Should get a specific sale by userID", async () => {
        const result = await Sale.findAll(3);
        expect(result).to.deep.equal(fetchedSale);
      });
    });
  });
});
