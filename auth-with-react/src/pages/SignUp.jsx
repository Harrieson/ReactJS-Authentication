import { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = (event) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:8000/api/auth/sign-up",
        options
      );
      const data = await response.json();
      console.log(data);
      setLoading(false);

      if (data.success ===false) {
        setError(true);
        return;
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <p className="text-red-700 mt-5 mb-5">
          {error && 'Something is wrong with submitted data, Please Check and try again.'}
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          onClick={handleChange}
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-300 p-3 rounded-lg"
        />
        <input
          onClick={handleChange}
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-300 p-3 rounded-lg"
        />
        <input
          onClick={handleChange}
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-300 p-3 rounded-lg"
        />
        <button disabled={loading} className="bg-slate-500 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed">
          {loading ? "Loading data ...": "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Already have an account? </p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
    </div>
  );
}
