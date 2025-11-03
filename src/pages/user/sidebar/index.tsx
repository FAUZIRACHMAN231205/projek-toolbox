import Image from "next/image";
import { useState } from 'react';
import Link from "next/link";
import { LayoutGrid, Users, Briefcase, BarChart3, Building2, ChevronDown } from 'lucide-react';
import { useRouter } from "next/router";

interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ isSidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/auth/login');
  };

  return (
    <aside
      className={`min-h-screen bg-gradient-to-b from-[#16A34A] to-[#15803D] text-white fixed top-0 left-0 h-screen z-20 transition-all duration-300 ${isSidebarOpen ? 'w-[280px]' : 'w-20'} flex flex-col`}
    >
      {/* Logo Section */}
      <div className={`p-5 ${!isSidebarOpen && 'flex justify-center'}`}>
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="14" y="3" width="7" height="7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="14" y="14" width="7" height="7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="14" width="7" height="7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {isSidebarOpen && (
            <div>
              <div className="font-bold text-lg leading-tight">Toolbox</div>
              <div className="text-xs opacity-80">v1.0.0</div>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3">
        {/* Generals Section */}
        <div className="mb-6">
          {isSidebarOpen && (
            <h3 className="text-xs uppercase text-white/70 font-semibold px-3 mb-3 tracking-wider">Generals</h3>
          )}
          <Link 
            href="/" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:bg-white/10 ${
              router.pathname === '/' ? 'bg-white/20 font-medium' : ''
            } ${!isSidebarOpen && 'justify-center'}`}
          > 
            <LayoutGrid size={20} />
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>
        </div>

        {/* Workspace Section */}
        <div className="mb-6">
          {isSidebarOpen && (
            <h3 className="text-xs uppercase text-white/70 font-semibold px-3 mb-3 tracking-wider">Workspace</h3>
          )}
          <div className="space-y-1">
            <Link 
              href="/user/MyTeam" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:bg-white/10 ${
                router.pathname === '/user/MyTeam' ? 'bg-white/20 font-medium' : ''
              } ${!isSidebarOpen && 'justify-center'}`}
            > 
              <Users size={20} />
              {isSidebarOpen && <span>My Team</span>}
            </Link>
            <Link 
              href="/user/MyJobs" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:bg-white/10 ${
                router.pathname === '/user/MyJobs' ? 'bg-white/20 font-medium' : ''
              } ${!isSidebarOpen && 'justify-center'}`}
            > 
              <Briefcase size={20} />
              {isSidebarOpen && <span>My Jobs</span>}
            </Link>
            <Link 
              href="/user/report" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:bg-white/10 ${
                router.pathname === '/user/report' ? 'bg-white/20 font-medium' : ''
              } ${!isSidebarOpen && 'justify-center'}`}
            > 
              <BarChart3 size={20} />
              {isSidebarOpen && <span>Report</span>}
            </Link>
          </div>
        </div>

        {/* Master Data Section */}
        <div>
          {isSidebarOpen && (
            <h3 className="text-xs uppercase text-white/70 font-semibold px-3 mb-3 tracking-wider">Master Data</h3>
          )}
          <Link 
            href="/user/Organizations" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:bg-white/10 ${
              router.pathname === '/user/Organizations' ? 'bg-white/20 font-medium' : ''
            } ${!isSidebarOpen && 'justify-center'}`}
          > 
            <Building2 size={20} />
            {isSidebarOpen && <span>Organizations</span>}
          </Link>
        </div>
      </nav>

      {/* Profile Section at Bottom */}
      <div className="p-4 border-t border-white/10">
        {isSidebarOpen ? (
          <div className="relative">
            <button 
              onClick={() => setProfileOpen(!isProfileOpen)}
              className="w-full flex items-center justify-between gap-3 bg-white/10 hover:bg-white/15 p-3 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <Image 
                  src="/images/profile.png" 
                  alt="Profile" 
                  width={40} 
                  height={40} 
                  className="rounded-full ring-2 ring-white/30"
                />
                <div className="text-left">
                  <div className="font-semibold text-sm">User Name</div>
                  <div className="text-xs opacity-80">user@example.com</div>
                </div>
              </div>
              <ChevronDown 
                size={18} 
                className={`opacity-70 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            {isProfileOpen && (
              <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-xl shadow-2xl overflow-hidden">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <Image 
              src="/images/profile.png" 
              alt="Profile" 
              width={40} 
              height={40} 
              className="rounded-full ring-2 ring-white/30 cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            />
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
