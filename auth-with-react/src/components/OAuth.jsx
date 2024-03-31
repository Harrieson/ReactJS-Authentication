import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { app } from "../firebase.js";
import { signInSuccess } from "../redux-state/user/userSlice.js";
export default function OAuth() {
    const dispatch = useDispatch();
  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const response = await fetch('http://localhost:8000/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
        }),
      });

      const data = await response.json();
      dispatch(signInSuccess(data))
    } catch (error) {
      console.log(" Could not login With Google: ", error);
    }
  };


  return (
    <button
      onClick={handleClick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase  hover:opacity-60"
    >
      Continue With Google
    </button>
  );
}
