const sinon = require("sinon");
const chai = require("chai");
const { User } = require("../../../database/models");
const loginService = require("../../../services/loginService");
const jwtService = require("../../../helpers/jwt");
const {
  loginMock,
  userBdLoginResponse,
  tokenMock,
} = require("../../mocks/users.mocks");

const { expect } = require("chai");

describe("Login service:", () => {
  beforeEach(() => {
    sinon.stub(jwtService, "createToken").returns(tokenMock);
    sinon
      .stub(User, "findOne")
      .onCall(0)
      .resolves(userBdLoginResponse)
      .onCall(1)
      .resolves(null)
      .onCall(2)
      .resolves(null);
  });
  afterEach(() => {
    sinon.restore();
  });

  describe("Login:", () => {
    it("Should approve a login when valid information is provided", async () => {
      const result = await loginService.login({
        email: "zebirita@email.com",
        password: "$#zebirita#$",
      });
      expect(result).to.be.deep.equal(loginMock);
    });
    it("Should reject a login when no valid password is provided", async () => {
      try {
        await loginService.login({
          email: "zebirita@email.com",
          password: "$#zebirita#",
        });
      } catch (error) {
        expect(error.status).to.be.equal(404);
      }
    });
    it("Should reject a login when no valid email is provided", async () => {
      try {
        await loginService.login({
          email: "zebiritaemail.com",
          password: "$#zebirita#$",
        });
      } catch (error) {
        expect(error.status).to.be.equal(404);
      }
    });
  });
});
