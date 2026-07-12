import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import api from "../../../utils/api";

const LINK = "http://localhost:8000/user";

function TableUsers({ users, setDeleted }) {
    const deleteClient = (id) => {
        api.delete(LINK + "/" + id)
            .then(() => setDeleted(prev => !prev))
            .catch((err) => console.log(err));
    }
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center align-middle bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
                <h1 className="text-2xl font-bold">Users Management</h1>
                <div className="flex flex-row gap-2">
                    <Link to={"/dashboard/users/add"} className="btn btn-active border-none bg-green-600 text-white hover:bg-green-700">+ Add User </Link>
                </div>
            </div>
            <div className="overflow-auto bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Role</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.nom}</td>
                                <td>{user.prenom}</td>
                                <td>{user.email}</td>
                                <td>{user.telephone}</td>
                                <td>{user.role}</td>
                                <td className="flex flex-row gap-2">
                                    <Link to={"/dashboard/users/" + user._id} className="btn btn-ghost btn-xs bg-color-primary text-white"> Modifier </Link>
                                    <button onClick={() => deleteClient(user._id)} className="btn btn-ghost btn-xs bg-red-600 text-white"> Suprimer </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableUsers