import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import LoginPage from "../pages/auth/LoginPage";
import { UserContext } from "../useContext/UserContext";

jest.mock("axios");

const renderLoginPage = () => {
  render(
    <BrowserRouter>
      <UserContext.Provider value={{ auth: {}, setAuth: jest.fn() }}>
        <LoginPage />
      </UserContext.Provider>
    </BrowserRouter>
  );
};

describe("LoginPage", () => {
  test("kay3ri les inputs o le bouton", () => {
    renderLoginPage();
    expect(screen.getByLabelText(/Adresse email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Se connecter/i })).toBeInTheDocument();
  });

  test("kayban message d'erreur ila l form khawya", async () => {
    renderLoginPage();
    const button = screen.getByRole("button", { name: /Se connecter/i });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Merci de remplir/i)).toBeInTheDocument();
    });

    expect(axios.post).not.toHaveBeenCalled();
  });

  test("kaybdel l input mnin kayktb user", async () => {
    renderLoginPage();
    const emailInput = screen.getByLabelText(/Adresse email/i);

    await userEvent.type(emailInput, "test@mail.com"); // v13: bla .setup()

    expect(emailInput.value).toBe("test@mail.com");
  });

  test("kaydir POST request mnin l form 3amra", async () => {
    axios.post.mockResolvedValueOnce({
      data: { nom: "Mars", prenom: "Abderrazzaq", role: "admin", token: "fake-token" },
    });

    renderLoginPage();

    await userEvent.type(screen.getByLabelText(/Adresse email/i), "test@mail.com");
    await userEvent.type(screen.getByLabelText(/Mot de passe/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /Se connecter/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8000/user/login",
        { email: "test@mail.com", password: "password123" }
      );
    });
  });
});