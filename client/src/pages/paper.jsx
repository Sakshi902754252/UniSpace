import React, { useState, useEffect } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link } from "react-router-dom";
import branchData from '../assets/branch.json';
import paperData from '../assets/previous_paper.json';
import axios from "axios";


function Paper() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [SelectedBranch, setSelectedBranch] = useState('');
  const [SelectedYear, setSelectedYear] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [papers, setPapers] = useState([]);
  const [Subjects, setSubjects] = useState([]);


  const handleSubjectChange = (e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);
    console.log(subject);
  };


  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    console.log(year);
    fetchSubjects(SelectedBranch, year);
  };

  const handleInputChange = (e) => {
    const branch = e.target.value;
    setSelectedBranch(branch);
    console.log(branch);
    fetchSubjects(branch, SelectedYear);
  };

  const fetchSubjects = (branch, year) => {
    if (branch && year) {
      const branchData = paperData.find(item => item.branch === branch);
      if (branchData && branchData.year[year]) {
        setSubjects(Object.keys(branchData.year[year].subject));
      } else {
        setSubjects([]);
      }
    } else {
      setSubjects([]);
    }
  };

  const handleFilterSubmit = async () => {
    try {
      console.log("Fetching papers for selected criteria...");
      console.log("SelectedBranch:", SelectedBranch);
      console.log("SelectedYear:", SelectedYear);
      console.log("selectedSubject:", selectedSubject);

      const response = await axios.get(`http://localhost:3000/api/paper`, {
        params: {
          branch: SelectedBranch,
          year: SelectedYear,
          subject: selectedSubject,
        },
      });
      console.log("Response data:", response.data);

      // Assuming response.data is an array of objects with 'papers' key containing an array of paper objects
      const formattedPapers = response.data.map(item => {
        return item.papers.map(paper => ({
          branch: item.branch,
          year: item.year,
          subject: item.subject,
          paper_name: paper.paper_name, // Adjust according to your actual paper object structure
          link: paper.link // Adjust according to your actual paper object structure
        }));
      }).flat();

      setPapers(formattedPapers);
    } catch (error) {
      console.error("Error fetching papers:", error);
      setPapers([]);
    }
  };
  



  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="text-center my-8">
            <h2 className="text-2xl font-bold">Search Papers by</h2>
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
                  onChange={handleYearChange}
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

            <div className="grid grid-cols-1 px-9 gap-4">
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
                  className="w-full px-3 py-2 border rounded shadow appearance-none"
                  onChange={handleSubjectChange}
                >
                  <option value="">Select Subject</option>
                  {Subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 px-9 gap-4 mt-4">
              <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                <div className="text-center bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600">
                  <button type="button" onClick={handleFilterSubmit}>
                    Get Papers
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
                    Past Years Papers
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
                          <th className="p-1">
                            <div className="font-semibold text-center">
                              Branch
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Year
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Subject
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">Paper</div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Action
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                        {papers.map((paper, index) => (
                          <tr key={index}>
                            <td className="p-2">
                              <div className="text-center">{paper.branch}</div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">{paper.year}</div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">{paper.subject}</div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">{paper.paper_name}</div>
                            </td>
                            <td className="p-2">
                              <div className="text-center px-2">
                                <Link to={paper.link} className="text-sm text-white py-1 px-1 bg-red-500">
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

export default Paper;
