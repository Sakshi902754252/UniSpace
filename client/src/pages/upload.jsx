import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link } from "react-router-dom";
import axios from "axios";

function Upload() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    camp_name: "",
    camp_place: "",
    camp_fee: "",
    camp_description: "",
    fee_discount: "0",
    final_fee: "",
    camp_status: "Active",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    // Handle file change logic here
  };

  const handleFilterSubmit = () => {
    // Handle filter submit logic here
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-screen-xl mx-auto">
            <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header
                className="px-5 py-4 border-b border-slate-100 dark:border-slate-700"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  Upload Your Own handwritten Notes
                </h2>
                <Link
                  to="/"
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                >
                  Back to Home page
                </Link>
              </header>
              <div className="p-3 shadow-lg border border-gray-300 rounded-lg">
                <div className="grid grid-cols-1 py-4 gap-4">
                  <div className="grid grid-cols-2 px-4 gap-4">
                    {/* Your form inputs here */}
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
                        // value={body.camp_name}

                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                      >
                        {/* Options for Camp Category */}
                        <option value="">Your Branch</option>
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
                        id="camp_name"
                        name="camp_id"
                        // value={body.camp_name}

                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                      >
                        {/* Options for Camp Category */}
                        <option value="">Select Year</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 px-4 gap-4">
                    {/* Your form inputs here */}
                    <div>
                      <label
                        htmlFor="camp_category"
                        className="block text-lg font-xs text-gray-600 w-full"
                      >
                        Examination
                      </label>
                      <select
                        id="camp_name"
                        name="camp_id"
                        // value={body.camp_name}

                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                      >
                        {/* Options for Camp Category */}
                        <option value="">Select Year</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="camp_category"
                        className="block text-lg font-xs text-gray-600 w-full"
                      >
                        Subject
                      </label>
                      <select
                        id="camp_name"
                        name="camp_id"
                        // value={body.camp_name}

                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                      >
                        {/* Options for Camp Category */}
                        <option value="">Select</option>
                      </select>
                    </div>
                  </div>

                  <div className="px-4 gap-4">
                    <label
                      htmlFor="Notes"
                      className="block text-sm font-medium text-gray-600 "
                    >
                      Your Notes
                    </label>
                    <input
                      type="file"
                      id="Notes"
                      name="Notes"
                      onChange={handleFileChange}
                      className="w-full px-3 py-4 border rounded shadow appearance-none"
                      accept="pdf/*"
                    />
                  </div>

                  <div className="px-4 gap-4">
                    <label
                      htmlFor="camp_category"
                      className="block text-sm font-xs text-gray-600"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      id="camp_category"
                      name="camp_category"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="Enter description like unit name..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-32 p-3 mt-4 ml-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Upload;
