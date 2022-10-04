import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { api } from "../../services/fetchtRegister";
import ContextGlobal from "../../context/ContextGlobal";
import OrdersSeller from "../../pages/OrdersSeller";
import { saleByIdMock, userWithToken } from "../mocks";
import {
  sellerAddressId,
  sellerDateId,
  sellerOrderId,
  sellerPriceId,
  sellerStatusId,
} from "../constants";

jest.mock("../../services/fetchtRegister");
beforeEach(() => {
  localStorage.setItem("user", JSON.stringify(userWithToken));
  api.get.mockReturnValue(
    Promise.resolve({
      data: saleByIdMock,
    })
  );
});
afterEach(() => jest.clearAllMocks());

describe("Orders client page:", () => {
  it("Should render all page elements", async () => {
    const setOrders = jest.fn();
    const setOrder = jest.fn();
    const dateConvert = jest.fn();

    render(
      <ContextGlobal.Provider
        value={{ orders: saleByIdMock, setOrders, setOrder, dateConvert }}
      >
        <OrdersSeller />
      </ContextGlobal.Provider>
    );
    await waitFor(() => expect(api.get).toHaveBeenCalled());
    const orderId = screen.getByTestId(sellerOrderId);
    const price = screen.getByTestId(sellerPriceId);
    const date = screen.getByTestId(sellerDateId);
    const address = screen.getByTestId(sellerAddressId);
    const status = screen.getByTestId(sellerStatusId);
    expect(orderId).toBeInTheDocument();
    expect(orderId).toBeVisible();
    expect(price).toBeInTheDocument();
    expect(price).toBeVisible();
    expect(date).toBeInTheDocument();
    expect(date).toBeVisible();
    expect(address).toBeInTheDocument();
    expect(address).toBeVisible();
    expect(status).toBeInTheDocument();
    expect(status).toBeVisible();
  });
  it("Clicking in the card should redirect to details page", async () => {
    const setOrders = jest.fn();
    const setOrder = jest.fn();
    const dateConvert = jest.fn();
    const history = createMemoryHistory();

    render(
      <ContextGlobal.Provider
        value={{ orders: saleByIdMock, setOrders, setOrder, dateConvert }}
      >
        <Router history={history}>
          <OrdersSeller />
        </Router>
      </ContextGlobal.Provider>
    );
    await waitFor(() => expect(api.get).toHaveBeenCalled());
    const orderId = screen.getByTestId(sellerOrderId);
    expect(orderId).toBeInTheDocument();
    expect(orderId).toBeVisible();
    userEvent.click(orderId);
    await waitFor(() => {
      expect(history.location.pathname).toBe("/seller/orders/1");
    });


  })
});
