import { useState } from "react";

const ProfileModal = ({ isOpen, onClose }) => {
 

  const [skillInput, setSkillInput] = useState("");

  if (!isOpen) return null;

  // Add skill
  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();

      const newSkill = skillInput.trim();

      if (!formData.skills.includes(newSkill)) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, newSkill],
        }));
      }

      setSkillInput("");
    }
  };

  // Remove skill
  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  // Photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      photo: file,
    }));
  };

  // Banner upload
  const handleBannerUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      bannerPhoto: file,
    }));
  };

  // Save
  const handleSave = (e) => {
    e.preventDefault();
    const position= e.target.position.value;
    const location= e.target.location.value;
    const phone= e.target.phone.value;
    const about= e.target.about.value;
    const skills= e.target.skills.value;
    const university= e.target.university.value;
    const degree= e.target.degree.value;
    const experiencePosition= e.target.experiencePosition.value;
    const companyName= e.target.companyName.value;
    const experienceYear= e.target.experienceYear.value;
    const photo= e.target.photo.value;
    const bannerPhoto= e.target.bannerPhoto.value;
    const data = {
      phone,position,location,about,skills,university,
      degree,experiencePosition,companyName,experienceYear,
      photo,bannerPhoto
    }

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(res=> res.json())
    .then(data => {
      console.log("Success:", data);
      // onClose();
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-5">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="sticky bg-blue-500 top-0 z-10 flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-2xl text-white font-bold text-gray-800">
            Customize Info
          </h2>

          <button
            onClick={onClose}
            className="text-2xl  text-red-400 hover:text-red-600"
          >
            ×
          </button>
        </div>

        {/* Form */}
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
            
              // onChange={handleChange}
              placeholder="Rajshahi, Bangladesh"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Phone (whatsapp)
            </label>

            <input
              type="text"
              name="phone"
            
              // onChange={handleChange}
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
              
              // onChange={handleChange}
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
              placeholder="Write a skill and press Enter"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />

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
                  // onChange={handleChange}
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
                  // onChange={handleChange}
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
              Role(Optional)
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
                  // onChange={handleChange}
                  placeholder="Software Engineer"
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
                  // onChange={handleChange}
                  placeholder="Company Name"
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
                  // onChange={handleChange}
                  placeholder="2024 - Present"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Photo */}
          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Profile Photo
            </label>

            <input
              type="file"
              accept="image/*"
              // onChange={handlePhotoUpload}
              className="block w-full rounded-lg border border-gray-300 p-2"
            />
          </div>

          {/* Banner Photo */}
          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Banner Photo
            </label>

            <input
              type="file"
              accept="image/*"
              // onChange={handleBannerUpload}
              className="block w-full rounded-lg border border-gray-300 p-2"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex justify-end gap-3 border-t bg-white px-6 py-4">

          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-6 py-2.5 font-semibold text-gray-700 hover:bg-gray-100"
          >
            Edit
          </button>

          <button
            onClick={handleSave}
            className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white hover:bg-blue-700"
          >
            Save
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProfileModal;