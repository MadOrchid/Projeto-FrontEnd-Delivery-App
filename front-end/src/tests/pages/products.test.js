import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { api } from "../../services/fetchtRegister";
import Products from "../../pages/Products";
import { productsMock, userWithToken } from "../mocks";
import ContextGlobal from "../../context/ContextGlobal";

jest.mock("../../services/fetchtRegister");

describe("Products page:", () => {
  beforeEach(() => {
    localStorage.setItem("user", JSON.stringify(userWithToken));
    api.get.mockReturnValue(
      Promise.resolve({
        data: productsMock,
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render all page elements", async () => {
    const setTotal = jest.fn();
    const setCart = jest.fn();
    render(
      <ContextGlobal.Provider
        value={{ products: productsMock, setTotal, setCart }}
      >
        <Products />
      </ContextGlobal.Provider>
    );

    await waitFor(() => expect(api.get).toHaveBeenCalled());
    const item1 = await screen.findByText(/Skol Lata 250ml/i);
    const item2 = await screen.findByText(/Heineken 600ml/i);
    const item3 = await screen.findByText(/Antarctica Pilsen 300ml/i);
    expect(item1).toBeInTheDocument();
    expect(item1).toBeVisible();
    expect(item2).toBeInTheDocument();
    expect(item2).toBeVisible();
    expect(item3).toBeInTheDocument();
    expect(item3).toBeVisible();
  });
  it("should change the amount correctly", async () => {
    const setTotal = jest.fn();
    const setCart = jest.fn();
    render(
      <ContextGlobal.Provider
        value={{ products: productsMock, setTotal, setCart }}
      >
        <Products />
      </ContextGlobal.Provider>
    );

    const addButton1 = await screen.findByTestId(
      "customer_products__button-card-add-item-1"
    );
    userEvent.click(addButton1);
    userEvent.click(addButton1);
    const amount = await screen.findByTestId(
      "customer_products__input-card-quantity-1"
    );
    expect(amount.value).toBe("2");
    const removeButton1 = await screen.findByTestId(
      "customer_products__button-card-rm-item-1"
    );
    userEvent.click(removeButton1);
    expect(amount.value).toBe("1");
    const addButton2 = await screen.findByTestId(
      "customer_products__button-card-add-item-2"
    );
    userEvent.click(addButton2);
    const removeButton2 = await screen.findByTestId(
      "customer_products__button-card-rm-item-2"
    );
    userEvent.click(removeButton2);
    const amount2 = await screen.findByTestId(
      "customer_products__input-card-quantity-2"
    );
    expect(amount2.value).toBe("0");
    userEvent.type(amount2, "2");
    expect(amount2.value).toBe("2");
  });
  it("should navigate to the checkout page", async () => {
    const setTotal = jest.fn();
    const setCart = jest.fn();
    const history = createMemoryHistory();
    render(
      <ContextGlobal.Provider
        value={{ products: productsMock, setTotal, setCart }}
      >
        <Router history={history}>
          <Products />
        </Router>
      </ContextGlobal.Provider>
    );
    const checkoutBtn = screen.getByTestId("customer_products__button-cart");
    expect(checkoutBtn).toBeInTheDocument();
    const addButton1 = await screen.findByTestId(
      "customer_products__button-card-add-item-1"
    );
    userEvent.click(addButton1);
    userEvent.click(checkoutBtn);

    await waitFor(() => {
      expect(history.location.pathname).toBe("/checkout");
    });
  });
});
