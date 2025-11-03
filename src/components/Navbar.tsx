import { LayoutGrid, Home, CalendarCheck2, Moon } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white rounded-t-xl px-8 py-4 shadow-sm border-b border-gray-200" style={{marginTop: 0}}>
      <div className="flex items-center gap-4">
        <LayoutGrid size={24} className="text-gray-700" />
        <Home size={24} className="text-gray-700" />
        <span className="text-gray-700 font-medium">Dashboard</span>
      </div>
      <div className="flex items-center gap-6">
        <CalendarCheck2 size={24} className="text-gray-700" />
        <Moon size={24} className="text-gray-700" />
      </div>
    </nav>
  );
}