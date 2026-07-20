import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import api from "../utils/api";
import TableUsers from "../components/admin/get/TableUsers";

jest.mock("../utils/api");

const mockUsers = [
  { _id: "1", nom: "Mars", prenom: "Abderrazzaq", email: "a@mail.com", telephone: "0600000000", role: "admin" },
  { _id: "2", nom: "Nadir", prenom: "Azdine", email: "b@mail.com", telephone: "0611111111", role: "admin" },
];

const renderTable = (users = mockUsers) => {
  const setDeleted = jest.fn();
  render(
    <BrowserRouter>
      <TableUsers users={users} setDeleted={setDeleted} />
    </BrowserRouter>
  );
  return { setDeleted };
};

describe("TableUsers", () => {
  test("kay3ri jami3 les users f table", () => {
    renderTable();
    expect(screen.getByText("Mars")).toBeInTheDocument();
    expect(screen.getByText("Nadir")).toBeInTheDocument();
  });

  test("kay3ri table khawya ila mkanch users", () => {
    renderTable([]);
    expect(screen.queryByText("Mars")).not.toBeInTheDocument();
  });

  test("kaydir DELETE request mnin kaydos 3la Supprimer", async () => {
    api.delete.mockResolvedValueOnce({});
    renderTable();

    const deleteButtons = screen.getAllByText(/Suprimer/i);
    fireEvent.click(deleteButtons[0]);

    expect(api.delete).toHaveBeenCalled();
  });
});