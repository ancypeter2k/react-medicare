import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Loader2 } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending login data:", form); // Testing
    try {
    await dispatch(loginUser(form)).unwrap();
    navigate("/dashboard");
  } catch (err) {
    console.log(err);
  }
};


  return (
    <div className="min-h-screen bg-[#0a121e] flex justify-center items-center p-6 font-sans">
      <div className="w-full max-w-md bg-[#111c2d] border border-[#01C0C842] rounded-lg p-8 shadow-2xl relative overflow-hidden">

        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#01C0C805] rounded-full -mr-16 -mt-16 blur-3xl"></div>

        <div className="relative z-10">

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-sm">
              Please enter your details to sign in
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-400 ml-1">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />

                <input
                  type="email"
                  placeholder="name@company.com"
                  value={form.email}
                  className="w-full bg-[#0a121e] border border-[#01C0C842] rounded-md py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#01C0C8] transition-all"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">

              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-medium text-gray-400">
                  Password
                </label>

                <span className="text-xs text-[#01C0C8] cursor-pointer hover:underline">
                  Forgot password?
                </span>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />

                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  className="w-full bg-[#0a121e] border border-[#01C0C842] rounded-md py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#01C0C8] transition-all"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded-md">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#01C0C8] hover:bg-[#01a8af] text-[#111c2d] font-bold py-2.5 rounded-md text-sm transition-all flex justify-center items-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Login"
              )}
            </button>

          </form>

          <p className="mt-8 text-center text-xs text-gray-500">
            Don't have an account?{" "}
            <span className="text-[#01C0C8] cursor-pointer hover:underline">
              Contact Administrator
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;