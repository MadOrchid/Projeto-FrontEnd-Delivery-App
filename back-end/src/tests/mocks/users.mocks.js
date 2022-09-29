const userValid = {
  "email": "adm@deliveryapp.com",
  "password": "--adm2@21!!--",
};

const userNotValid = {
  "email": "admdeliveryapp.com",
  "password": "--adm2@21!!--",
};

const validUserRegister = {
	"name": "User de teste",
	"email": "userteste@deliveryapp.com",
	"password": "teste@123"
};

const validUserRegisterResponse = {
	"email": "userteste@deliveryapp.com",
  "password": "e1b7e7803215d5488588370572d13102",
	"role": "customer",
	"name": "User de teste",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoidXNlcnRlc3RlQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJjdXN0b21lciIsIm5hbWUiOiJVc2VyIGRlIHRlc3RlIn0sImlhdCI6MTY2NDIxMDMwOX0.b4PdK2qtY8ujodWHvomqThdQ250IGFtjcsuuIowhKqI"
};

const validUserRegisterResponseNoToken = {
	"email": "userteste@deliveryapp.com",
  "password": "e1b7e7803215d5488588370572d13102",
	"role": "customer",
	"name": "User de teste",
};

const findSellersMock = {
		"id": 2,
		"name": "Fulana Pereira",
		"email": "fulana@deliveryapp.com",
		"role": "seller"
	};

userBdLoginResponse = {
  name: "Cliente Zé Birita",
  email: "zebirita@email.com",
  role: "customer",
}

const tokenMock ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJDbGllbnRlIFrDqSBCaXJpdGEiLCJlbWFpbCI6InplYmlyaXRhQGVtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2NjQzOTM0NDV9.iVh2oJkl1g8brAyivrt-MM8MOqICDXYBOVL3llLOste";

const loginMock = {
	"name": "Cliente Zé Birita",
	"email": "zebirita@email.com",
	"role": "customer",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJDbGllbnRlIFrDqSBCaXJpdGEiLCJlbWFpbCI6InplYmlyaXRhQGVtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2NjQzOTM0NDV9.iVh2oJkl1g8brAyivrt-MM8MOqICDXYBOVL3llLOste"
};

const loginBody = {
	"email": "zebirita@email.com",
	"password": "$#zebirita#$"
}

const invalidBody = {
	"email": "zebirita@email.com",
	"password": "$#zebirita#"
}

const sellersMock = [
	{
		"id": 2,
		"name": "Fulana Pereira",
		"email": "fulana@deliveryapp.com",
		"role": "seller"
	}
]

module.exports = {
  userValid,
  userNotValid,
  validUserRegister,
  validUserRegisterResponse,
  validUserRegisterResponseNoToken,
  findSellersMock,
  tokenMock,
  loginMock,
  userBdLoginResponse,
	sellersMock,
	loginBody,
	invalidBody
};
