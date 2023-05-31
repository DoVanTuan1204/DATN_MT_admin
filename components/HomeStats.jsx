import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const HomeStats = () => {
  const router = useRouter();
  const [jwt, setJwt] = useState();
  useEffect(() => {
    setJwt(localStorage.getItem("JWT"));
    if (!jwt) {
      router.push("/login");
    } else router.push("/");
  }, [jwt]);
  return (
    <>
      {jwt && (
        <div className="w-full">
          <h2>Orders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white shadow-md p-2 text-blue-900 text-center">
              <h3 className="uppercase text-gray-500 font-bold text-xs text-center m-0">
                Today
              </h3>
              <div className="text-3xl text-center mt-1 font-bold">1</div>
              <div className="text-xs text-gray-400"> orders today</div>
            </div>
            <div className="bg-white shadow-md p-2 text-blue-900 text-center">
              <h3 className="uppercase text-gray-500 font-bold text-xs text-center m-0">
                This week
              </h3>
              <div className="text-3xl text-center mt-1 font-bold">2</div>
              <div className="text-xs text-gray-400">2 orders this week</div>
            </div>
            <div className="bg-white shadow-md p-2 text-blue-900 text-center">
              <h3 className="uppercase text-gray-500 font-bold text-xs text-center m-0">
                This month
              </h3>
              <div className="text-3xl text-center mt-1 font-bold">3</div>
              <div className="text-xs text-gray-400">3 orders this month</div>
            </div>
          </div>
          <h2>Revenue</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white shadow-md p-2 text-blue-900 text-center">
              <h3 className="uppercase text-gray-500 font-bold text-xs text-center m-0">
                Today
              </h3>
              <div className="text-3xl text-center mt-1 font-bold"></div>
              <div className="text-xs text-gray-400"> orders today</div>
            </div>
            <div className="bg-white shadow-md p-2 text-blue-900 text-center">
              <h3 className="uppercase text-gray-500 font-bold text-xs text-center m-0">
                This week
              </h3>
              <div className="text-3xl text-center mt-1 font-bold"></div>
              <div className="text-xs text-gray-400">2 orders this week</div>
            </div>
            <div className="bg-white shadow-md p-2 text-blue-900 text-center">
              <h3 className="uppercase text-gray-500 font-bold text-xs text-center m-0">
                This month
              </h3>
              <div className="text-3xl text-center mt-1 font-bold"></div>
              <div className="text-xs text-gray-400">3 orders this month</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeStats;
