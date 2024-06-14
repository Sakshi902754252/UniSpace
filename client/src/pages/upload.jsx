import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import branchData from '../assets/branch.json';
import { Link } from "react-router-dom";
import axios from "axios";

function Upload() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    branch: "",
    year: "",
    examination: "",
    subject: "",
    UnitName: "",
  });

  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append('branch', formData.branch);
    uploadData.append('year', formData.year);
    uploadData.append('examination', formData.examination);
    uploadData.append('subject', formData.subject);
    uploadData.append('UnitName', formData.UnitName);
    uploadData.append('Notes', file);

    try {
      const response = await axios.post('https://uni-space-server.vercel.app/api/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('File uploaded successfully');
        // Optionally, reset the form here
        setFormData({
          branch: "",
          year: "",
          examination: "",
          subject: "",
          UnitName: "",
        });
        setFile(null);
      } else {
        alert('File upload failed');
      }
    } catch (error) {
      console.error('File upload error:', error);
      alert('File upload error');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 py-4 gap-4">
                    <div className="grid grid-cols-2 px-4 gap-4">
                      <div>
                        <label
                          htmlFor="branch"
                          className="block text-lg font-xs text-gray-600 w-full"
                        >
                          Branch
                        </label>
                        <select
                          id="branch"
                          name="branch"
                          value={formData.branch}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded shadow appearance-none"
                        >
                          <option value="">Select Branch</option>
                          {branchData.map((branch, index) => (
                            <option key={index} value={branch.Branch}>
                              {branch.Branch}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="year"
                          className="block text-lg font-xs text-gray-600 w-full"
                        >
                          Year
                        </label>
                        <select
                          id="year"
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded shadow appearance-none"
                        >
                          <option value="">Select Year</option>
                          <option value="FE">FE</option>
                          <option value="SE">SE</option>
                          <option value="TE">TE</option>
                          <option value="BE">BE</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 px-4 gap-4">
                      <div>
                        <label
                          htmlFor="examination"
                          className="block text-lg font-xs text-gray-600 w-full"
                        >
                          Examination
                        </label>
                        <select
                          id="examination"
                          name="examination"
                          value={formData.examination}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded shadow appearance-none"
                        >
                          <option value="">Select Examination</option>
                          <option value="Insem">Insem</option>
                          <option value="Endem">Endsem</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-lg font-xs text-gray-600 w-full"
                        >
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded shadow appearance-none"
                          placeholder="Enter Subject"
                        />
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
                        accept="application/pdf"
                      />
                    </div>

                    <div className="px-4 gap-4">
                      <label
                        htmlFor="UnitName"
                        className="block text-sm font-xs text-gray-600"
                      >
                        Unit Name :
                      </label>
                      <input
                        type="text"
                        id="UnitName"
                        name="UnitName"
                        value={formData.UnitName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                        placeholder="Enter unit name..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-32 p-3 mt-4 ml-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                  >
                    Upload
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Upload;
