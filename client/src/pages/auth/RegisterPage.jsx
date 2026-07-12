import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackgroundAuth from "../../assets/images/BackgoundAuth.jpg";
import { Button, Input } from "../../components/auth/indexComponentsAuth";
import { ToastContainer } from "react-toastify";

const LINK = "http://localhost:8000/api/auth";

function RegisterPage() {
  const [data, setData] = useState({
    Full_Name: "",
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(LINK + "/register", data);
    navigate("/");
  };

  return (
    <div
      className="hero min-h-screen bg-base-200"
      style={{ backgroundImage: `url(${BackgroundAuth})` }}
    >
      <div className="hero-content flex-col lg:flex-row-reverse lg:w-3/6">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="my-5 mx-3 px-3">
            <p className="text-2xl mb-6 font-bold">Créez votre compte</p>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="label text-xs font-medium">Votre Name</label>
                <Input
                  value={data.Full_Name}
                  onChange={handleChange}
                  type="text"
                  name="Full_Name"
                  id="Full_Name"
                />
              </div>
              <div>
                <label className="label text-xs font-medium">
                  Adresse email - Format: exemple@mail.com
                </label>
                <Input
                  value={data.Email}
                  onChange={handleChange}
                  type="email"
                  name="Email"
                  id="Email"
                />
              </div>
              <div>
                <label className="label text-xs font-medium">
                  Nouveau mot de passe
                </label>
                <Input
                  value={data.Password}
                  onChange={handleChange}
                  type="password"
                  name="Password"
                  id="Password"
                />
              </div>
              <div className="mt-3 font-main">
                <Button
                  type="submit"
                  text="Créez votre compte "
                  textColor={false}
                />
              </div>
              <div className="mt-2 flex flex-row gap-2">
                <span className="text-xs"> Vous avez déjà un compte ?</span>
                <Link
                  to={"/"}
                  className="text-blue-500 text-xs focus:outline-none text-color-primary font-medium hover:text-color-secondary focus:underline hover:underline"
                >
                  Connectez-vous
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden bg-cover lg:block lg:w-3/6 text-center lg:text-left">
          <h1 className="text-5xl text-white font-bold">Syndicat</h1>
          <p className="py-6 text-white">
            Application de syndicat pour gérer les paiement pour chaque
            appartement
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegisterPage;
