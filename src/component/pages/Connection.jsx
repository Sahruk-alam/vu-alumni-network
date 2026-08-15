import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { PiUserPlus, PiCheck } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";

const Connection = () => {
  const [activeTab, setActiveTab] = useState("connections");

  const [connections, setConnections] = useState([
    {
      name: "Nusrat Jahan",
      initials: "NJ",
      role: "Senior Software Engineer at Brain Station 23",
      type: "Alumni",
      year: "2018",
    },
    {
      name: "Tanvir Hasan",
      initials: "TH",
      role: "Data Scientist at Grameenphone",
      type: "Alumni",
      year: "2016",
    },
  ]);

  const [requests, setRequests] = useState([
    {
      name: "Farhana Akter",
      initials: "FA",
      role: "3rd year student · Cyber security enthusiast",
      type: "Student",
      year: "2027",
    },
  ]);

  const [discoverPeople, setDiscoverPeople] = useState([
    {
      name: "Rakib Chowdhury",
      initials: "RC",
      role: "Product Manager at Pathao",
      type: "Alumni",
      year: "2017",
    },
    {
      name: "Ayesha Siddika",
      initials: "AS",
      role: "Cloud Security Engineer at Samsung R&D",
      type: "Alumni",
      year: "2019",
    },
  ]);

  const [search, setSearch] = useState("");

  // Accept request
  const handleAccept = (person) => {
    setConnections([...connections, person]);

    setRequests(
      requests.filter((request) => request.name !== person.name)
    );
  };

  // Reject request
  const handleReject = (name) => {
    setRequests(
      requests.filter((request) => request.name !== name)
    );
  };

  // Connect
  const handleConnect = (name) => {
    setDiscoverPeople(
      discoverPeople.map((person) =>
        person.name === name
          ? { ...person, connected: true }
          : person
      )
    );
  };

  // Search
  const filteredPeople = discoverPeople.filter((person) =>
    `${person.name} ${person.role} ${person.type} ${person.year}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-8 md:px-10">
      <div className="mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}
        <div>
          <h1 className="text-3xl font-bold text-slate-950">
            Connections
          </h1>

          <p className="mt-1 text-slate-500">
            Build your university network with students and alumni.
          </p>
        </div>

        {/* ================= TABS ================= */}
        <div className="mt-6 inline-flex rounded-2xl bg-slate-100 p-1">

          {/* My Connections */}
          <button
            onClick={() => setActiveTab("connections")}
            className={`rounded-xl px-4 py-2 text-sm transition ${
              activeTab === "connections"
                ? "bg-white font-medium text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            My connections ({connections.length})
          </button>

          {/* Requests */}
          <button
            onClick={() => setActiveTab("requests")}
            className={`rounded-xl px-4 py-2 text-sm transition ${
              activeTab === "requests"
                ? "bg-white font-medium text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Requests ({requests.length})
          </button>

          {/* Discover */}
          <button
            onClick={() => setActiveTab("discover")}
            className={`rounded-xl px-4 py-2 text-sm transition ${
              activeTab === "discover"
                ? "bg-white font-medium text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Discover
          </button>
        </div>

        {/* ================================================= */}
        {/*                  MY CONNECTIONS                    */}
        {/* ================================================= */}

        {activeTab === "connections" && (
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">

            {connections.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-10 text-center">
                <h2 className="text-lg font-semibold">
                  No connections yet
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Go to Discover and connect with students or alumni.
                </p>
              </div>
            ) : (
              connections.map((person) => (
                <div
                  key={person.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start gap-4">

                    {/* Avatar */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                      {person.initials}
                    </div>

                    {/* Information */}
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold text-slate-950">
                        {person.name}
                      </h2>

                      <p className="text-sm text-slate-500">
                        {person.role}
                      </p>

                      <span className="mt-2 inline-block rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                        {person.type} · {person.year}
                      </span>
                    </div>
                  </div>

                  {/* Message */}
                  <button className="btn btn-sm mt-4 rounded-xl border border-slate-200 bg-white px-4 font-normal text-slate-800 shadow-sm hover:bg-slate-50">
                    Message
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================================================= */}
        {/*                     REQUESTS                       */}
        {/* ================================================= */}

        {activeTab === "requests" && (
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">

            {requests.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-10 text-center">
                <h2 className="text-lg font-semibold">
                  No pending requests
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  You don't have any connection requests right now.
                </p>
              </div>
            ) : (
              requests.map((request) => (
                <div
                  key={request.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >

                  {/* User Information */}
                  <div className="flex items-start gap-4">

                    {/* Avatar */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                      {request.initials}
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold text-slate-950">
                        {request.name}
                      </h2>

                      <p className="text-sm text-slate-500">
                        {request.role}
                      </p>

                      <span className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800">
                        {request.type} · {request.year}
                      </span>
                    </div>
                  </div>

                  {/* Accept / Reject */}
                  <div className="mt-4 flex items-center gap-5">

                    <button
                      onClick={() => handleAccept(request)}
                      className="btn btn-sm rounded-xl bg-blue-600 px-4 text-white hover:bg-blue-700"
                    >
                      <PiCheck size={18} />
                      Accept
                    </button>

                    <button
                      onClick={() => handleReject(request.name)}
                      className="flex items-center gap-2 text-sm text-slate-900 hover:text-red-600"
                    >
                      <RxCross2 size={20} />
                      Reject
                    </button>

                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================================================= */}
        {/*                     DISCOVER                       */}
        {/* ================================================= */}

        {activeTab === "discover" && (
          <div className="mt-5">

            {/* Search */}
            <div className="input input-bordered flex items-center gap-2 rounded-xl bg-white">
              <CiSearch
                size={23}
                className="text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, department, skill or company"
                className="grow"
              />
            </div>

            {/* People */}
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">

              {filteredPeople.length === 0 ? (
                <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-10 text-center">
                  <h2 className="text-lg font-semibold">
                    No people found
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Try searching with a different name or skill.
                  </p>
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <div
                    key={person.name}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >

                    {/* User Information */}
                    <div className="flex items-start gap-4">

                      {/* Avatar */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                        {person.initials}
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-lg font-semibold text-slate-950">
                          {person.name}
                        </h2>

                        <p className="text-sm text-slate-500">
                          {person.role}
                        </p>

                        <span className="mt-2 inline-block rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                          {person.type} · {person.year}
                        </span>
                      </div>
                    </div>

                    {/* Connect Button */}
                    <button
                      onClick={() => handleConnect(person.name)}
                      disabled={person.connected}
                      className={`btn btn-sm mt-4 rounded-xl px-4 ${
                        person.connected
                          ? "bg-slate-200 text-slate-600"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {person.connected ? (
                        <>
                          <PiCheck size={18} />
                          Requested
                        </>
                      ) : (
                        <>
                          <PiUserPlus size={18} />
                          Connect
                        </>
                      )}
                    </button>
                  </div>
                ))
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Connection;