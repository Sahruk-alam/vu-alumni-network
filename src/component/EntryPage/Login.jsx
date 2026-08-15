import { use, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import usePageTitle from "../../hooks/usePageTitle";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Login = () => {
//   usePageTitle("Login");
  const { signInUser, forgetPassword, googleSign, setUser } = use(AuthContext);
  const emailRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    } else {
      setError("");
    }
    signInUser(email, password)
      .then(() => {
        event.target.reset();
        navigate(location?.state?.from?.pathname || "/home-log");
      })
      .catch((error) => {
        const errorMessage = error.code;
        alert(errorMessage);
        setError("Invalid email or password");
      });
  };
  const handleForget = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    forgetPassword(email)
      .then(() => {
        alert("Password reset email sent. Please check your inbox.");
      })
      .catch((error) => {
        alert(
          "Failed to send password reset email. Please try again later.",
          error,
        );
      });
  };
  const handleEye = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  const handleGoogle = () => {
    googleSign()
      .then((result) => {
        setUser(result.user);
        // navigate(location?.state?.from?.pathname || "/");
      })
      .catch((error) => {
        alert("Error during Google sign-in:", error);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-12  transition-colors duration-300">
      <div className="card py-6 bg-base-100 text-base-content w-full max-w-sm shrink-0 shadow-2xl border border-base-300">
        <h2 className="font-bold text-2xl text-center">Login Your Account</h2>
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            <label className="label font-bold">Email address</label>
            <input
              type="email"
              name="email"
              required
              className="input input-bordered w-full"
              placeholder="Enter your Email"
              ref={emailRef}
            />

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
            <div>
              <a
                onClick={handleForget}
                className="link link-hover text-green-600 dark:text-green-400"
              >
                Forgot password?
              </a>
            </div>
            {error && <p className="text-red-600 font-semibold">{error}</p>}
            <button className="btn btn-primary text-primary-content mt-4">
              Login
            </button>

            <p className="text-center font-semibold pt-3">
              Don't have an account?
              <Link
                to="/register"
                className="link text-blue-600 dark:text-blue-400"
              >
                Register
              </Link>
            </p>
          </fieldset>
        </form>
        <div className="card  px-6">
          <button
            onClick={handleGoogle}
            className="btn btn-outline text-base-content outline-1"
          >
            <svg
              aria-label="Google logo"
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
