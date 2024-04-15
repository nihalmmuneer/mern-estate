import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="font-semibold text-3xl text-center my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="p-3 border w-full rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="p-3 border w-full rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 border w-full rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 p-3 uppercase text-white rounded-lg hover:opacity-95 disabled:opacity-80">
          sign up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in" className="text-blue-700 hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
