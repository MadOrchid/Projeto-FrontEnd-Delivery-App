const sinon = require("sinon");
const { expect } = require("chai");

const { User } = require("../../../database/models");
const userService = require("../../../services/usersService");
const { sellersMock } = require("../../mocks/users.mocks");
const jwtService = require("../../../helpers/jwt");

describe("User service:", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("checkIfExists:", () => {
    before(() => {
      sinon
        .stub(User, "findAll")
        .onCall(0)
        .resolves([])
        .onCall(1)
        .resolves(null);
    });
    it("Should return true if user does not exists", async () => {
      const result = await userService.checkIfExist({
        name: "User de teste",
        email: "userteste@deliveryapp.com",
        password: "teste@123",
      });
      expect(result).to.deep.equal(true);
    });
    it("Should throw error if user exists", async () => {
      try {
        await userService.checkIfExist({
          name: "User de teste",
          email: "userteste@deliveryapp.com",
          password: "teste@123",
        });
      } catch (error) {
        expect(error.message).to.deep.equal("User already registered");
      }
    });
  });

  describe("listSellers", () => {
    before(() => {
      sinon.stub(User, "findAll").resolves(sellersMock);
    });
    it("Should list all sellers", async () => {
      const result = await userService.listSellers();
      expect(result).to.deep.equal(sellersMock);
    });
  });

  describe("Create", () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoidXNlcnRlc3RlQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJjdXN0b21lciIsIm5hbWUiOiJVc2VyIGRlIHRlc3RlIn0sImlhdCI6MTY2NDQwNTg5Nn0.yWSGH5XMyAOjPjU7W84r_LWY_nzsLwP5qMEGw5V1f5U"
    const registration = {
      "name": "User de teste",
      "email": "userteste@deliveryapp.com",
      "password": "teste@123"
    }
    const response = {
      "email": "userteste@deliveryapp.com",
      "role": "customer",
      "name": "User de teste",
      token
    }

    before(() => {
      sinon.stub(User, 'create').resolves()
      sinon.stub(jwtService, 'createToken').returns(token)
    })
    it("Should create a user", async () => {
      const result = await userService.create(registration);
      expect(result).to.deep.equal(response);
    })
  })
});
