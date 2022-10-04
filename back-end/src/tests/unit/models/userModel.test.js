const sinon = require("sinon");
const chai = require("chai");
const { User } = require("../../../database/models");
const {
  validUserRegister,
  validUserRegisterResponseNoToken,
  findSellersMock,
} = require("../../mocks/users.mocks");

const { expect } = chai;

describe("User model:", () => {
  beforeEach(() => {
    sinon.stub(User, "create").resolves(validUserRegisterResponseNoToken);
    sinon.stub(User, "findAll").withArgs({ 
      where: { 
        role: 'seller', 
      },
      attributes: { exclude: ['password'] },
      raw: true,
    }).returns([findSellersMock])
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

  describe("Find Sellers:", () => {
    it("Should list all sellers", async () => {
      const result = await User.findAll({ 
        where: { 
          role: 'seller', 
        },
        attributes: { exclude: ['password'] },
        raw: true,
      });
      expect(result).to.be.deep.equal([findSellersMock]);
    });
  });
});
