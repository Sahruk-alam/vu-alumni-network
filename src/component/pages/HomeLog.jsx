import { use, useEffect, useState } from "react";
import {
  PiSparkle,
  PiHeart,
  PiChatCircle,
  PiShareNetwork,
  PiBriefcase,
} from "react-icons/pi";
import { AuthContext } from "../AuthProvider/AuthProvider";

const HomeLog = () => {
  const { user } = use(AuthContext);

  const [postText, setPostText] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [posts, setPosts] = useState([]);

  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posting, setPosting] = useState(false);

  const categories = [
    "Career Advice",
    "Internship",
    "Job",
    "Achievement",
    "Project",
    "Event",
  ];

  // =====================================================
  // PEOPLE
  // =====================================================

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
console.log("batch",profileData);
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

  useEffect(() => {
    if (!user?.uid) return;

    fetch(`http://localhost:3000/users/${user.uid}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load profile");
        }

        return res.json();
      })
      .then((data) => {
        const userProfile = data?.users || data?.user || data || {};

        console.log("Profile API response:", userProfile);

        setProfileData(userProfile);
      })
      .catch((error) => {
        console.error("Profile error:", error);
      });
  }, [user?.uid]);

  const loadPosts = async () => {
    try {
      setLoadingPosts(true);

      const response = await fetch("http://localhost:3000/postJob");

      if (!response.ok) {
        throw new Error("Failed to load posts");
      }

      const data = await response.json();

      console.log("Posts API response:", data);

      const postList = data?.posts || [];

      setPosts(postList);
    } catch (error) {
      console.error("Load posts error:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // =====================================================
  // CREATE POST
  // =====================================================

  const handlePost = async () => {
    if (!postText.trim()) return;

    if (!selectedType) {
      alert("Please select a category");
      return;
    }

    if (!user?.uid) {
      alert("Please login first");
      return;
    }

    const postData = {
      uid: user.uid,
      name: profileData?.name || user?.displayName || "Anonymous User",
      email: user?.email || "",
      photo: profileData?.photo || user?.photoURL || "None",
      role: profileData?.experience?.position || "",
      position: profileData?.position || "",
      category: selectedType,
      batch:user?.batch || profileData?.batch || "",
      content: postText.trim(),
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    };

    try {
      setPosting(true);

      const response = await fetch("http://localhost:3000/postJob", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      const data = await response.json();
      console.log("Create post response:", data);
      setPostText("");
      setSelectedType("");
      await loadPosts();
    } catch (error) {
      console.error("Create post error:", error);
      alert("Post create failed");
    } finally {
      setPosting(false);
    }
  };

  // =====================================================
  // LIKE
  // =====================================================

  const handleLike = (id) => {
    setPosts((previousPosts) =>
      previousPosts.map((post) =>
        post._id === id
          ? {
              ...post,
              liked: !post.liked,

              likes: post.liked
                ? Math.max((post.likes || 0) - 1, 0)
                : (post.likes || 0) + 1,
            }
          : post
      )
    );
  };

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const getPostTime = (createdAt) => {
    if (!createdAt) return "now";

    const created = new Date(createdAt);

    if (Number.isNaN(created.getTime())) {
      return "now";
    }

    const now = new Date();

    const difference = Math.floor(
      (now.getTime() - created.getTime()) / 1000
    );

    if (difference < 60) {
      return "now";
    }

    const minutes = Math.floor(difference / 60);

    if (minutes < 60) {
      return `${minutes}m`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours}h`;
    }

    const days = Math.floor(hours / 24);

    return `${days}d`;
  };

  // =====================================================
  // GET INITIALS
  // =====================================================

  const getInitials = (name = "User") => {
    const words = name.trim().split(" ");

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return (
      words[0].charAt(0) + words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-4 md:px-6">

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">

        {/* =================================================
            MAIN
        ================================================= */}

        <main>

          {/* ================= CREATE POST ================= */}

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <div className="flex gap-3">

              {/* USER AVATAR */}

              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">

                { profileData?.photo ||
                user?.photoURL ? (
                  <img
                    src={  profileData?.photo ||
                      user?.photoURL
                    }
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-blue-600 text-sm text-white">
                    {getInitials(
                      profileData?.name ||
                        user?.displayName
                    )}
                  </div>
                )}

              </div>

              {/* TEXTAREA */}

              <textarea
                name="post"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Share an opportunity, advice or achievement..."
                className="textarea textarea-bordered h-20 flex-1 resize-none rounded-xl"
              />

            </div>

            {/* CATEGORIES */}

            <div className="mt-3 flex flex-wrap gap-2">

              {categories.map((category) => (
                <button
                  type="button"
                  name="category"
                  key={category}
                  onClick={() => setSelectedType(category)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    selectedType === category
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {category}
                </button>
              ))}

              {/* POST BUTTON */}

              <button
                type="button"
                onClick={handlePost}
                disabled={!postText.trim() || posting}
                className="ml-auto rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-200"
              >
                {posting ? "Posting..." : "Post"}
              </button>

            </div>

          </div>

          {/* ================= POSTS ================= */}

          <div className="mt-4 space-y-4">

            {loadingPosts ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
                Loading posts...
              </div>
            ) : posts.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">

                <p className="text-sm font-medium text-slate-700">
                  No posts yet
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Be the first person to share something.
                </p>

              </div>
            ) : (
              posts.map((post) => {

                const postName =
                  post.name ||
                  post.displayName ||
                  "Anonymous User";

                return (
                  <article
                    key={post._id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >

                    {/* POST HEADER */}

                    <div className="flex items-center gap-3">

                      {/* POST USER IMAGE */}

                      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full">

                        {post.photo ? (
                          <img
                            src={post.photo}
                            alt={postName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-blue-100 text-sm font-medium text-blue-700">
                            {getInitials(postName)}
                          </div>
                        )}

                      </div>

                      {/* USER INFO */}

                      <div className="min-w-0">

                        <div className="flex items-center gap-2">

                          <h2 className="font-semibold text-slate-950">
                            {postName}
                          </h2>

                          <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
                            {post.position || ""}
                          </span>

                        </div>

                        <p className="text-xs text-slate-500">
                          {post.role || ""} ·{" "}
                          {getPostTime(post.createdAt)}
                        </p>

                      </div>

                    </div>

                    {/* CATEGORY */}

                    {post.category && (
                      <div className="mt-3">

                        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700">
                          {post.category}
                        </span>

                      </div>
                    )}

                    {/* CONTENT */}

                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-800">
                      {post.content}
                    </p>

                    {/* DIVIDER */}

                    <div className="my-3 border-t border-slate-200" />

                    {/* ACTIONS */}

                    <div className="flex items-center justify-between text-sm text-slate-500">

                      {/* LIKE */}

                      <button
                        type="button"
                        onClick={() => handleLike(post._id)}
                        className={`flex items-center gap-2 transition ${
                          post.liked
                            ? "text-blue-600"
                            : "hover:text-blue-600"
                        }`}
                      >
                        <PiHeart
                          size={20}
                          fill={
                            post.liked
                              ? "currentColor"
                              : "none"
                          }
                        />

                        {post.likes || 0}
                      </button>

                      {/* COMMENT */}

                      <button
                        type="button"
                        className="flex items-center gap-2 hover:text-blue-600"
                      >
                        <PiChatCircle size={20} />

                        {post.comments || 0}
                      </button>

                      {/* SHARE */}

                      <button
                        type="button"
                        className="flex items-center gap-2 hover:text-blue-600"
                      >
                        <PiShareNetwork size={20} />

                        Share
                      </button>

                    </div>

                  </article>
                );
              })
            )}

          </div>

        </main>

        {/* =================================================
            SIDEBAR
        ================================================= */}

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

                    <button
                      type="button"
                      className="mt-1 rounded-lg border border-slate-200 px-3 py-1 text-xs shadow-sm hover:bg-slate-50"
                    >
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

            <button
              type="button"
              className="mt-4 w-full text-center text-sm text-slate-900 hover:text-blue-600"
            >
              See all jobs
            </button>

          </section>

        </aside>

      </div>

    </div>
  );
};

export default HomeLog;