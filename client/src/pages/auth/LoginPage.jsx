import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackgroundAuth from "../../assets/images/BackgoundAuth.jpg";
import { Button, Input } from "../../components/auth/indexComponentsAuth";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../../useContext/UserContext";

const LINK = "http://localhost:8000/user";

function LoginPage() {
  const { setAuth } = useContext(UserContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation client-side
    if (!data.email || !data.password) {
      toast.error("Merci de remplir l'email et le mot de passe");
      return;
    }

    try {
      const result = await axios.post(LINK + "/login", data);

      setAuth(result.data);
      localStorage.setItem("user", JSON.stringify(result.data));
      toast.success(`Bienvenue ${result.data.nom} ${result.data.prenom}`);
      navigate("dashboard/");

    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div
      className="hero min-h-screen bg-base-200"
      style={{ backgroundImage: `url(${BackgroundAuth})` }}
    >
      <div className="hero-content flex-col lg:flex-row-reverse lg:w-3/6">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="my-5 mx-3 px-3">
            <p className="text-2xl mb-6 font-bold">Connexion</p>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="label text-xs font-medium"> Adresse email - Format: exemple@mail.com</label>
                <Input
                  value={data.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                />
              </div>
              <div>
               <label htmlFor="password" className="label text-xs font-medium">Mot de passe</label>
                <Input
                  value={data.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
              <div className="mt-2">
                <Link
                  to={"/forgetpassword"}
                  className="text-blue-500 text-xs focus:outline-none text-color-primary font-medium hover:text-color-secondary focus:underline hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="mt-2 font-main">
                <Button type="submit" text="Se connecter" textColor={false} />
              </div>
              <div className="mt-2 flex flex-row gap-2">
                <span className="text-xs">Nouveau compte sur Syndicat ?</span>
                <Link
                  to={"/register"}
                  className="text-blue-500 text-xs focus:outline-none text-color-primary font-medium hover:text-color-secondary focus:underline hover:underline"
                >
                  S'inscrire
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden bg-cover lg:block lg:w-3/6 text-center lg:text-left">
          <h1 className="text-5xl text-white font-bold">UNION MANAGEMENT SYSTEM</h1>
          <p className="py-6 text-white">The complete platform for managing your co-ownership union</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;