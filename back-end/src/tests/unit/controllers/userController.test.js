const sinon = require("sinon");
const { expect } = require("chai");
const userController = require("../../../controllers/userController");
const usersService = require("../../../services/usersService");
const { tokenMock, sellersMock } = require("../../mocks/users.mocks");
describe("userController", () => {
  afterEach(() => {
    sinon.restore();
  });
  const response = {};
  const request = {};

  const validUserRegister = {
    name: "User de teste 2",
    email: "userteste2@deliveryapp.com",
    password: "teste@123",
  };

  const createdUserMock = {
    email: "userteste2@deliveryapp.com",
    role: "customer",
    name: "User de teste 2",
    tokenMock,
  };

  request.body = validUserRegister;

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(usersService, "create").resolves(createdUserMock);
  });
  it("Should succesfully create a new user", async () => {
    await userController.create(request, response);
    expect(response.status.calledWith(201)).to.be.equal(true);
    expect(response.json.calledWith(createdUserMock)).to.be.equal(true);
  });

  describe("listSellers", () => {
    afterEach(() => {
      sinon.restore();
    });
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(usersService, "listSellers").resolves(sellersMock);
    });
    const response = {};
    const request = {};

    it("Should list all sellers", async () => {
      await userController.listSellers(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(sellersMock)).to.be.equal(true);
    });
  });
});
