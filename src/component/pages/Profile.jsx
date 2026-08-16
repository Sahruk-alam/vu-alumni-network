import {
  CiLocationOn,
  CiEdit,
} from "react-icons/ci";
import { PiBriefcase } from "react-icons/pi";
import { use } from "react";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import ProfileModal from "../Modal/ProfileModal";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { auth, db } from "../firebase/firebase";

const Profile = () => {
  const { user } = use(AuthContext);

  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    if (!user?.uid) return;

    const getUserData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No user data found");
        }
      } catch (error) {
        console.log("Error getting user data:", error);
      }
    };

    getUserData();
  }, [user]);

  console.log("Firebase Auth User:", user);
  console.log("Firestore User Data:", userData);

  // Loading
  if (!userData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }
   useEffect(() => {
    fetch(`http://localhost:3000/users/${user?.uid}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProfileData(data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user?.uid]);

const handleEditProfile = () => {

setIsModalOpen(true);

}
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-5">
      <div className="mx-auto max-w-3xl space-y-3">

        {/* ================= PROFILE HEADER ================= */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Cover */}
          <div className="h-40 bg-gradient-to-r from-blue-600 to-cyan-600">
            <img src="https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Cover" className="h-full w-full object-cover" />
          </div>

          <div className="px-4 pb-3">

            {/* Avatar */}
            <div className="-mt-8 flex items-end justify-between">

              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-lg font-medium text-white shadow-sm">
                {user?.displayName
                  ?.slice(0, 2)
                  .toUpperCase()}
              </div>

              {/* Edit */}
              <button onClick={() => {handleEditProfile()}} className="btn btn-xs rounded-lg border border-slate-200 bg-white font-normal">
                <CiEdit size={16} />
                Edit profile
              </button>
                   <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // userData={userData}
      />
            </div>

            {/* Name */}
            <div className="mt-2">

              <h1 className="text-lg font-bold text-slate-950">
                {userData?.name}
              </h1>

              <p className="text-xs text-slate-500">
                Department of {userData?.department} 
              </p>

            </div>

            {/* Basic information */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-slate-500">

              <span className="rounded-full bg-slate-100 px-2 py-1">
                Student
              </span>

              <span>
                {userData?.department}
              </span>

              <span>·</span>

              <span>
                Batch {userData?.batch}
              </span>

              <span>·</span>

              <span className="flex items-center gap-0.5">
                <CiLocationOn size={13} />
                Dhaka, Bangladesh
              </span>

            </div>

            {/* Student ID */}
            <p className="mt-2 text-[11px] text-slate-500">
              Student ID: {userData?.studentId}
            </p>

          </div>
        </div>

        {/* ================= ABOUT ================= */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <h2 className="text-sm font-semibold text-slate-950">
            About
          </h2>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            Final year {userData?.department} student passionate about
            building web products. Looking for a frontend or full-stack
            internship where I can grow fast.
          </p>

        </section>

        {/* ================= SKILLS ================= */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <h2 className="text-sm font-semibold text-slate-950">
            Skills
          </h2>

          <div className="mt-2 flex flex-wrap gap-1.5">

            {["HTML", "CSS", "JavaScript", "React", "MongoDB", "Node.js", "Git"].map(
              (skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700"
                >
                  {skill}
                </span>
              )
            )}

          </div>
        </section>

        {/* ================= EDUCATION ================= */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <h2 className="text-sm font-semibold text-slate-950">
            Education
          </h2>

          <p className="mt-2 text-xs font-medium text-slate-900">
            {userData?.department}
          </p>

          <p className="text-[11px] text-slate-500">
            Varendra University · Batch {userData?.batch}
          </p>

        </section>

        {/* ================= EXPERIENCE ================= */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <h2 className="text-sm font-semibold text-slate-950">
            Experience
          </h2>

          <div className="mt-3 flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <PiBriefcase size={18} />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-900">
                Frontend Intern
              </p>

              <p className="text-[11px] text-slate-500">
                Codebase Ltd. · Summer 2025
              </p>
            </div>

          </div>

        </section>

      </div>
    </div>
  );
};

export default Profile;