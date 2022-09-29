const sinon = require("sinon");
const { expect } = require("chai");
const loginController = require("../../../controllers/loginController");
const loginService = require("../../../services/loginService");
const {
  userValid,
  loginMock,
  invalidBody,
} = require("../../mocks/users.mocks");
const ApiError = require("../../../middlewares/ApiError");

describe("Login controller:", () => {
  const response = {};
  const request = {};

  request.body = userValid;
  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(loginService, "login").resolves(loginMock);
  });
  afterEach(() => {
    sinon.restore();
  });

  it("Should return the correct object with status 200", async () => {
    await loginController.login(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
    expect(response.json.calledWith(loginMock)).to.be.equal(true);
  });

  describe("Exceptions", () => {
    const response = {};
    const request = {};
    request.body = invalidBody;

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon
        .stub(loginService, "login")
        .rejects(new ApiError(404, "User not found"));
    });

    it("Should return an error if invalid credentials are provided", async () => {
      try {
        await loginController.login(request, response);
      } catch (error) {
        expect(error.status).to.be.equal(404);
      }
    });
  });
});
