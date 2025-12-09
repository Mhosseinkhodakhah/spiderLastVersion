import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { singInSchema } from "../../utils/validation";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../../server/auth";
import { setCookie } from "../../utils/cookie";
import toast from "react-hot-toast";
import LandingPage from "../../pages/Dashboard/landing";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["loginRequest"],
    mutationFn: loginRequest,
    onSuccess: (data) => {
      if (data.success) {
        console.log('token isss>>', data.data.token)
        setCookie("admin-token", data.data.token, 7);
        setCookie("admin-access-token", data.data.access, 7);
        navigate("/dashboard", { replace: true });
      } else {
        toast.error(data?.error);
      }
    },
    onError: (error) => {
      toast.error("Login failed. Please try again.");
    }
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: singInSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <div className="w-full">
      {/* Form Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-blue-400 mb-2">Sign In</h2>
        <p className="text-gray-400">Access your spider Wallet</p>
      </div>

      {/* Social Login Buttons */}
      {/* <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="inline-flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-300 transition-colors bg-gray-800 rounded-xl px-4 hover:bg-gray-700 border border-gray-700">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z"
              fill="#4285F4"
            />
            <path
              d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z"
              fill="#34A853"
            />
            <path
              d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z"
              fill="#FBBC05"
            />
            <path
              d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z"
              fill="#EB4335"
            />
          </svg>
          Google
        </button>
        <button className="inline-flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-300 transition-colors bg-gray-800 rounded-xl px-4 hover:bg-gray-700 border border-gray-700">
          <svg width="16" className="fill-current" height="16" viewBox="0 0 21 20" fill="none">
            <path d="M15.6705 1.875H18.4272L12.4047 8.75833L19.4897 18.125H13.9422L9.59717 12.4442L4.62554 18.125H1.86721L8.30887 10.7625L1.51221 1.875H7.20054L11.128 7.0675L15.6705 1.875ZM14.703 16.475H16.2305L6.37054 3.43833H4.73137L14.703 16.475Z" />
          </svg>
          X
        </button>
      </div> */}

      {/* Divider */}
      {/* <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 text-gray-500 bg-gray-900/50">Or continue with</span>
        </div>
      </div> */}

      {/* Login Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <Label className="text-blue-400 text-sm font-medium mb-3 block">
            Username
          </Label>
          <div className="relative">
            <Input
              placeholder="Enter your username"
              error={formik.touched.userName && formik.errors.userName ? true : false}
              {...formik.getFieldProps("userName")}
              className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
            {formik.touched.userName && formik.errors.userName && (
              <span className="text-sm text-red-400 mt-2 block">
                {formik.errors.userName}
              </span>
            )}
          </div>
        </div>

        <div>
          <Label className="text-blue-400 text-sm font-medium mb-3 block">
            Password
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              error={formik.touched.password && formik.errors.password ? true : false}
              {...formik.getFieldProps("password")}
              className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl p-4 pr-12 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-400 transition-colors"
            >
              {showPassword ? (
                <EyeIcon className="fill-current size-5" />
              ) : (
                <EyeCloseIcon className="fill-current size-5" />
              )}
            </span>
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="text-sm text-red-400 mt-2 block">
              {formik.errors.password}
            </span>
          )}
        </div>

        {/* <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Checkbox 
              checked={isChecked} 
              onChange={setIsChecked}
              className="text-blue-500 focus:ring-blue-500 border-gray-600"
            />
            <span className="block font-normal text-gray-400 text-sm">
              Remember me
            </span>
          </div>
          <Link
            to="/reset-password"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div> */}

        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
          size="sm"
          isLoading={mutation.isPending}
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Signing In...
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      {/* Sign Up Link */}
      {/* <div className="text-center mt-6 pt-6 border-t border-gray-800">
        <p className="text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Create account
          </Link>
        </p>
      </div> */}
    </div>
  );
}