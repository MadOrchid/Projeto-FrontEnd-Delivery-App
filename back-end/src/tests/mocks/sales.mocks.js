const saleBody = {
	"userName": "Cliente Zé Birita",
	"sellerName": "Fulana Pereira",
	"totalPrice": "38.50",
	"deliveryAddress": "Rua do teste",
	"deliveryNumber": "123",
	"products": [
		{
		"productId": "8",
		"quantity": "4"
		},
		{
		"productId": "4",
		"quantity": "1"
		},
		{
		"productId": "2",
		"quantity": "2"
		}
	]
}

const saleArgs = {
  userId: 3,
  sellerId: 2,
  totalPrice: "38.50",
  deliveryAddress: "Rua do teste",
  deliveryNumber: "123",
  saleDate: "2022-09-28T17:21:58-03:00",
  status: "Pendente",
}

const fetchedSale = {
	"id": 1,
	"userId": 3,
	"sellerId": 2,
	"totalPrice": "38.50",
	"deliveryAddress": "Rua do teste",
	"deliveryNumber": "123",
	"saleDate": "2022-09-28T20:18:00.000Z",
	"status": "Pendente",
	"user": {
		"id": 3,
		"name": "Cliente Zé Birita",
		"email": "zebirita@email.com",
		"role": "customer"
	},
	"products": [
		{
			"id": 2,
			"name": "Heineken 600ml",
			"price": "7.50",
			"urlImage": "http://localhost:3001/images/heineken_600ml.jpg",
			"SalesProducts": {
				"saleId": 1,
				"productId": 2,
				"quantity": 2
			}
		},
		{
			"id": 4,
			"name": "Brahma 600ml",
			"price": "7.50",
			"urlImage": "http://localhost:3001/images/brahma_600ml.jpg",
			"SalesProducts": {
				"saleId": 1,
				"productId": 4,
				"quantity": 1
			}
		},
		{
			"id": 8,
			"name": "Brahma Duplo Malte 350ml",
			"price": "2.79",
			"urlImage": "http://localhost:3001/images/brahma_duplo_malte_350ml.jpg",
			"SalesProducts": {
				"saleId": 1,
				"productId": 8,
				"quantity": 4
			}
		}
	]
}



module.exports = {
  saleBody,
  saleArgs,
  fetchedSale
};
