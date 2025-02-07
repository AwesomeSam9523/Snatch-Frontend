import Image from "next/image";
import { FaInstagram, FaLinkedin, FaXTwitter, FaGlobe } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-t from-black via-green-600 pt-8 mt-8 text-white py-10 px-8 md:px-16">

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between flex-wrap">
        
        {/* Left Section: Logos */}
        <div className="flex items-center gap-4">
          <Image src="/snatchlogologin.png" alt="SNATCH" width={150} height={50} className="h-12 w-auto object-contain" />
          <span className="text-white text-3xl font-light">/</span>
          <div className="flex items-center gap-2">
            <Image src="/ieee.png" alt="IEEE Logo" width={120} height={50} className="h-12 w-auto object-contain" />
            
          </div>
        </div>

        {/* Middle Section: Contact Info */}
        <div className="text-white text-center md:text-left mt-6 md:mt-0">
          <div className="text-center ">
            <p className="text-20px font-semibold">Rishi Joshi</p>
            <p className="text-9px opacity-100">+91 99806 10103</p>
            <p className="text-9px opacity-100">Chairperson</p>
          </div>
          <br />
          <div className="text-center ">
          <p className="text-20px font-semibold">Pranav Bhardwaj</p>
          <p className="text-9px opacity-100">+91 87885 54806</p>
          <p className="text-9px opacity-100">Vice-Chairperson</p>
          </div>
        </div>

        {/* Right Section: Website & Social Icons */}
        <div className="flex flex-col items-center md:items-end gap-3 mt-6 md:mt-0">
          <a href="https://cs.ieeemuj.com/" target="_blank" className="flex items-center gap-2 text-white hover:opacity-80 transition">
            <FaGlobe className="text-xl" />
            <span className="underline">https://cs.ieeemuj.com/</span>
          </a>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="p-2 rounded-full border border-white hover:bg-white hover:text-green-500 transition">
              <FaInstagram className="text-xl" />
            </a>
            <a href="#" className="p-2 rounded-full border border-white hover:bg-white hover:text-green-500 transition">
              <FaLinkedin className="text-xl" />
            </a>
            <a href="#" className="p-2 rounded-full border border-white hover:bg-white hover:text-green-500 transition">
              <FaXTwitter className="text-xl" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
