import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link, useNavigate } from "react-router-dom";
import data from '../assets/branch.json';

function Book() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [SelectedBranch, setSelectedBranch] = useState('');
  const [SelectedYear, setSelectedYear] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    console.log(e.target.value);
    console.log("sakshi is now doing something here !!!");
  };

  const handleInputChange = (e) => {
    setSelectedBranch(e.target.value);
    console.log(e.target.value);
  };

  const handleFilterSubmit = async () => {
    try {
      const response = await axios.get(`https://uni-space-server.vercel.app/api/books?branch=${SelectedBranch}&year=${SelectedYear}`);
      console.log("response of the data is .....", response.data)
      setFilteredData(response.data);

    } catch (error) {
      console.error("Error fetching books:", error);
      setFilteredData([]);
    }
  };

  useEffect(() => {

    handleFilterSubmit();
  }, [SelectedBranch, SelectedYear]);

  // https://drive.usercontent.google.com/u/0/uc?id=1awG_GhXatBIt9pkLfjmo7mEiMfbKQ4KY&export=download


  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="text-center my-8">
            <h2 className="text-2xl font-bold">Search Books by</h2>
          </div>
          <div className="flex justify-center grid grid-cols-1 py-2">
            <div className="grid grid-cols-2 px-9 gap-4">
              <div>
                <label
                  htmlFor="camp_category"
                  className="block text-lg font-xs text-gray-600 w-full"
                >
                  Branch
                </label>
                <select
                  id="camp_name"
                  name="camp_id"
                  value={SelectedBranch}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded shadow appearance-none"
                >
                  {/* Options for Camp Category */}
                  <option value="">Select Branch</option>
                  {data.map((branch, index) => (
                    <option key={index} value={branch.Branch}>
                      {branch.Branch}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="camp_category"
                  className="block text-lg font-xs text-gray-600 w-full"
                >
                  Year
                </label>
                <select
                  id="Branch"
                  name="Branch"
                  value={SelectedYear}
                  onChange={handleYearChange}
                  className="w-full px-3 py-2 border rounded shadow appearance-none"
                >
                  {/* Options for Camp Category */}
                  <option value="">Select Year</option>
                  <option value="SE">Second Year</option>
                  <option value="TE">Third Year</option>
                  <option value="BE">Fourth Year</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 px-9 gap-4 mt-4">
              <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                <div className="text-center bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600">
                  <button type="button" onClick={handleFilterSubmit}>
                    Get Books
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xxl mx-auto">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                  <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                    Reference books found...
                  </h2>
                </header>
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table
                      className="dark:text-slate-300"
                      style={{ width: "100%" }}
                    >
                      <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                        <tr>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Branch
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              year
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              subject
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              action
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                        {filteredData[0]?.year[SelectedYear]?.map((book, index) => (
                          <tr key={index}>
                            <td className="p-2">
                              <div className="text-center">{SelectedBranch}</div>
                            </td>
                            <td className="p-2">
                              <div className={`text-center`}>{SelectedYear}</div>
                            </td>
                            <td className="p-2">
                              <div className={`text-center`}>{book.book_name}</div>
                            </td>
                            <td className="p-2">
                              <div className="text-center px-2">
                                <Link to={book.link} className="text-sm text-white py-1 px-1 bg-red-500">
                                  <button style={{ width: "100%", height: "100%", padding: "1px" }}>
                                    Download
                                  </button>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Book;
