import AuthenticateAPI from "./api/authentication";
import StorageUtil, { STORAGE_KEY } from "@/src/util/storage";
import { useFormik } from "formik";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const response = await AuthenticateAPI.signIn(values);
        await Router.push("/");
        if (response?.data?.access) {
          StorageUtil.set(STORAGE_KEY.JWT, response?.data?.access);
          localStorage.setItem("profile", JSON.stringify(profile.data.user));
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className="bg-white relative h-[100vh] lg:py-18">
      <div
        className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
          xl:px-5 lg:flex-row">
        <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
          <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
              <img
                src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png"
                className="btn-"
              />
            </div>
          </div>
          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            {isRegister == true ? (
              ""
            ) : (
              <div className=" flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                <span className="w-full text-3xl font-medium text-center leading-snug font-serif">
                  Đăng nhập
                </span>
                <form
                  onSubmit={formik.handleSubmit}
                  className="w-full mt-6 mr-1 mb-0 ml-0 relative space-y-8">
                  <div className="relative">
                    <span
                      className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
            absolute">
                      Username
                    </span>
                    <input
                      name="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="John"
                      type="text"
                      className="border placeholder-gray-400 focus:outline-none
            focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
            border-gray-300 rounded-md"
                    />
                    {formik.errors.email &&
                      formik.touched.email &&
                      formik.errors.email}
                  </div>
                  <div className="relative">
                    <span
                      className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
            absolute">
                      Mật khẩu
                    </span>
                    <input
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Mật khẩu"
                      type="password"
                      className="border placeholder-gray-400 focus:outline-none
            focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
            border-gray-300 rounded-md"
                    />
                    {formik.errors.password &&
                      formik.touched.password &&
                      formik.errors.password}
                  </div>

                  <div className="relative">
                    <button
                      type="submit"
                      disabled={formik.isSubmitting}
                      className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
            rounded-lg transition duration-200 hover:bg-indigo-600 ease">
                      Đăng nhập
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        <div
          onClick={() => {
            setIsRegister(!isRegister);
          }}
          className="w-7 cursor-pointer rounded-full"></div>
      </div>
    </div>
  );
};

export default Login;
