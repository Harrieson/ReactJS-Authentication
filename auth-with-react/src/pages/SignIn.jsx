import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { signInFailure, signInStart, signInSuccess } from "../redux-state/user/userSlice";



export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {error, loading} = useSelector((state) => state.user)
  const redirectToUrl = useNavigate();
  const dispatch = useDispatch();


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
      dispatch(signInStart())
      const response = await fetch(
        "http://localhost:8000/api/auth/sign-in",
        options
      );
      const data = await response.json();
      console.log(data);
      dispatch(signInSuccess(data))

      if (data.success ===false) {
        dispatch(signInFailure())
        return;
      }
      redirectToUrl('/')
    } catch (error) {
      dispatch(signInFailure(error))
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
      <p className="text-red-700 mt-5 mb-5">
          {error && 'Something is wrong with submitted data, Please Check and try again.'}
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          {loading ? "Loading data ...": "Sign In"}
        </button>
        <hr className="border" />
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&apos;t have an account? </p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up Here</span>
        </Link>
      </div>
    </div>
  );
}
