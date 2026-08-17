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
  console.log("profileData User Data:", profileData);

useEffect(() => {
    if (!user?.uid) return;

    fetch(`http://localhost:3000/users/${user.uid}`)
      .then((res) => res.json())
      .then((data) => {
        const userProfile = data?.users || data?.user || data || {};
        console.log("profile API response:", userProfile);
        setProfileData(userProfile);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user?.uid]);

    // Loading
  if (!userData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

const handleEditProfile = () => {

setIsModalOpen(true);

}
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-5">
      <div className="mx-auto max-w-7xl space-y-3">

        {/* ================= PROFILE HEADER ================= */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Cover */}
          <div className="h-45 overflow-hidden ">
            <img src={profileData?.bannerPhoto} alt="Cover" className="h-full w-full object-cover object-bottom" />
          </div>

          <div className="px-4 pb-3">

            {/* Avatar */}
            <div className="-mt-8 flex items-end justify-between">

              <div className="flex h-22 w-22 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-lg font-medium text-white shadow-sm">
                {profileData?.photo || user?.displayName?.slice(0, 2).toUpperCase()}
              </div>

              {/* Edit */}
              <button onClick={() => {handleEditProfile()}} className="btn btn-lg rounded-lg border border-slate-200 bg-white font-normal">
                <CiEdit size={22} />
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

              <h1 className="text-xl font-bold text-slate-950">
                {userData?.name}
              </h1>

              <p className="text-sm text-slate-500">
                Department of {userData?.department} 
              </p>

            </div>

            {/* Basic information */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[14px] text-slate-500">

              <span className="rounded-full bg-slate-100 px-2 py-1">
                {profileData?.position}
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
                {profileData?.location}
              </span>

            </div>

            {/* Student ID */}
            <p className="mt-2 text-[14px] font-semibold text-slate-500">
              Student ID: {userData?.studentId}
            </p>

          </div>
        </div>

        {/* ================= ABOUT ================= */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <h2 className="text-md font-semibold text-slate-950">
            About
          </h2>

          <p className="mt-2 text-md leading-5 text-slate-500">
            {profileData?.about || "No about information provided."}
          </p>

        </section>

        {/* ================= SKILLS ================= */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <h2 className="text-md font-semibold text-slate-950">
            Skills
          </h2>

          <div className="mt-2 flex flex-wrap gap-1.5">

            {profileData?.skills?.length > 0 ? (
              profileData.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-200 px-2 py-0.5 text-[13px] text-slate-700"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-xs text-slate-500">
                No skills added yet.
              </p>
            )}
          </div>
        </section>

        {/* ================= EDUCATION ================= */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <h2 className="text-md font-semibold text-slate-950">
            Education
          </h2>

          <p className="mt-2 text-md font-medium text-slate-900">
            {userData?.department}
          </p>

          <p className="text-[14px] text-slate-500">
            {profileData?.education?.university || "No education information provided."} · Batch {userData?.batch}
          </p>

        </section>

        {/* ================= EXPERIENCE ================= */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <h2 className="text-md font-semibold text-slate-950">
            Experience
          </h2>

          <div className="mt-3 flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <PiBriefcase size={18} />
            </div>

            <div>
              <p className="text-md font-medium text-slate-900">
                {profileData?.experience?.position || "No experience information provided."}
              </p>

              <p className="text-[14px] text-slate-500">
                {profileData?.experience?.companyName || "No company information provided."} · {profileData?.experience?.year || "No duration information provided."}
              </p>
            </div>

          </div>

        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <h2 className="text-md font-semibold text-slate-950">
            Contact Information
          </h2>

          <p className="mt-2 text-md font-medium text-slate-900">
            {profileData?.phone || "No phone information provided."}
          </p>

          <p className="text-[14px] text-slate-500">
            {profileData?.email || "No email information provided."}
          </p>

        </section>
        
           <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
  <h2 className="text-md font-semibold text-slate-950">
    Social Links
  </h2>

  <p className="mt-2 text-sm font-medium text-slate-900">
    LinkedIn:{" "}
    {profileData?.socialLinks?.linkedin ? (
      <a
        href={profileData.socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Visit LinkedIn
      </a>
    ) : (
      "No LinkedIn information provided."
    )}
  </p>

  <p className="text-[14px] text-slate-500">
    Portfolio:{" "}
    {profileData?.socialLinks?.portfolio ? (
      <a
        href={profileData.socialLinks.portfolio}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Visit Portfolio
      </a>
    ) : (
      "No portfolio information provided."
    )}
  </p>

  <p className="text-[14px] text-slate-500">
    Other Links:{" "}
    {profileData?.socialLinks?.socialMedia ? (
      <a
        href={profileData.socialLinks.socialMedia}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Visit Link
      </a>
    ) : (
      "No other social links provided."
    )}
  </p>
</section>

      </div>
    </div>
  );
};

export default Profile;