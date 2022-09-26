const userValid = {
  "email": "adm@deliveryapp.com",
  "password": "--adm2@21!!--",
  "name": "Delivery App Admin"
};

const userNotValid = {
  "email": "admdeliveryapp.com",
  "password": "--adm2@21!!--",
  "name": "Delivery App Admin"
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

module.exports = {
  userValid,
  userNotValid,
  validUserRegister,
  validUserRegisterResponse,
  validUserRegisterResponseNoToken
};
