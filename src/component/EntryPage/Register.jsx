import { use, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { fireThemedAlert } from "../utilies/ThemeUtility.jsx";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase.jsx";
const Register = () => {
  //   usePageTitle("Sign Up");
  const { CreateUser, setUser, updateUser, googleSign } = use(AuthContext);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // const handleRegister = (event) => {
  //   event.preventDefault();
  //   const batch = event.target.batch.value;
  //   const name = event.target.name.value;
  //   const email = event.target.email.value;
  //   const password = event.target.password.value;
  //   const department = event.target.department.value;
  //   const studentId = event.target.studentId.value;

  //   if (name.length < 3) {
  //     setNameError("Name must be at least 3 characters long.");
  //     return;
  //   }
  //   setNameError("");
  //   const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
  //   if (!passwordRegex.test(password)) {
  //     setPasswordError(
  //       "Required uppercase, lowercase with minimum 6 characters.",
  //     );
  //     return;
  //   }
  //   setPasswordError("");
  //   const pattern = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  //   if (!pattern.test(email)) {
  //     setEmailError("Required a valid email address.");
  //     return;
  //   }
  //   setEmailError("");

  //   CreateUser(email, password)
  //     .then((result) => {
  //       updateUser({
  //         displayName: name,
  //         batch: batch,
  //       })
  //         .then(() => {
  //           setUser({ ...result.user, displayName: name, batch: batch });
  //           if (result.user) {
  //             fireThemedAlert({
  //               title: "Success",
  //               text: "Account created successfully!",
  //               icon: "success",
  //             });
  //             navigate("/");
  //           }
  //         })
  //         .catch(() => {
  //           fireThemedAlert({
  //             title: "Error!",
  //             text: "Error updating profile:",
  //             icon: "error",
  //           });
  //           setUser(result.user);
  //         });
  //     })
  //     .catch((error) => {
  //       const errorMessage = error.message;
  //       fireThemedAlert({
  //         title: "Error!",
  //         text: errorMessage,
  //         icon: "error",
  //       });
  //     });
  // };
  const handleRegister = async (event) => {
    event.preventDefault();

    const batch = event.target.batch.value;
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const department = event.target.department.value;
    const studentId = event.target.studentId.value;

    if (name.length < 3) {
      setNameError("Name must be at least 3 characters long.");
      return;
    }
    setNameError("");
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Required uppercase, lowercase with minimum 6 characters.",
      );
      return;
    }
    setPasswordError("");
    const pattern = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

    if (!pattern.test(email)) {
      setEmailError("Required a valid email address.");
      return;
    }
    setEmailError("");
    try {
      const result = await CreateUser(email, password);
      const user = result.user;
      await updateUser({
        displayName: name,
      });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        batch: batch,
        department: department,
        studentId: studentId,
        createdAt: new Date(),
      });
      setUser({
        ...user,
        displayName: name,
      });
      fireThemedAlert({
        title: "Success",
        text: "Account created successfully!",
        icon: "success",
      }).then(() => {
        navigate(location?.state?.from?.pathname || "/home-log");
      });
    } catch (error) {
      console.log(error);

      fireThemedAlert({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };
  const handleEye = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-12  transition-colors duration-300">
      <div className="card py-6 bg-base-100 text-base-content w-full max-w-sm shrink-0 shadow-2xl border border-base-300">
        <h2 className="font-bold text-2xl text-center">
          Register your account
        </h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            <label className="label font-bold">Your Name </label>
            <input
              type="text"
              name="name"
              required
              className="input input-bordered w-full"
              placeholder="Enter your Name"
            />
            {nameError && (
              <p className="text-red-600 font-semibold">{nameError}</p>
            )}
            <label className="label font-bold">Batch</label>
            <input
              type="text"
              name="batch"
              required
              className="input input-bordered w-full"
              placeholder="Enter your Batch"
            />

            <label className="label font-bold">Department</label>
            <select
              name="department"
              required
              className="select select-bordered w-full"
              defaultValue=""
            >
              <option value="" disabled>
                Select your Department
              </option>
              <option value="CSE">Computer Science & Engineering</option>
              <option value="EEE">Electrical & Electronic Engineering</option>
              <option value="BBA">Bachelor of Business Administration </option>
              <option value="NFE">Nutrition and Food Engineering </option>
              <option value="ENG">English </option>
              <option value="IHC">Islamic History and Culture </option>
              <option value="PS">Political Science </option>
              <option value="ECON">Economics </option>
              <option value="PHAR">Pharmacy </option>
              <option value="JCMS">JCMS </option>
              <option value="LLB">LLB </option>
              <option value="SOC">Sociology </option>
            </select>

            <label className="label font-bold">
              Student ID of VU(If you remember it)
            </label>
            <input
              type="number"
              name="studentId"
              className="input input-bordered w-full"
              placeholder="Enter your Student ID"
            />

            <label className="label font-bold">Email address</label>
            <input
              type="email"
              name="email"
              required
              className="input input-bordered w-full"
              placeholder="Enter your Email"
            />
            {emailError && (
              <p className="text-red-600 font-semibold">{emailError}</p>
            )}
            <label className="label font-bold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full"
                name="password"
                placeholder="Password"
              />
              <button className="absolute top-4 right-5" onClick={handleEye}>
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-600 font-semibold">{passwordError}</p>
            )}
            <div className="flex mt-2">
              <input
                type="checkbox"
                name="terms"
                required
                id="terms"
                className="mr-2"
              />
              <p className="text-base-content/80">
                Agree to terms and conditions
              </p>
            </div>

            <button
              type="submit"
              className="btn btn-primary text-primary-content mt-2"
            >
              Register
            </button>

            <p className="text-center font-semibold pt-3">
              Already have an account?
              <Link
                to="/login"
                className="link text-blue-600 dark:text-blue-400"
              >
                Login
              </Link>
            </p>
          </fieldset>
        </form>
        <div className="card  px-6"></div>
      </div>
    </div>
  );
};

export default Register;
