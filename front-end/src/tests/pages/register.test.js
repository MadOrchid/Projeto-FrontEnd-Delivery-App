import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { api } from "../../services/fetchtRegister";
import Register from "../../pages/Register";
import {
  registerButtonId,
  registerEmailInputId,
  registerEmailInputMock,
  registerNameInputId,
  registerNameInputMock,
  registerPasswordInputId,
  registerPasswordInputMock,
} from "../constants";

jest.mock("../../services/fetchtRegister");
const mockedApi = api;

afterEach(() => {
  jest.clearAllMocks();
});

describe("Register page", () => {
  it("Register page should have all elements", () => {
    render(<Register />);
    const inputName = screen.getByTestId(registerNameInputId);
    const inputEmail = screen.getByTestId(registerEmailInputId);
    const inputPassword = screen.getByTestId(registerPasswordInputId);
    const registerButton = screen.getByTestId(registerButtonId);
    expect(inputName).toBeInTheDocument();
    expect(inputName).toBeVisible();
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toBeVisible();
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toBeVisible();
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeVisible();
  });
  it("User should be able to provide all information needed", () => {
    render(<Register />);
    const inputName = screen.getByTestId(registerNameInputId);
    const inputEmail = screen.getByTestId(registerEmailInputId);
    const inputPassword = screen.getByTestId(registerPasswordInputId);
    const registerButton = screen.getByTestId(registerButtonId);
    expect(inputName).toBeInTheDocument();
    expect(inputName).toBeVisible();
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toBeVisible();
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toBeVisible();
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeVisible();
    userEvent.type(inputName, registerNameInputMock);
    userEvent.type(inputEmail, registerEmailInputMock);
    userEvent.type(inputPassword, registerPasswordInputMock);
    expect(inputName).toHaveValue(registerNameInputMock);
    expect(inputEmail).toHaveValue(registerEmailInputMock);
    expect(inputPassword).toHaveValue(registerPasswordInputMock);
  });
  it("Register button should be disabled if only name is provided", () => {
    render(<Register />);
    const inputName = screen.getByTestId(registerNameInputId);
    const inputEmail = screen.getByTestId(registerEmailInputId);
    const inputPassword = screen.getByTestId(registerPasswordInputId);
    const registerButton = screen.getByTestId(registerButtonId);
    expect(inputName).toBeInTheDocument();
    expect(inputName).toBeVisible();
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toBeVisible();
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toBeVisible();
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeVisible();
    expect(registerButton).toBeDisabled();
    userEvent.type(inputName, registerNameInputMock);
    expect(inputName).toHaveValue(registerNameInputMock);
    expect(registerButton).toBeDisabled();
  });
  it("Register button should be disabled if only email is provided", () => {
    render(<Register />);
    const inputName = screen.getByTestId(registerNameInputId);
    const inputEmail = screen.getByTestId(registerEmailInputId);
    const inputPassword = screen.getByTestId(registerPasswordInputId);
    const registerButton = screen.getByTestId(registerButtonId);
    expect(inputName).toBeInTheDocument();
    expect(inputName).toBeVisible();
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toBeVisible();
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toBeVisible();
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeVisible();
    expect(registerButton).toBeDisabled();
    userEvent.type(inputEmail, registerEmailInputMock);
    expect(inputEmail).toHaveValue(registerEmailInputMock);
    expect(registerButton).toBeDisabled();
  });
  it("Register button should be disabled if only password is provided", () => {
    render(<Register />);
    const inputName = screen.getByTestId(registerNameInputId);
    const inputEmail = screen.getByTestId(registerEmailInputId);
    const inputPassword = screen.getByTestId(registerPasswordInputId);
    const registerButton = screen.getByTestId(registerButtonId);
    expect(inputName).toBeInTheDocument();
    expect(inputName).toBeVisible();
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toBeVisible();
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toBeVisible();
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeVisible();
    expect(registerButton).toBeDisabled();
    userEvent.type(inputPassword, registerPasswordInputMock);
    expect(inputPassword).toHaveValue(registerPasswordInputMock);
    expect(registerButton).toBeDisabled();
  });
  it("Register button should be disabled if two fields are filled", () => {
    render(<Register />);
    const inputName = screen.getByTestId(registerNameInputId);
    const inputEmail = screen.getByTestId(registerEmailInputId);
    const inputPassword = screen.getByTestId(registerPasswordInputId);
    const registerButton = screen.getByTestId(registerButtonId);
    expect(inputName).toBeInTheDocument();
    expect(inputName).toBeVisible();
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toBeVisible();
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toBeVisible();
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeVisible();
    expect(registerButton).toBeDisabled();
    userEvent.type(inputName, registerNameInputMock);
    expect(inputName).toHaveValue(registerNameInputMock);
    userEvent.type(inputPassword, registerPasswordInputMock);
    expect(inputPassword).toHaveValue(registerPasswordInputMock);
    expect(registerButton).toBeDisabled();
  });
  it("Register button should be enabled when all fields are filled", () => {
    render(<Register />);
    const inputName = screen.getByTestId(registerNameInputId);
    const inputEmail = screen.getByTestId(registerEmailInputId);
    const inputPassword = screen.getByTestId(registerPasswordInputId);
    const registerButton = screen.getByTestId(registerButtonId);
    expect(inputName).toBeInTheDocument();
    expect(inputName).toBeVisible();
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toBeVisible();
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toBeVisible();
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeVisible();
    userEvent.type(inputName, registerNameInputMock);
    expect(inputName).toHaveValue(registerNameInputMock);
    expect(registerButton).toBeDisabled();
    userEvent.type(inputEmail, registerEmailInputMock);
    expect(inputEmail).toHaveValue(registerEmailInputMock);
    expect(registerButton).toBeDisabled();
    userEvent.type(inputPassword, registerPasswordInputMock);
    expect(inputPassword).toHaveValue(registerPasswordInputMock);
    expect(registerButton).not.toBeDisabled();
  });
  describe("Register cycle:", () => {
    const payloadMock = {
      status: 201,
      data: jest.fn(),
    };
    it("Should redirect the user to products page after registration", async () => {
      const history = createMemoryHistory();
      mockedApi.post.mockResolvedValueOnce(payloadMock);
      render(
        <Router history={history}>
          <Register />
        </Router>
      );

      const inputName = screen.getByTestId(registerNameInputId);
      const inputEmail = screen.getByTestId(registerEmailInputId);
      const inputPassword = screen.getByTestId(registerPasswordInputId);
      const registerButton = screen.getByTestId(registerButtonId);
      expect(inputName).toBeInTheDocument();
      expect(inputName).toBeVisible();
      expect(inputEmail).toBeInTheDocument();
      expect(inputEmail).toBeVisible();
      expect(inputPassword).toBeInTheDocument();
      expect(inputPassword).toBeVisible();
      expect(registerButton).toBeInTheDocument();
      expect(registerButton).toBeVisible();
      userEvent.type(inputName, registerNameInputMock);
      expect(inputName).toHaveValue(registerNameInputMock);
      expect(registerButton).toBeDisabled();
      userEvent.type(inputEmail, registerEmailInputMock);
      expect(inputEmail).toHaveValue(registerEmailInputMock);
      expect(registerButton).toBeDisabled();
      userEvent.type(inputPassword, registerPasswordInputMock);
      expect(inputPassword).toHaveValue(registerPasswordInputMock);
      expect(registerButton).not.toBeDisabled();
      userEvent.click(registerButton);
      await waitFor(() => {
        expect(history.location.pathname).toBe("/customer/products");
      });
    });
  });
});
