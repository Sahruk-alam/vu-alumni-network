import logo from '../assets/Gemini_Generated_Image_lujydqlujydqlujy.jpeg'
import vu from '../assets/varendra-university-seeklogo.png'
import { Link, NavLink } from 'react-router';
import { AuthContext } from './AuthProvider/AuthProvider';
import { use } from 'react';
import { CiHome, CiLogin } from 'react-icons/ci';
import { LuShoppingBag } from 'react-icons/lu';
import { MdPeople } from 'react-icons/md';
import { FiMessageSquare } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';



const Navbar = () => {
const { user,signoutUser  } = use(AuthContext);
const handleSignOut = () => {
  signoutUser()
  .then(() => {})
  .catch((error) => {
    console.error("Error signing out:", error);
  });

};

 const links = (
    <>
      {user && (
        <>
        <li >
        <NavLink to="/home-log" className=" flex flex-col items-center leading-none"> <CiHome size={20} />Home</NavLink>
      </li>
          <li>
            <NavLink to="/jobs" className=" flex flex-col items-center leading-none"><LuShoppingBag size={20} />Jobs</NavLink>
          </li>
          <li>
            <NavLink to="/connections" className=" flex flex-col items-center leading-none"><MdPeople size={20} />Connection</NavLink>
          </li>
          <li>
            <NavLink to="/messages" className=" flex flex-col items-center leading-none"><FiMessageSquare size={20} />Messages</NavLink>
          </li>
          <li>
            <NavLink to="/alerts" className=" flex flex-col items-center leading-none" ><IoMdNotificationsOutline size={20} />Alerts</NavLink>
          </li>
          <li>
  <NavLink
    to="/profile"
    className="flex flex-col items-center"
  >
    {user?.photoURL ? (
      <img
        src={user.photoURL}
        alt={user.displayName}
        className="rounded-full object-cover"
      />
    ) : (
      <div className="flex p- items-center justify-center rounded-full bg-blue-600 px-1 text-white">
        {user?.displayName?.slice(0, 2).toUpperCase()}
      </div>
    )}

    <span className="text-sm">{user?.displayName}</span>
  </NavLink>
</li>
        </>
      )}
    </>
  );
// console.log(user)
    return (
       <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      {user && (
  <ul
    tabIndex="-1"
    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
  >
    {links}
  </ul>
)}
      
    </div>
    <Link to='/home-log' className='flex items-center gap-1.5'>
        <h2 className='font-bold text-lg text-white rounded-full p-1.5 bg-blue-500'>VU</h2>
      <h2 className="font-semibold  text-xl">Alumni <span className="text-blue-500">Network</span></h2>  
    </Link>
    
  </div>
  <div className="navbar-center hidden md:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  {
    user ? (
      <div className="navbar-end ">
        <Link onClick={handleSignOut} className=" flex text-red-500 items-center gap-1.5 rounded-xl"><CiLogin size={20} />Logout</Link>
      </div>
    ) : (
      <div className="navbar-end">
        <Link to="/login" className="btn rounded-xl">Login</Link>
        <Link to="/register" className="btn rounded-xl text-white bg-blue-500 ml-2">Join Us</Link>
      </div>
    )
  }
  
</div>
    );
};

export default Navbar;