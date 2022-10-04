import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { api } from "../../services/fetchtRegister";
import ContextGlobal from "../../context/ContextGlobal";
import OrdersClient from "../../pages/OrdersClient";
import { saleByIdMock, userWithToken } from "../mocks";
import {
  customerDateId,
  customerOrderId,
  customerPriceId,
  customerStatusId,
  customerAddressId
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

describe("Orders client details page:", () => {
  it("Should render all page elements", async () => {
    const setSellers = jest.fn();
    const setOrder = jest.fn();
    const dateConvert = jest.fn();
    const setOrders = jest.fn();

    render(
      <ContextGlobal.Provider
        value={{ orders: saleByIdMock, setOrders,setSellers, setOrder, dateConvert }}
      >
        <OrdersClient />
      </ContextGlobal.Provider>
    );
    await waitFor(() => expect(api.get).toHaveBeenCalled());
    const orderId = screen.getByTestId(customerOrderId);
    const price = screen.getByTestId(customerPriceId);
    const date = screen.getByTestId(customerDateId);
    const status = screen.getByTestId(customerStatusId);
    expect(orderId).toBeInTheDocument();
    expect(orderId).toBeVisible();
    expect(price).toBeInTheDocument();
    expect(price).toBeVisible();
    expect(date).toBeInTheDocument();
    expect(date).toBeVisible();
    expect(status).toBeInTheDocument();
    expect(status).toBeVisible();
  })
})