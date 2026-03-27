import React, { useState } from "react";

const App = () => {
  return <JobPortal />;
};

function JobPortal() {
  const [page, setPage] = useState("home");
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const [form, setForm] = useState({ title: "", desc: "" });
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [applicantName, setApplicantName] = useState("");
  const [applyingToJob, setApplyingToJob] = useState(null);
  const postJob = () => {
    if (!form.title || !form.desc) return alert("Fill all fields");
    const newJob = { id: Date.now(), ...form };
    setJobs([...jobs, newJob]);
    setForm({ title: "", desc: "" });
    setPage("home");
  };
  const applyJob = (job) => {
    if (appliedJobs.has(job.id)) return;
    setApplyingToJob(job.id);
  };
  const submitApplication = (job) => {
    if (!applicantName.trim()) return alert("Please enter your name");
    const newApp = {
      id: Date.now(),
      jobTitle: job.title,
      applicant: applicantName,
    };
    setApplications([...applications, newApp]);
    setAppliedJobs(new Set([...appliedJobs, job.id]));
    setApplyingToJob(null);
    setApplicantName("");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 font-sans">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">Online Job Portal</h1>

      {/* Navigation */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setPage("home")}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            page === "home" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setPage("post")}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            page === "post" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
          }`}
        >
          Post Job
        </button>
        <button
          onClick={() => setPage("applications")}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            page === "applications" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
          }`}
        >
          Applications
        </button>
      </div>
      {page === "home" && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Available Jobs</h2>
          {jobs.length === 0 && <p className="text-gray-600 text-center">No jobs posted yet</p>}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-4">{job.desc}</p>
                {applyingToJob === job.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      onClick={() => submitApplication(job)}
                      className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium"
                    >
                      Submit Application
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => applyJob(job)}
                    disabled={appliedJobs.has(job.id)}
                    className={`w-full py-2 px-4 rounded-lg transition-colors font-medium ${
                      appliedJobs.has(job.id)
                        ? 'bg-gray-500 text-white cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {appliedJobs.has(job.id) ? 'Submitted' : 'Apply Now'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Post Job */}
      {page === "post" && (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Post a New Job</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Job Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="Job Description"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
            <button
              onClick={postJob}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Post Job
            </button>
          </div>
        </div>
      )}

      {/* Applications */}
      {page === "applications" && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Job Applications</h2>
          {applications.length === 0 && <p className="text-gray-600 text-center">No applications yet</p>}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {applications.map((app) => (
              <div key={app.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <p className="text-lg font-medium text-gray-800 mb-4">{app.jobTitle}</p>
                <button
                  onClick={() => {
                    setSelectedApplication(app);
                    setPage("view");
                  }}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View Application */}
      {page === "view" && selectedApplication && (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Application Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{selectedApplication.jobTitle}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Applicant</label>
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{selectedApplication.applicant}</p>
            </div>
            <button
              onClick={() => setPage("applications")}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              Back to Applications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;