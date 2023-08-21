"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    console.log("res", res);
    // console.log(object);
    const {accessToken } = await res.json();

    if (accessToken) {
      console.log("ACCESSTOKEN", accessToken);
      // const nextUrl = searchParams.get('next')
      // @see: https://github.com/vercel/next.js/discussions/44149
      router.push("/");
    } else {
      // Make your shiny error handling with a great user experience
      alert("Login failed");
    }
  };

  return (
    <div className="bg-gray-light min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col justify-center items-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className=" mb-8 text-3xl text-center font-bold">JWT TOKEN</h1>
          <form onSubmit={handleSubmit}>
            {/* <input
type="text"
name="fullname"
placeholder="Full Name"
className= "block border border-gray-200 rounded mb-4 w-full p-3"
/> */}
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="block border border-gray-200 rounded mb-4 w-full p-3"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="block border border-gray-200 rounded mb-4 w-full p-3"
            />
            {/* <input
type="password"
name="confirmed_password"
placeholder="Confirmed Password"
className= "block border border-gray-200 rounded mb-4 w-full p-3"
/> */}
            <button
              type="submit"
              className="w-full text-center text-white rounded bg-blue-700 hover:bg-blue-800 focus:outline-none py-3 my-1"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
