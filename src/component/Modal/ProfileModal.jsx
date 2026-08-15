import { useState } from "react";

const ProfileModal = ({ isOpen, onClose }) => {
  const [photo, setPhoto] = useState(null);
  const [bannerPhoto, setBannerPhoto] = useState(null);

  if (!isOpen) return null;

  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const data = {
  //     position: form.position.value,
  //     location: form.location.value,
  //     phone: form.phone.value,
  //     about: form.about.value,
  //     skills: form.skills.value,

  //     education: {
  //       university: form.university.value,
  //       degree: form.degree.value,
  //     },
  //     experience: {
  //       position: form.experiencePosition.value,
  //       companyName: form.companyName.value,
  //       year: form.experienceYear.value,
  //     },
  //     photo: photo,
  //     bannerPhoto: bannerPhoto,
  //   };
  //   console.log("Data:", data);
  //   try {
  //     const res = await fetch("http://localhost:3000/users", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         ...data,

  //         // File JSON এ পাঠানো যাবে না
  //         // তাই আপাতত null পাঠাচ্ছি
  //         photo: null,
  //         bannerPhoto: null,
  //       }),
  //     });
  //     const result = await res.json();
  //     console.log("Success:", result);
  //     if (res.ok) {
  //       alert("Profile saved successfully!");
  //       onClose();
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
const handleSave = async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData();
  data.append(
    "position",
    form.position.value
  );
  data.append(
    "location",
    form.location.value
  );
  data.append(
    "phone",
    form.phone.value
  );
  data.append(
    "about",
    form.about.value
  );
  const skills = form.skills.value
    .split(",")
    .map((skill) => skill.trim())
    .filter((skill) => skill !== "");
  data.append(
    "skills",
    JSON.stringify(skills)
  );
  data.append(
    "university",
    form.university.value
  );
  data.append(
    "degree",
    form.degree.value
  );
  data.append(
    "experiencePosition",
    form.experiencePosition.value
  );
  data.append(
    "companyName",
    form.companyName.value
  );
  data.append(
    "experienceYear",
    form.experienceYear.value
  );
  if (photo) {
    data.append("photo", photo);
  }
  if (bannerPhoto) {
    data.append(
      "bannerPhoto",
      bannerPhoto
    );
  }
  try {
    const response = await fetch(
      `http://localhost:3000/users/${userData._id}`,
      {
        method: "PUT",
        body: data,
      }
    );
    const result = await response.json();
    console.log(result);
    if (result.success) {
      alert("Profile updated successfully!");
      onClose();
    }
  }
  catch (error) {
    console.error(error);
  }
};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-5">

      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-blue-500 px-6 py-5">

          <h2 className="text-2xl font-bold text-white">
            Customize Info
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-white hover:text-red-300"
          >
            ×
          </button>

        </div>

        {/* FORM */}
        <form onSubmit={handleSave}>

          <div className="space-y-6 p-6">

            {/* Position */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Position
              </label>

              <select
                name="position"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="Student">Student</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="Rajshahi, Bangladesh"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Phone (WhatsApp)
              </label>

              <input
                type="text"
                name="phone"
                placeholder="+880 1234 567890"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* About */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                About
              </label>

              <textarea
                name="about"
                rows="4"
                placeholder="Write something about yourself..."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Skills
              </label>

              <input
                type="text"
                name="skills"
                placeholder="React, JavaScript, Node.js, MongoDB"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />

              <p className="mt-1 text-sm text-gray-500">
                Separate skills with commas.
              </p>
            </div>

            {/* Education */}
            <div>

              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Education
              </h3>

              <div className="grid gap-4 md:grid-cols-2">

                {/* University */}
                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    University (Last attended)
                  </label>

                  <input
                    type="text"
                    name="university"
                    placeholder="University Name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Degree */}
                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Degree
                  </label>

                  <select
                    name="degree"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Experience */}
            <div>

              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Role
              </h3>

              <div className="grid gap-4 md:grid-cols-3">

                {/* Position */}
                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Position
                  </label>

                  <input
                    type="text"
                    name="experiencePosition"
                    placeholder="Software Engineer | N/A"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Company Name
                  </label>

                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name | N/A"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Year */}
                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Year
                  </label>

                  <input
                    type="text"
                    name="experienceYear"
                    placeholder="2024 - Present | N/A"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

              </div>
            </div>

            {/* Profile Photo */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Profile Photo
              </label>

              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="block w-full rounded-lg border border-gray-300 p-2"
              />

              {photo && (
                <p className="mt-2 text-sm text-green-600">
                  Selected: {photo.name}
                </p>
              )}
            </div>

            {/* Banner Photo */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Banner Photo
              </label>

              <input
                type="file"
                name="bannerPhoto"
                accept="image/*"
                onChange={(e) => setBannerPhoto(e.target.files[0])}
                className="block w-full rounded-lg border border-gray-300 p-2"
              />

              {bannerPhoto && (
                <p className="mt-2 text-sm text-green-600">
                  Selected: {bannerPhoto.name}
                </p>
              )}
            </div>

          </div>

          {/* Footer */}
          <div className="sticky bottom-0 flex justify-end gap-3 border-t bg-white px-6 py-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-6 py-2.5 font-semibold text-gray-700 hover:bg-gray-100"
            >
              Edit
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white hover:bg-blue-700"
            >
              Save
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default ProfileModal;