import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Login from "../../pages/Login";
import {
  userInputEmailMock,
  userInputPasswordMock,
  userLoginEmailInputId,
  userLoginEnterButton,
  userLoginPasswordInputId,
  userLoginRegisterButton,
} from "../constants";

describe("Login page:", () => {
  it("Login page should have all elements", () => {
    render(<Login />);
    const inputEmail = screen.getByTestId(userLoginEmailInputId);
    const inputPassword = screen.getByTestId(userLoginPasswordInputId);
    const enterButton = screen.getByTestId(userLoginEnterButton);
    const registerButton = screen.getByTestId(userLoginRegisterButton);
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toBeVisible();
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toBeVisible();
    expect(enterButton).toBeInTheDocument();
    expect(enterButton).toBeVisible();
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeVisible();
  });
  it("User should be able to provide an email and password", () => {
    render(<Login />);
    const inputEmail = screen.getByTestId(userLoginEmailInputId);
    const inputPassword = screen.getByTestId(userLoginPasswordInputId);
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    userEvent.type(inputEmail, userInputEmailMock);
    userEvent.type(inputPassword, userInputPasswordMock);
    expect(inputEmail).toHaveValue(userInputEmailMock);
    expect(inputPassword).toHaveValue(userInputPasswordMock);
  });
  it("Enter button should be disabled if no information is provided", () => {
    render(<Login />);
    const inputEmail = screen.getByTestId(userLoginEmailInputId);
    const inputPassword = screen.getByTestId(userLoginPasswordInputId);
    const enterButton = screen.getByTestId(userLoginEnterButton);
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toBeVisible();
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toBeVisible();
    expect(enterButton).toBeInTheDocument();
    expect(enterButton).toBeVisible();
    expect(enterButton).toBeDisabled();
  });
  it("Enter button should be enabled if all login informations are provided", () => {
    render(<Login />);
    const inputEmail = screen.getByTestId(userLoginEmailInputId);
    const inputPassword = screen.getByTestId(userLoginPasswordInputId);
    const enterButton = screen.getByTestId(userLoginEnterButton);
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toBeVisible();
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toBeVisible();
    expect(enterButton).toBeInTheDocument();
    expect(enterButton).toBeVisible();
    userEvent.type(inputEmail, userInputEmailMock);
    userEvent.type(inputPassword, userInputPasswordMock);
    expect(inputEmail).toHaveValue(userInputEmailMock);
    expect(inputPassword).toHaveValue(userInputPasswordMock);
    expect(enterButton).not.toBeDisabled();
  });
  it("Should redirect to register page when register button is clicked", async () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Login />
      </Router>
    );
    const registerButton = screen.getByTestId(userLoginRegisterButton);
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeVisible();
    userEvent.click(registerButton);
    await waitFor(() => {
      expect(history.location.pathname).toBe("/register");
    });
  });
});
