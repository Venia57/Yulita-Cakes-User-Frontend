import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Title from "../components/Title";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Yulita Cakes - Dashboard";
  }, []);

  const tabs = [
    { name: "Orderan Saya", path: "pesanan" },
    { name: "Alamat", path: "alamat" },
    { name: "Detail Akun", path: "akun" },
  ];

  return (
    <div className="pt-24 px-4 sm:px-8 md:px-16 lg:px-24 pb-10 min-h-screen flex flex-col items-center">
      <Title text1={"Dashboard"} text2={"Anda"} />

      <div className="w-full max-w-6xl flex flex-col items-center justify-center mx-auto p-2 sm:p-4">
        <nav className="w-full shadow-sm rounded-2xl p-3 sm:p-4 mb-5 sm:mb-8 bg-white dark:bg-gray-800">
          <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-2 sm:gap-3 md:gap-4">
            {tabs.map((tab) => (
              <li key={tab.path} className="flex-grow sm:flex-grow-0">
                <NavLink
                  to={tab.path}
                  className={({ isActive }) =>
                    `block w-full text-center px-4 py-3 rounded-lg text-base sm:text-lg font-medium transition duration-300 ${
                      isActive
                        ? "bg-pink-400 dark:bg-pink-700 text-white dark:text-gray-200 shadow-md"
                        : "bg-pink-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-pink-200 dark:hover:bg-pink-600"
                    }`
                  }
                >
                  {tab.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="w-full flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-4 sm:p-6 md:p-8 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
