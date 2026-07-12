import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../../utils/api";

import { Button, Input } from "./index";

const LINK = "http://localhost:8000/user";

function UserPost() {

  const [data, setData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    telephone: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(LINK + "/register", data);
      navigate("/dashboard/users");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center align-middle bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <h1 className="text-2xl font-bold">Add User</h1>
        <Link to={"/dashboard/users"} className="btn btn-active border-none hover:bg-color-primary"> Users </Link>
      </div>
      <div className="overflow-auto flex flex-col items-center bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <div className="w-1/2">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="label text-xs font-medium">Nom</label>
              <Input value={data.nom} onChange={handleChange} type="text" name="nom" id="nom" placeholder="" />
            </div>
            <div>
              <label className="label text-xs font-medium">Prenom</label>
              <Input value={data.prenom} onChange={handleChange} type="text" name="prenom" id="prenom" placeholder="" />
            </div>
            <div>
              <label className="label text-xs font-medium">Email</label>
              <Input value={data.email} onChange={handleChange} type="email" name="email" id="email" placeholder="" />
            </div>
            <div>
              <label className="label text-xs font-medium">Mot de passe</label>
              <Input value={data.password} onChange={handleChange} type="password" name="password" id="password" placeholder="" />
            </div>
            <div>
              <label className="label text-xs font-medium">Téléphone</label>
              <Input value={data.telephone} onChange={handleChange} type="text" name="telephone" id="telephone" placeholder="" />
            </div>
            <div>
              <label className="label text-xs font-medium">Role</label>
              <Input value={data.role} onChange={handleChange} type="text" name="role" id="role" placeholder="" />
            </div>
            <div className="mt-2 font-main">
              <Button type="submit" text="Submit" textColor={false} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserPost