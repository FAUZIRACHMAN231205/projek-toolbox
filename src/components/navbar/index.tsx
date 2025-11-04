import { Menu, Home, ChevronRight } from 'lucide-react';
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { TodoListSheet } from '../todo/todo-list-sheet';

interface NavbarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Navbar = ({ isSidebarOpen, setSidebarOpen }: NavbarProps) => {
  const router = useRouter();
  
  // Map route ke nama halaman
  const pageName = useMemo(() => {
    const path = router.pathname;
    
    if (path === '/' || path === '/user/dashboard') return 'Dashboard';
    if (path === '/user/MyTeam') return 'My Team';
    if (path === '/user/MyJobs') return 'My Jobs';
    if (path === '/user/report') return 'Report';
    if (path === '/user/Organizations') return 'Organizations';
    if (path === '/admin/dashboard') return 'Admin Dashboard';
    
    // Fallback: ambil dari path terakhir dan format
    const segments = path.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    
    if (!lastSegment) return 'Dashboard';
    
    return lastSegment
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, [router.pathname]);
  
  return (
    <nav className="bg-transparent px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Menu Toggle & Breadcrumb */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label={isSidebarOpen ? 'Tutup Sidebar' : 'Buka Sidebar'}
          >
            <Menu size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <button 
              onClick={() => router.push('/')}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              aria-label="Go to Dashboard"
            >
              <Home size={18} />
            </button>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-gray-900 dark:text-gray-100 font-medium">{pageName}</span>
          </div>
        </div>
        
        {/* Right Section - Calendar & Theme Toggle */}
        <div className="flex items-center gap-4">
          <TodoListSheet />
          
          <AnimatedThemeToggler size={18} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
