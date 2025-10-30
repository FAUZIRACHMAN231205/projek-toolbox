import Image from "next/image";
import { useState } from 'react';
import { LayoutGrid, Users, ClipboardList, BarChart2, Building, ChevronsUpDown, LogOut, Menu } from 'lucide-react';

const Sidebar = () => {
  const [isLogoutVisible, setLogoutVisible] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logging out...");
    setLogoutVisible(false);
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-30 bg-[#16A34A] text-white p-2 rounded-lg shadow-lg focus:outline-none"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        aria-label={isSidebarOpen ? 'Tutup Sidebar' : 'Buka Sidebar'}
      >
        <Menu size={24} />
      </button>
      <aside
        className={`min-h-screen bg-[#16A34A] text-white px-4 py-5 flex flex-col justify-between fixed top-0 left-0 h-screen z-20 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}
      >
        <div className={`${isSidebarOpen ? '' : 'hidden'}`}>
        <div className="flex items-center gap-3 mb-6 px-2">
           <div className="p-2 bg-white/20 rounded-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 7L12 12L22 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="font-bold text-lg">Toolbox</div>
            <div className="text-xs opacity-80">v1.0.0</div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xs uppercase text-white/60 font-semibold px-3 mb-2">Generals</h3>
          <nav>
            <a className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#15803D]" href="#"> 
              <LayoutGrid size={20} />
              <span className="font-medium">Dashboard</span>
            </a>
          </nav>
        </div>

        <div className="mb-4">
          <h3 className="text-xs uppercase text-white/60 font-semibold px-3 mb-2">Workspace</h3>
          <nav className="space-y-1">
            <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#15803D]/70" href="#"> 
              <Users size={20} />
              <span>My Team</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#15803D]/70" href="#"> 
              <ClipboardList size={20} />
              <span>My Jobs</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#15803D]/70" href="#"> 
              <BarChart2 size={20} />
              <span>Report</span>
            </a>
          </nav>
        </div>
        
        <div>
          <h3 className="text-xs uppercase text-white/60 font-semibold px-3 mb-2">Master Data</h3>
          <nav>
            <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#15803D]/70" href="#"> 
              <Building size={20} />
              <span>Organizations</span>
            </a>
          </nav>
        </div>
      </div>

  <div className={`relative ${isSidebarOpen ? '' : 'hidden'}`}> 
        <button 
          onClick={() => setLogoutVisible(!isLogoutVisible)}
          className="w-full flex items-center justify-between gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors mb-0"
        >
          <div className="flex items-center gap-3">
            <Image src="/images/profile.png" alt="avatar" width={40} height={40} className="rounded-full"/>
            <div>
              <div className="font-semibold text-sm text-left">hiuman</div>
              <div className="text-xs opacity-80">000000</div>
            </div>
          </div>
          <ChevronsUpDown size={18} className="opacity-70" />
        </button>

        {isLogoutVisible && (
          <div className="absolute bottom-full left-0 w-full mb-2">
            <div className="bg-white text-gray-800 rounded-lg shadow-lg">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100 rounded-lg"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
      </aside>
    </>
  );
}
export default Sidebar;
