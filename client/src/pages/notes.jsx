import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link } from "react-router-dom";
import branchData from '../assets/branch.json';

function Notes() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    branch: "",
    year: "",
    subject: "",
  });
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (formData.branch && formData.year) {
      fetchSubjects(formData.branch, formData.year);
    }
  }, [formData.branch, formData.year]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchSubjects = async (branch, year) => {
    try {
      const response = await axios.get('https://uni-space-server.vercel.app/api/subjects', {
        params: { branch, year },
      });
      setSubjects(response.data);
      if (response.data.length === 0) {
        setAlertMessage("Currently Notes are not available for your Branch.");
      } else {
        setAlertMessage("");
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleFilterSubmit = async () => {
    try {
      const response = await axios.get('https://uni-space-server.vercel.app/api/notes', {
        params: {
          branch: formData.branch,
          year: formData.year,
          subject: formData.subject,
        },
      });
      setNotes(response.data);
      if (response.data.length === 0) {
        setAlertMessage("No notes found for the selected criteria.");
      } else {
        setAlertMessage("");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="text-center my-8">
            <h2 className="text-2xl font-bold">Search Handwritten Notes by</h2>
          </div>
          <div className="flex justify-center grid grid-cols-1 py-2">
            <div className="grid grid-cols-2 px-9 gap-4">
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

            <div className="grid grid-cols-2 px-9 gap-4 mt-4">
              <div>
                <label
                  htmlFor="subject"
                  className="block text-lg font-xs text-gray-600 w-full"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded shadow appearance-none"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                <div className="text-center bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600">
                  <button type="button" onClick={handleFilterSubmit}>
                    Search Notes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {alertMessage && (
            <div className="px-4 sm:px-6 lg:px-8 py-2 w-full max-w-screen-xxl mx-auto">
              <div className="text-center text-red-500">{alertMessage}</div>
            </div>
          )}

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xxl mx-auto">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                  <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                    Past Students Handwritten Notes
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
                            <div className="font-semibold text-center">Sr.</div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Examination
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Unit Name
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Subject
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">Action</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                        {notes.map((note, index) => (
                          <tr key={note._id}>
                            <td>
                              <div className="text-center" style={{ fontWeight: "bold" }}>
                                {index + 1}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">{note.examination}</div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">{note.UnitName}</div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">{note.subject}</div>
                            </td>
                            <td className="p-2">
                              <div className="text-center px-2">
                                <Link to={note.fileUrl} target="_blank" className="text-sm text-white py-1 px-1 bg-red-500">
                                  <button
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      padding: "1px",
                                    }}
                                  >
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

export default Notes;
