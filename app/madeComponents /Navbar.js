import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md px-16">
      {/* Logo Section */}
      <div className="flex items-center gap-x-4">
        {/* Snatch Logo */}
        <div className="flex items-center h-16">
          <Image 
            src="/snatch.png" 
            alt="SNATCH" 
            width={150}
            height={80}
            className="h-auto max-h-12 object-contain hidden sm:block"
          />
        </div>
        
        <span className="text-gray-400 text-2xl font-semibold"></span>
        
        {/* IEEE Logo */}
        <div className="flex items-center h-16">
          <Image 
            src="/ieee1.png" 
            alt="IEEE Computer Society"
            width={200} 
            height={50}
            className="h-auto max-h-12 object-contain hidden sm:block"
          />
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex items-center space-x-2">
        {/* Profile Avatar with Blue Background */}
        <div className="bg-blue-200 rounded-full p-2">
          <Image 
            src="/ieee.png"
            alt="Power Rangers"
            width={32}
            height={32}
            className="h-8 w-8 object-contain rounded-full"
          />
        </div>

        {/* Player Info */}
        <div>
          <p className="font-semibold text-gray-800">Power Rangers</p>
          <p className="text-gray-500 text-sm">Pool #2</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
