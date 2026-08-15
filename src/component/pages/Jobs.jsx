import { CiSearch, CiLocationOn, CiBookmark } from "react-icons/ci";
import { PiCalendarBlank, PiBriefcase } from "react-icons/pi";

const jobs = [
  {
    title: "Frontend Developer Intern",
    company: "Brain Station 23",
    location: "Dhaka (Hybrid)",
    type: "Internship",
    deadline: "30 Sep 2026",
    skills: ["React", "JavaScript", "CSS", "Git"],
    posted: "2 days ago",
  },
  {
    title: "MERN Stack Developer",
    company: "Codebase Ltd.",
    location: "Remote",
    type: "Remote",
    deadline: "05 Oct 2026",
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    posted: "1 week ago",
  },
];

const Jobs = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">
              Jobs & Internships
            </h1>
            <p className="mt-1 text-slate-500">
              Opportunities shared by alumni of your university.
            </p>
          </div>

          <button className="btn rounded-xl bg-blue-600 text-white hover:bg-blue-700">
            Post a job
          </button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <label className="input input-bordered flex items-center gap-2 rounded-xl bg-white">
            <CiSearch size={24} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search by title, company or skill"
              className="grow"
            />
          </label>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <button className="btn btn-sm rounded-full border-blue-500 bg-blue-50 text-blue-600">
            All
          </button>

          <button className="btn btn-sm rounded-full btn-outline">
            Full Time
          </button>

          <button className="btn btn-sm rounded-full btn-outline">
            Part Time
          </button>

          <button className="btn btn-sm rounded-full btn-outline">
            Internship
          </button>

          <button className="btn btn-sm rounded-full btn-outline">
            Remote
          </button>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex gap-4">

                {/* Company Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <PiBriefcase size={28} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">

                  <div className="flex justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-950">
                        {job.title}
                      </h2>

                      <p className="text-lg text-slate-500">
                        {job.company}
                      </p>
                    </div>

                    <button className="text-slate-500 hover:text-blue-600">
                      <CiBookmark size={25} />
                    </button>
                  </div>

                  {/* Job info */}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <CiLocationOn size={20} />
                      {job.location}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                      {job.type}
                    </span>

                    <span className="flex items-center gap-1">
                      <PiCalendarBlank size={18} />
                      Apply by {job.deadline}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Posted */}
                  <p className="mt-3 text-sm text-slate-500">
                    Posted by Nusrat Jahan · {job.posted}
                  </p>
                </div>
              </div>

              {/* Button */}
              <div className="mt-4 flex justify-end">
                <button className="btn rounded-xl bg-blue-600 text-white hover:bg-blue-700">
                  View & apply
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Jobs;