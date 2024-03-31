import React, { useRef } from "react";
import { useSelector } from "react-redux";
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
      <input type="file" ref={fileRef}  hidden accept="image/*"/>
        <img
          src={currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center rounded-full cursor-pointer object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />

        <input
          type="text"
          id="username"
          placeholder="Username"
          name=""
          className="bg-slate-300 rounded-lg p-3"
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          name=""
          className="bg-slate-300 rounded-lg p-3"
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          id="password"
          placeholder="Change Password"
          name=""
          className="bg-slate-300 rounded-lg p-3"
        />

        <button className="bg-slate-600 rounded-lg text-white">Update</button>
      </form>


      <div className="flex justify-between mt-7">
        <span className="text-red-600 cursor-pointer text-xs w-24 rounded-md text-center hover:bg-red-400 hover:text-white">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Log Out</span>
      </div>
    </div>
  );
}
