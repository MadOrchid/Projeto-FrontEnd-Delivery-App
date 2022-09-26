const sinon = require("sinon");
const chai = require("chai");
const { User } = require("../../../database/models");
const {
  validUserRegister,
  validUserRegisterResponseNoToken,
} = require("../../mocks/users.mocks");

const { expect } = chai;

describe("User model:", () => {
  beforeEach(() => {
    sinon.stub(User, "create").resolves(validUserRegisterResponseNoToken);
  });
  afterEach(() => {
    sinon.restore();
  });

  describe("Create:", () => {
    it("Should create a new user", async () => {
      const result = await User.create(validUserRegister);
      expect(result).to.be.deep.equal(validUserRegisterResponseNoToken);
    });
  });
});
