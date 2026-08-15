import { useState } from "react";
import {
  PiSparkle,
  PiHeart,
  PiChatCircle,
  PiShareNetwork,
  PiBriefcase,
} from "react-icons/pi";
import { FiSend } from "react-icons/fi";

const HomeLog = () => {
  const [postText, setPostText] = useState("");
  const [selectedType, setSelectedType] = useState("Career Advice");

  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Nusrat Jahan",
      initials: "NJ",
      role: "Computer Science & Engineering · Batch 2018",
      time: "2h",
      badge: "Alumni",
      category: "Internship",
      content:
        "We are opening 4 frontend internship seats at Brain Station 23 next month. If you know React and can write clean CSS, start preparing your portfolio now. Drop me a message if you want feedback on yours.",
      likes: 42,
      comments: 1,
      liked: false,
    },
    {
      id: 2,
      name: "Tanvir Hasan",
      initials: "TH",
      role: "Electrical & Electronic Engineering · Batch 2016",
      time: "5h",
      badge: "Alumni",
      category: "Career Advice",
      content:
        "Career advice for students who want to move into data: build two end-to-end projects with real messy data instead of ten tutorials. Recruiters ask about decisions, not accuracy.",
      likes: 88,
      comments: 0,
      liked: false,
    },
  ]);

  const people = [
    {
      name: "Farhana Akter",
      initials: "FA",
      role: "3rd year student · Cyber security enthusiast",
    },
    {
      name: "Rakib Chowdhury",
      initials: "RC",
      role: "Product Manager at Pathao",
    },
    {
      name: "Ayesha Siddika",
      initials: "AS",
      role: "Cloud Security Engineer at Samsung R&D",
    },
  ];

  const jobs = [
    {
      title: "Frontend Developer Intern",
      company: "Brain Station 23 · Dhaka (Hybrid)",
      skills: "4 matching skills",
    },
    {
      title: "MERN Stack Developer",
      company: "Codebase Ltd. · Remote",
      skills: "3 matching skills",
    },
    {
      title: "Part Time Web Developer",
      company: "University IT Cell · On campus",
      skills: "3 matching skills",
    },
  ];

  const categories = [
    "Career Advice",
    "Internship",
    "Job",
    "Achievement",
    "Project",
    "Event",
  ];

  // Create Post
  const handlePost = () => {
    if (!postText.trim()) return;

    const newPost = {
      id: Date.now(),
      name: "Shahruk Alam Sarder",
      initials: "SA",
      role: "Computer Science & Engineering · Final Year",
      time: "now",
      badge: "Student",
      category: selectedType,
      content: postText,
      likes: 0,
      comments: 0,
      liked: false,
    };

    setPosts([newPost, ...posts]);
    setPostText("");
  };

  // Like
  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked
                ? post.likes - 1
                : post.likes + 1,
            }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-4 md:px-6">

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">

        {/* ================================================= */}
        {/*                    MAIN FEED                       */}
        {/* ================================================= */}

        <main>

          {/* ================= CREATE POST ================= */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <div className="flex gap-3">

              {/* User Avatar */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
                SA
              </div>

              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Share an opportunity, advice or achievement..."
                className="textarea textarea-bordered h-20 flex-1 resize-none rounded-xl"
              />
            </div>

            {/* Categories */}
            <div className="mt-3 flex flex-wrap gap-2">

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedType(category)}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    selectedType === category
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  {category}
                </button>
              ))}

              <button
                onClick={handlePost}
                disabled={!postText.trim()}
                className="ml-auto rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:bg-blue-200"
              >
                Post
              </button>
            </div>
          </div>

          {/* ================= POSTS ================= */}
          <div className="mt-4 space-y-4">

            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >

                {/* Post Header */}
                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    {post.initials}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-slate-950">
                        {post.name}
                      </h2>

                      <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
                        {post.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500">
                      {post.role} · {post.time}
                    </p>
                  </div>
                </div>

                {/* Category */}
                <div className="mt-3">
                  <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <p className="mt-3 text-sm leading-6 text-slate-800">
                  {post.content}
                </p>

                {/* Divider */}
                <div className="my-3 border-t border-slate-200"></div>

                {/* Actions */}
                <div className="flex items-center justify-between text-sm text-slate-500">

                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 ${
                      post.liked ? "text-blue-600" : ""
                    }`}
                  >
                    <PiHeart
                      size={20}
                      fill={post.liked ? "currentColor" : "none"}
                    />
                    {post.likes}
                  </button>

                  <button className="flex items-center gap-2">
                    <PiChatCircle size={20} />
                    {post.comments}
                  </button>

                  <button className="flex items-center gap-2">
                    <PiShareNetwork size={20} />
                    Share
                  </button>

                </div>
              </article>
            ))}
          </div>
        </main>

        {/* ================================================= */}
        {/*                     SIDEBAR                        */}
        {/* ================================================= */}

        <aside className="space-y-4">

          {/* ================= PEOPLE ================= */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <div className="flex items-center gap-2">
              <PiSparkle
                size={20}
                className="text-blue-600"
              />

              <h2 className="font-semibold text-slate-950">
                People you may know
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Matched on your department and skills.
            </p>

            <div className="mt-3 space-y-4">

              {people.map((person) => (
                <div
                  key={person.name}
                  className="flex items-center gap-3"
                >

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-700">
                    {person.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-medium">
                      {person.name}
                    </h3>

                    <p className="truncate text-xs text-slate-500">
                      {person.role}
                    </p>

                    <button className="mt-1 rounded-lg border border-slate-200 px-3 py-1 text-xs shadow-sm hover:bg-slate-50">
                      Connect
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </section>

          {/* ================= JOBS ================= */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <div className="flex items-center gap-2">
              <PiBriefcase
                size={20}
                className="text-blue-600"
              />

              <h2 className="font-semibold text-slate-950">
                Recommended for you
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Based on HTML, CSS, JavaScript.
            </p>

            <div className="mt-3 space-y-3">

              {jobs.map((job) => (
                <div
                  key={job.title}
                  className="rounded-2xl border border-slate-200 p-3"
                >
                  <h3 className="text-sm font-medium text-slate-900">
                    {job.title}
                  </h3>

                  <p className="text-xs text-slate-500">
                    {job.company}
                  </p>

                  <p className="mt-1 text-xs text-blue-600">
                    {job.skills}
                  </p>
                </div>
              ))}

            </div>

            <button className="mt-4 w-full text-center text-sm text-slate-900 hover:text-blue-600">
              See all jobs
            </button>

          </section>

        </aside>

      </div>
    </div>
  );
};

export default HomeLog;