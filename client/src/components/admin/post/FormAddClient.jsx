import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "./index";

const LINK = "http://localhost:8000/api/admin";

function FormAddClient() {
  const [data, setData] = useState({
    First_Name: "",
    Last_Name: "",
    CIN: "",
    Email: "",
    Phone: "",
    Number_Appartement: "",
  });

  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    axios.get(LINK + "/appartements").then((res) => setApartments(res.data));
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(LINK + "/client", data);
    navigate("/dashboard/client");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center align-middle bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <h1 className="text-2xl font-bold">Ajouter Client</h1>
        <Link
          to={"/dashboard/client"}
          className="btn btn-active border-none hover:bg-color-primary"
        >
          Afficher Clients
        </Link>
      </div>
      <div className="overflow-auto flex flex-col items-center bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <div className="w-1/2">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="label text-xs font-medium">Prénom</label>
              <Input
                value={data.First_Name}
                onChange={handleChange}
                type="text"
                name="First_Name"
                id="First_Name"
                placeholder=""
              />
            </div>
            <div>
              <label className="label text-xs font-medium">
                Nom de famille
              </label>
              <Input
                value={data.Last_Name}
                onChange={handleChange}
                type="text"
                name="Last_Name"
                id="Last_Name"
                placeholder=""
              />
            </div>
            <div>
              <label className="label text-xs font-medium">CIN</label>
              <Input
                value={data.CIN}
                onChange={handleChange}
                type="text"
                name="CIN"
                id="CIN"
                placeholder=""
              />
            </div>
            <div>
              <label className="label text-xs font-medium">Email</label>
              <Input
                value={data.Email}
                onChange={handleChange}
                type="email"
                name="Email"
                id="Email"
              />
            </div>
            <div>
              <label className="label text-xs font-medium">Téléphone</label>
              <Input
                value={data.Phone}
                onChange={handleChange}
                type="text"
                name="Phone"
                id="Phone"
              />
            </div>
            <div>
              <label className="label text-xs font-medium">Appartement</label>
              <select
                value={data.Number_Appartement}
                onChange={handleChange}
                name="Number_Appartement"
                id="Number_Appartement"
                className="select w-full block px-4 py-2 rounded-none text-gray-700 placeholder-gray-400 bg-white border border-gray-200 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              >
                {apartments.map((apartment, id) => (
                  <option key={id}>{apartment.Number_Appartement}</option>
                ))}
              </select>
            </div>
            <div className="mt-2 font-main">
              <Button type="submit" text="Submit" textColor={false} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormAddClient;
