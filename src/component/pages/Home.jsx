import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { PiGraduationCapDuotone } from 'react-icons/pi';
import {
  PiUsersThree,
  PiBriefcase,
  PiChatCircle,
  PiSparkle,
} from "react-icons/pi";
import { Link } from 'react-router';
const features = [
  {
    icon: <PiUsersThree />,
    title: "Connect with alumni",
    description:
      "Send a request, get accepted, and build a network inside your own university.",
  },
  {
    icon: <PiBriefcase />,
    title: "Jobs & internships",
    description:
      "Alumni post real openings. Search, filter and save the ones that fit you.",
  },
  {
    icon: <PiChatCircle />,
    title: "Direct messaging",
    description:
      "Talk to your connections and get career guidance without cold emails.",
  },
  {
    icon: <PiSparkle />,
    title: "AI recommendations",
    description:
      "Smart job matches and people suggestions based on your skills and department.",
  },
];
const Home = () => {
    return (
        <div className='p-4 ml-6 mt-20'>
            <h2 className='inline-flex items-center gap-2 rounded-xl bg-blue-100 p-1 font-serif text-lg'><PiGraduationCapDuotone />One university. One network.</h2>
        
        
       
        <div className='flex'>
        <div className='flex-1'>
            <h2 className='mt-10 text-7xl font-bold'>
            Connecting students with alumni to create <span className='text-blue-500'>career opportunities</span></h2>
            <p className='mt-4 text-gray-400 font-semibold text-lg'>A clean, focused professional network for current students and graduates. Share opportunities, find mentors, post jobs and let AI surface the matches that matter.</p>
         
        </div>
        <div className='  bg-white p-5 mt-10 rounded-xl shadow-md'>
         <h3 className='text-2xl  font-extralight'>Your journey starts here</h3>
        
        <div className=' flex flex-col gap-3.5 mt-5'>
            <p className=''> <span className="font-bold my-2 font-weight-bold mr-2.5 rounded-full p-1.5 text-white bg-blue-600">1</span>Register with your university ID</p>
            <p className=''> <span className="font-bold my-2 font-weight-bold mr-2.5 rounded-full p-1.5 text-white bg-blue-600">2</span>Complete your profile and skills</p>
            <p className=''> <span className="font-bold my-2 font-weight-bold mr-2.5 rounded-full p-1.5 text-white bg-blue-600">3</span>Discover students and alumn</p>
            <p className=''> <span className="font-bold my-2 font-weight-bold mr-2.5 rounded-full p-1.5 text-white bg-blue-600">4</span>Connect, message and get referrals</p>
            <p className=''> <span className="font-bold my-2 font-weight-bold mr-2.5 rounded-full p-1.5 text-white bg-blue-600">5</span>Find or post jobs and internships</p>
        
        </div>
        </div>

        </div >
          <div className='flex gap-3 mt-10'>
        <Link to="/register" className='bg-blue-500 flex items-center gap-2 text-white px-4 py-2 rounded-md hover:bg-blue-600'>Create your account <FaArrowRight /></Link>
        <Link to="/login" className=' btn flex items-center gap-2 px-4 py-2 rounded-md'>I already have one</Link>
        </div>

        <div className='flex gap-12 mt-10'>
            <div><h3 className='text-4xl'>4200+</h3>
                <p>Students</p></div>
            <div> <h3 className='text-4xl'>12000+</h3>
                <p>Alumni</p></div>
            <div><h3 className='text-4xl'>890+</h3>
                <p>Open roles</p></div>

        </div>
       
        <section className="py-8 ">
      <div className="">
        
       
        <h2 className="mb-7 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
          Everything a university community needs
        </h2>

       
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl text-blue-900">
                {feature.icon}
              </div>

              
              <h3 className="mb-2 text-lg font-semibold text-slate-950">
                {feature.title}
              </h3>

              <p className="max-w-xl text-[16px] leading-6 text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>


        </div>
    );
};

export default Home;