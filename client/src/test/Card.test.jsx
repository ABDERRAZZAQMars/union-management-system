import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Card from "../components/shared/Card";

jest.mock("axios");

beforeEach(() => {
  localStorage.setItem("user", JSON.stringify({ token: "fake-token" }));
});

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe("Card", () => {
  test("kay3ri l 4 cards b les noms s7a7", () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<Card />);

    expect(screen.getByText("Users Management")).toBeInTheDocument();
    expect(screen.getByText("Members Management")).toBeInTheDocument();
    expect(screen.getByText("Contributions")).toBeInTheDocument();
    expect(screen.getByText("Announcements")).toBeInTheDocument();
  });

  test("kaybin l 3adad s7i7 mnin iji response mn API", async () => {
    axios.get.mockResolvedValueOnce({ data: [{}, {}] }); // users: 2

    render(<Card />);

    await waitFor(() => {
      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });
});