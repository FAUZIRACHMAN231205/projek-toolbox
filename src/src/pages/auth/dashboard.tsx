import React, { useState, useEffect, useRef } from 'react';
import LoginSuccessModal from '@/components/LoginSuccessModal';
// import Head from 'next/head'; // Dihapus sementara untuk preview
// import Link from 'next/link'; // Diganti dengan <a>
// import Image from 'next/image'; // Diganti dengan <img>
import {
    LayoutDashboard,
    User,
    Briefcase,
    BarChart2,
    Building,
    Home,
    ChevronRight,
    ChevronDown,
    Sun, // PERBAIKAN: Mengganti ArrowUpFromLine
    CalendarDays, // Diganti dari Clock
    ListChecks, // Diganti dari CheckCircle
    Archive,
    FolderOpen,
    Loader,
    FolderCheck,
    Search,
    List, // Ditambahkan untuk All Data Project
    Users, // Ditambahkan untuk Employee Performance
    BarChartHorizontal, // Ditambahkan untuk Summary
    ClipboardList, // Ditambahkan untuk Jobs Summary
    RefreshCw, // Ikon Refresh
    UserCircle, // Ikon User
    Plus, // Ikon Tambah untuk Todo
    X, // Ikon Close untuk Todo
    ChevronLeft, // Ikon Navigasi Tanggal Todo
    Filter, // Ikon Filter Todo
    Bookmark, // Ikon Kategori Todo
    MoreHorizontal, // Ikon Opsi Todo
    Save, // Ditambahkan untuk Modal
    FileSignature // Ikon baru untuk logo
} from 'lucide-react';

// --- Data Mock untuk Todo List ---
const todoItems = [
    {
        id: 1,
        title: "Update UI UX",
        date: "29 Sep - 31 Oct",
        category: "Project",
        status: "Progress",
        color: "blue" as const // Tipe "blue"
    },
    {
        id: 2,
        title: "Pembuatan API...",
        date: "01 Oct - 31 Oct",
        category: "Project",
        status: "Progress",
        color: "blue" as const // Tipe "blue"
    },
    {
        id: 3,
        title: "Integrasi Front End...",
        date: "07 Oct - 31 Oct",
        category: "Project",
        status: "Progress",
        color: "blue" as const // Tipe "blue"
    },
    {
        id: 4,
        title: "Modul Consumable",
        date: "15 Sep - 31 Oct",
        category: "Project",
        status: "Review",
        color: "purple" as const // Tipe "purple"
    },
    {
        id: 5,
        title: "Deployment",
        date: "01 Nov - 05 Nov",
        category: "Project",
        status: "Closed",
        color: "green" as const // Tipe "green"
    },
];

// --- Komponen Status Badge untuk Todo List ---
type StatusBadgeProps = {
    status: string;
    color: "blue" | "purple" | "green";
};
const StatusBadge = ({ status, color }: StatusBadgeProps) => {
    const colors = {
        blue: "bg-blue-100 text-blue-800",
        purple: "bg-purple-100 text-purple-800",
        green: "bg-green-100 text-green-800",
    };
    const dotColors = {
        blue: "bg-blue-500",
        purple: "bg-purple-500",
        green: "bg-green-500",
    };

    return (
        <span className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color] || 'bg-gray-100 text-gray-800'}`}>
            <span className={`w-2 h-2 mr-1.5 rounded-full ${dotColors[color] || 'bg-gray-500'}`}></span>
            {status}
        </span>
    );
};

// --- Helper Functions untuk Tanggal ---
// Cek apakah 2 objek Date merujuk ke hari yang sama
const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
};

// Menghasilkan 5 tanggal (objects) berpusat di 'centerDate'
const getDisplayDates = (centerDate: Date) => {
    const dates = [];
    for (let i = -2; i <= 2; i++) {
        const date = new Date(centerDate);
        date.setDate(date.getDate() + i);
        dates.push(date);
    }
    return dates;
};
// --- Akhir Helper Functions ---


// --- Komponen Calendar Popup ---
type CalendarPopupProps = {
    onSelectDate: (date: Date) => void;
    onClose: () => void;
    selectedDate: Date | null;
    displayDate: Date; // The month/year to show
    setDisplayDate: React.Dispatch<React.SetStateAction<Date>>;
};

const CalendarPopup = ({ onSelectDate, onClose, selectedDate, displayDate, setDisplayDate }: CalendarPopupProps) => {
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    // Get all days for the current display month
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        const days = [];
        
        // Days from previous month
        const startDayOfWeek = firstDay.getDay(); // 0 (Sun) - 6 (Sat)
        for (let i = 0; i < startDayOfWeek; i++) {
            const prevMonthDay = new Date(firstDay);
            prevMonthDay.setDate(prevMonthDay.getDate() - (startDayOfWeek - i));
            days.push({ date: prevMonthDay, isCurrentMonth: false });
        }
        
        // Days in current month
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push({ date: new Date(year, month, i), isCurrentMonth: true });
        }
        
        // Days from next month (to fill 6 weeks / 42 days)
        const totalDays = days.length;
        // Sesuaikan untuk 5 atau 6 baris (35 atau 42)
        const targetDays = totalDays <= 35 ? 35 : 42;
        const remainingDays = targetDays - totalDays;
        
        for (let i = 1; i <= remainingDays; i++) {
            const nextMonthDay = new Date(lastDay);
            nextMonthDay.setDate(lastDay.getDate() + i);
            days.push({ date: nextMonthDay, isCurrentMonth: false });
        }
        
        return days;
    };

    const days = getDaysInMonth(displayDate);

    const changeMonth = (amount: number) => {
        setDisplayDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + amount);
            return newDate;
        });
    };
    
    // Sesuai gambar, '30' disorot. Kita gunakan tanggal 30 Okt 2025 sebagai referensi 'selected'
    // Di aplikasi nyata, ini akan menjadi prop 'selectedDate'
    const highlightDateRef = new Date(2025, 9, 30);

    return (
        // Hentikan propagasi klik agar tidak menutup kalender
        <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-10 w-80" onClick={(e) => e.stopPropagation()}>
            {/* Header Kalender */}
            <div className="flex justify-between items-center mb-3">
                <button onClick={() => changeMonth(-1)} className="p-1 rounded-md hover:bg-gray-100">
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex space-x-2">
                    <button className="font-semibold text-gray-800 hover:bg-gray-100 px-3 py-1 rounded-md flex items-center">
                        {displayDate.toLocaleDateString('id-ID', { month: 'short' }).replace('.', '')}
                        <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
                    </button>
                    <button className="font-semibold text-gray-800 hover:bg-gray-100 px-3 py-1 rounded-md flex items-center">
                        {displayDate.getFullYear()}
                        <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
                    </button>
                </div>
                <button onClick={() => changeMonth(1)} className="p-1 rounded-md hover:bg-gray-100">
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
            </div>
            
            {/* Grid Hari */}
            <div className="grid grid-cols-7 gap-1">
                {daysOfWeek.map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 h-8 w-8 flex items-center justify-center">{day}</div>
                ))}
                
                {days.map(({ date, isCurrentMonth }, index) => {
                    // Sorot tanggal berdasarkan prop 'selectedDate'
                    const isSelected = selectedDate && isSameDay(date, selectedDate);
                    // Sorot tanggal 30 Okt 2025 (sesuai gambar) jika tidak ada yg dipilih
                    const isImageHighlight = !selectedDate && isCurrentMonth && isSameDay(date, highlightDateRef);
                    
                    const key = date.toISOString() + index; // Kunci unik
                    
                    return (
                        <button
                            key={key}
                            onClick={() => {
                                onSelectDate(date);
                                onClose();
                            }}
                            className={`
                                text-center text-sm rounded-lg h-8 w-8
                                ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                                ${isCurrentMonth && !isSelected && !isImageHighlight ? 'hover:bg-gray-100' : ''}
                                ${isSelected || isImageHighlight ? 'bg-green-600 text-white' : ''}
                            `}
                        >
                            {date.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
// --- Akhir Komponen Calendar Popup ---


// --- Komponen Modal Tambah Todo ---
type AddTodoModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const AddTodoModal = ({ isOpen, onClose }: AddTodoModalProps) => {
    // State untuk tanggal
    const initialDate = new Date(2025, 9, 30); // 30 Oktober 2025 (sesuai gambar)
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(initialDate);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
    const [openCalendar, setOpenCalendar] = useState<'start' | 'end' | null>(null);
    
    // State untuk *tampilan* kalender (bulan/tahun yg terlihat)
    const [calendarDisplayDate, setCalendarDisplayDate] = useState(initialDate);

    // Ref untuk modal content agar bisa deteksi klik di luar
    const modalRef = React.useRef<HTMLDivElement>(null);

    // Format tanggal untuk input
    const formatDate = (date: Date | null) => {
        if (!date) return "";
        // Format: October 30, 2025 (sesuai gambar)
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Menutup kalender saat modal ditutup
    useEffect(() => {
        if (!isOpen) {
            setOpenCalendar(null);
        }
    }, [isOpen]);

    // Efek untuk menutup kalender saat klik di luar
    useEffect(() => {
        // Saat kalender terbuka, tambahkan listener untuk menutupnya saat klik di mana saja
        if (!openCalendar) return;

        const handleDocClick = () => setOpenCalendar(null);
        // Tambahkan delay agar klik yg membuka kalender tidak langsung menutupnya
        const timer = setTimeout(() => document.addEventListener('mousedown', handleDocClick), 50);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mousedown', handleDocClick);
        };
    }, [openCalendar]);


    if (!isOpen) return null;

    // Menghentikan penutupan modal saat mengklik konten internal
    const handleModalContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    // Fungsi untuk membuka/menutup kalender
    const toggleCalendar = (type: 'start' | 'end') => {
        if (openCalendar === type) {
            setOpenCalendar(null); // Tutup jika sudah terbuka
        } else {
            // Buka dan set tampilan kalender ke tanggal yg relevan
            const dateToView = (type === 'start' ? selectedStartDate : selectedEndDate) || initialDate;
            setCalendarDisplayDate(dateToView);
            setOpenCalendar(type); // Buka kalender yg baru
        }
    };

    return (
        // Backdrop
        <div 
            className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={onClose} // Menutup modal saat klik backdrop
        >
            {/* Modal Panel */}
            <div 
                ref={modalRef} // Tambahkan ref di sini
                className="bg-white rounded-lg shadow-xl w-full max-w-lg transition-transform duration-300 transform scale-95 opacity-0 animate-modal-scale-in"
                onClick={handleModalContentClick} // Mencegah klik di dalam modal menutupnya
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-5 border-b">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Add New Todo list</h3>
                        <p className="text-sm text-gray-500">Fill out the following form to add a new todo list.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                {/* Modal Body (Form) */}
                <div className="p-5 space-y-4">
                    <div>
                        <label htmlFor="todoTitle" className="block text-sm font-medium text-gray-700 mb-1">Todo List</label>
                        <input
                            type="text"
                            id="todoTitle"
                            placeholder="Enter Todo List"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Start Date (Diganti jadi Tombol Kalender) */}
                        <div className="relative">
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <button
                                type="button"
                                id="startDate"
                                onClick={(e) => {
                                    e.stopPropagation(); // Hentikan event agar tidak memicu listener dokumen
                                    toggleCalendar('start');
                                }}
                                className="w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:border-green-500 focus:ring-1 focus:ring-green-500 text-sm flex justify-between items-center"
                            >
                                <span className={!selectedStartDate ? "text-gray-400" : "text-gray-900"}>
                                    {selectedStartDate ? formatDate(selectedStartDate) : "Select start date"}
                                </span>
                                <CalendarDays className="w-4 h-4 text-gray-400" />
                            </button>
                            {openCalendar === 'start' && (
                                <CalendarPopup
                                    selectedDate={selectedStartDate}
                                    onSelectDate={(date) => {
                                        setSelectedStartDate(date);
                                        setOpenCalendar(null);
                                    }}
                                    onClose={() => setOpenCalendar(null)}
                                    displayDate={calendarDisplayDate}
                                    setDisplayDate={setCalendarDisplayDate}
                                />
                            )}
                        </div>
                        
                        {/* End Date (Diganti jadi Tombol Kalender) */}
                        <div className="relative">
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <button
                                type="button"
                                id="endDate"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCalendar('end');
                                }}
                                className="w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:border-green-500 focus:ring-1 focus:ring-green-500 text-sm flex justify-between items-center"
                            >
                                <span className={!selectedEndDate ? "text-gray-400" : "text-gray-900"}>
                                    {selectedEndDate ? formatDate(selectedEndDate) : "Select end date"}
                                </span>
                                <CalendarDays className="w-4 h-4 text-gray-400" />
                            </button>
                            {openCalendar === 'end' && (
                                <CalendarPopup
                                    selectedDate={selectedEndDate}
                                    onSelectDate={(date) => {
                                        setSelectedEndDate(date);
                                        setOpenCalendar(null);
                                    }}
                                    onClose={() => setOpenCalendar(null)}
                                    displayDate={calendarDisplayDate}
                                    setDisplayDate={setCalendarDisplayDate}
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea
                            id="notes"
                            rows={3}
                            placeholder="Enter Notes..."
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                        ></textarea>
                    </div>
                </div>
                {/* Modal Footer */}
                <div className="flex justify-end p-5 border-t bg-gray-50 rounded-b-lg">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                    </button>
                </div>
            </div>
            
            {/* CSS Kustom untuk Animasi Modal (Perbaikan untuk Peringatan React) */}
            <style>
                {`
                @keyframes modal-scale-in {
                    from {
                        transform: scale(0.9);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .animate-modal-scale-in {
                    animation: modal-scale-in 0.2s ease-out forwards;
                }
                `}
            </style>
        </div>
    );
};
// --- Akhir Komponen Modal ---


// --- Komponen Sidebar Todo List ---
type TodoSidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedDate: Date;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
    currentDateString: string;
    onOpenModal: () => void; // Prop untuk membuka modal
};
const TodoSidebar = ({ isOpen, onClose, selectedDate, setSelectedDate, currentDateString, onOpenModal }: TodoSidebarProps) => {
    // State untuk 'pusat' dari 5 tanggal yang ditampilkan
    const [displayCenterDate, setDisplayCenterDate] = useState(selectedDate);

    // Reset 'pusat' tampilan tanggal setiap kali sidebar dibuka
    useEffect(() => {
        if (isOpen) {
            setDisplayCenterDate(selectedDate);
        }
    }, [isOpen, selectedDate]);

    // Fungsi untuk navigasi tanggal
    const moveDates = (amount: number) => {
        setDisplayCenterDate((prev: Date) => {
            const next = new Date(prev);
            next.setDate(next.getDate() + amount);
            return next;
        });
    };

    const displayDates = getDisplayDates(displayCenterDate);

    // CSS untuk ring fokus shadcn-style
    const ringStyles = "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2";
    // Tipe untuk color (diperbaiki)
    type ColorKey = "blue" | "purple" | "green";

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300" 
                    onClick={onClose}
                ></div>
            )}
            
            {/* Konten Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out flex flex-col ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Header Sidebar */}
                <div className="flex justify-between items-center p-4 border-b">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Todo List</h2>
                        <p className="text-sm text-gray-500">Here is your to-do list.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        {/* Tombol + sekarang memicu onOpenModal */}
                        <button 
                            onClick={onOpenModal} 
                            className={`bg-green-600 text-white p-2 rounded-full hover:bg-green-700 ${ringStyles}`}
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                        <button onClick={onClose} className={`text-gray-500 p-2 rounded-full hover:bg-gray-100 ${ringStyles}`}>
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Date Scroller (Interaktif) */}
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                        <button onClick={() => moveDates(-1)} className={`text-gray-400 hover:text-gray-600 p-1 rounded ${ringStyles}`}>
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center space-x-4 overflow-x-auto">
                            {displayDates.map((date) => {
                                const day = date.getDate();
                                const month = date.toLocaleDateString('id-ID', { month: 'short' }).replace('.', '');
                                const key = date.toISOString();
                                const isSelected = isSameDay(date, selectedDate);

                                return (
                                    <div
                                        key={key}
                                        onClick={() => setSelectedDate(date)} // Update state di parent
                                        className={`text-center p-2 rounded-lg cursor-pointer min-w-[40px] transition-colors ${
                                            isSelected
                                                ? 'bg-green-600 text-white'
                                                : 'hover:bg-gray-100'
                                        } ${ringStyles}`} // Tambahkan ring styles
                                        tabIndex={0} // Buat bisa difokus
                                    >
                                        <p className="text-xs">{month}</p>
                                        <p className="font-bold text-lg">{day}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <button onClick={() => moveDates(1)} className={`text-gray-400 hover:text-gray-600 p-1 rounded ${ringStyles}`}>
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Area Konten (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Header Konten (Menggunakan tanggal yang dipilih) */}
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800">Todo List</h3>
                        <p className="text-sm font-medium text-gray-500">{currentDateString}</p>
                    </div>

                    {/* Filters (Gaya Shadcn) */}
                    <div className="flex items-center space-x-2">
                        {/* Tombol Filter */}
                        <button className={`flex items-center justify-center p-2.5 h-10 w-10 border rounded-md text-gray-600 bg-white hover:bg-gray-100 ${ringStyles}`}>
                            <Filter className="w-4 h-4" />
                        </button>
                        {/* Input Search */}
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search Jobs..."
                                className={`w-full pl-10 pr-4 py-2 h-10 border rounded-md text-sm bg-white placeholder:text-gray-500 ${ringStyles}`}
                            />
                        </div>
                        {/* Tombol Status */}
                        <button className={`flex items-center justify-between w-32 px-3 py-2 h-10 border rounded-md text-sm text-gray-700 bg-white hover:bg-gray-100 ${ringStyles}`}>
                            <span>All Status</span>
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>

                    {/* Data Header */}
                    <div className="flex justify-between items-center pt-2">
                        <p className="text-sm font-medium text-gray-800">Total Data</p>
                        <p className="text-sm font-medium text-gray-600">6 Data</p>
                    </div>

                    {/* Daftar Task */}
                    <div className="space-y-3">
                        {todoItems.map((item) => (
                            <div key={item.id} className="bg-white border rounded-lg p-4 flex items-start space-x-3">
                                <div className={`w-1.5 h-10 rounded-full ${item.color === 'blue' ? 'bg-blue-500' : item.color === 'purple' ? 'bg-purple-500' : 'bg-green-500'}`}></div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold text-gray-800">{item.title}</h4>
                                        <StatusBadge status={item.status} color={item.color as ColorKey} />
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                                        <div className="flex items-center space-x-1.5">
                                            <CalendarDays className="w-4 h-4" />
                                            <span>{item.date}</span>
                                        </div>
                                        <div className="flex items-center space-x-1.5">
                                            <Bookmark className="w-4 h-4" />
                                            <span>{item.category}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className={`text-gray-400 hover:text-gray-600 p-1 rounded ${ringStyles}`}>
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};


// Komponen Dashboard Utama
const AdminDashboardPage = () => {
    const [currentTime, setCurrentTime] = useState(new Date()); // Untuk jam di kartu
    const [isMounted, setIsMounted] = useState(false); // Untuk hydration
    const [isTodoSidebarOpen, setIsTodoSidebarOpen] = useState(false); // State untuk Sidebar Todo
    const [todoSelectedDate, setTodoSelectedDate] = useState(new Date()); // State untuk tanggal Todo
    const [isTodoModalOpen, setIsTodoModalOpen] = useState(false); // State untuk Modal Tambah Todo
    const [activeMenu, setActiveMenu] = useState('dashboard'); // State untuk menu aktif
    // success popup state (show after redirect from login)
    const [showSuccess, setShowSuccess] = useState(false);
    const [successName, setSuccessName] = useState('');
    const [successRedirect, setSuccessRedirect] = useState('');

    // Efek untuk menandai bahwa komponen sudah di-mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Efek untuk memperbarui jam (HANYA KARTU JAM) setiap detik
    useEffect(() => {
        if (!isMounted) return;
        const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, [isMounted]);

    // Format Waktu: HH : MM : SS (sesuai gambar baru)
    const timeString = currentTime.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).replace(/\./g, ' : '); // Ganti titik dengan " : " (dengan spasi)
    
    // Format Tanggal (KARTU JAM): 30 Oktober 2025
    const dateString = currentTime.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Format Tanggal (SIDEBAR TODO): Kamis, 30 Oktober 2025
    // Didasarkan pada state 'todoSelectedDate', bukan 'currentTime'
    const todoDateString = todoSelectedDate.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // show success modal if redirected from login
    useEffect(() => {
        try {
            const raw = localStorage.getItem('justLoggedIn');
            if (raw) {
                const parsed = JSON.parse(raw);
                setSuccessName(parsed.username || '');
                // Detected justLoggedIn (silence debug log)
                setSuccessRedirect('/auth/dashboard');
                setShowSuccess(true);
            }
        } catch (err) {
            // ignore
        }
    }, []);

    // CSS untuk ring fokus shadcn-style (untuk elemen di luar sidebar)
    const ringStyles = "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2";

    return (
        <>
            {/* <Head> Dihapus sementara untuk preview environment.
              Catatan: Font "Inter" dan Title akan berfungsi
              saat file ini berjalan di dalam proyek Next.js Anda.
            */}
            
            {/* Div terluar ini menyesuaikan layout h-screen.
             PERUBAHAN: bg-gray-100 -> bg-white
            */}
            <div className="flex h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                {/* ===== Sidebar ===== */}
                <aside className="w-64 flex-shrink-0 bg-[#3fa66c] text-white flex flex-col">
                    {/* Logo/Judul Sidebar (Sesuai Gambar Baru) */}
                    <div className="h-20 flex items-center px-5 gap-3">
                        <FileSignature className="w-7 h-7 flex-shrink-0" />
                        <div>
                            <h1 className="text-xl font-bold">Toolbox</h1>
                            <span className="text-xs font-light -mt-1 block">v1.0.0</span>
                        </div>
                    </div>

                    {/* Search Bar (Sesuai Gambar Baru) */}
                    <div className="p-4">
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                                <Search className="w-4 h-4" />
                            </span>
                            <input type="text" placeholder="Search menu..." className={`w-full h-10 py-2 pr-12 pl-10 bg-white text-gray-800 border border-gray-200 rounded-lg text-sm focus:outline-none ${ringStyles}`} />
                            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium bg-gray-100 border border-gray-300 rounded-md px-1.5 py-0.5">
                                ⌘K
                            </span>
                        </div>
                    </div>

                    {/* Menu Navigasi */}
                    <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
                        {/* Grup Menu: Generals */}
                        <div>
                            <span className="text-xs font-semibold text-white uppercase px-2">Generals</span>
                            <ul className="mt-1 space-y-1">
                                <li>
                                    {/* Link Aktif - Dibuat dinamis */}
                                    <a 
                                        href="#" // Menggunakan <a> standar, bukan <Link>
                                        onClick={(e) => { e.preventDefault(); setActiveMenu('dashboard'); }}
                                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${ringStyles} ${
                                            activeMenu === 'dashboard' ? 'bg-[#059669] text-white' : 'text-white hover:bg-[#047857]'
                                        }`}
                                    >
                                        <LayoutDashboard className="w-5 h-5" />
                                        <span>Dashboard</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Grup Menu: Workspace */}
                        <div className="pt-2">
                            <span className="text-xs font-semibold text-white uppercase px-2">Workspace</span>
                            <ul className="mt-1 space-y-1">
                                <li>
                                    {/* Dibuat dinamis */}
                                    <a 
                                        href="#" 
                                        onClick={(e) => { e.preventDefault(); setActiveMenu('myTeam'); }}
                                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${ringStyles} ${
                                            activeMenu === 'myTeam' ? 'bg-[#059669] text-white' : 'text-white hover:bg-[#047857]'
                                        }`}
                                    >
                                        <User className="w-5 h-5" />
                                        <span>My Team</span>
                                    </a>
                                </li>
                                <li>
                                    {/* Dibuat dinamis */}
                                    <a 
                                        href="#" 
                                        onClick={(e) => { e.preventDefault(); setActiveMenu('myJobs'); }}
                                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${ringStyles} ${
                                            activeMenu === 'myJobs' ? 'bg-[#059669] text-white' : 'text-white hover:bg-[#047857]'
                                        }`}
                                    >
                                        <Briefcase className="w-5 h-5" />
                                        <span>My Jobs</span>
                                    </a>
                                </li>
                                <li>
                                    {/* Dibuat dinamis */}
                                    <a 
                                        href="#" 
                                        onClick={(e) => { e.preventDefault(); setActiveMenu('report'); }}
                                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${ringStyles} ${
                                            activeMenu === 'report' ? 'bg-[#059669] text-white' : 'text-white hover:bg-[#047857]'
                                        }`}
                                    >
                                        <BarChart2 className="w-5 h-5" />
                                        <span>Report</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Grup Menu: Master Data */}
                        <div className="pt-2">
                            <span className="text-xs font-semibold text-white uppercase px-2">Master Data</span>
                            <ul className="mt-1 space-y-1">
                                <li>
                                    {/* Dibuat dinamis */}
                                    <a 
                                        href="#" 
                                        onClick={(e) => { e.preventDefault(); setActiveMenu('organizations'); }}
                                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${ringStyles} ${
                                            activeMenu === 'organizations' ? 'bg-[#059669] text-white' : 'text-white hover:bg-[#047857]'
                                        }`}
                                    >
                                        <Building className="w-5 h-5" />
                                        <span>Organizations</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </aside>
                {/* ===== Akhir Sidebar ===== */}

                {/* ===== Konten Utama ===== */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* ===== Header ===== */}
                    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
                        {/* Breadcrumbs */}
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Home className="w-4 h-4" />
                            <ChevronRight className="w-4 h-4" />
                            <span>Dashboard</span>
                        </div>

                        {/* Ikon Header Kanan */}
                        <div className="flex items-center space-x-4">
                            {/* Tombol Tahun (Sesuai Gambar Baru) */}
                            <button className={`flex items-center space-x-2 border rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 ${ringStyles}`}>
                                <CalendarDays className="w-4 h-4 text-gray-500" />
                                <span>2025</span>
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            </button>
                            <button className={`text-gray-500 hover:text-gray-700 p-1 rounded-full ${ringStyles}`}>
                                <RefreshCw className="w-5 h-5" />
                            </button>
                            <button className={`text-gray-500 hover:text-gray-700 p-1 rounded-full ${ringStyles}`}>
                                <UserCircle className="w-6 h-6" />
                            </button>
                        </div>
                    </header>
                    {/* ===== Akhir Header ===== */}

                    {/* ===== Area Konten (Scrollable) ===== */}
                    <main className="flex-1 overflow-y-auto p-6">
                        {/* Judul Dashboard (Sesuai Gambar Baru) */}
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="bg-gray-200 p-3 rounded-lg">
                                <LayoutDashboard className="w-8 h-8 text-gray-700" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                                <p className="text-gray-500">Dashboard Summary of The Year</p>
                            </div>
                        </div>

                        {/* Baris 1: Welcome, Time, Jobs (Sesuai Gambar Baru) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            {/* Kartu Good Morning */}
                            {/* PERUBAHAN: Menambahkan border-yellow-200 */}
                            <div className="md:col-span-2 bg-white border border-yellow-200 rounded-lg p-6 flex items-center space-x-4">
                                <div className="bg-yellow-100 p-3 rounded-lg">
                                    <Sun className="w-7 h-7 text-yellow-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Good Morning, [User]!</h3>
                                    <p className="text-gray-500">Welcome to the Toolbox Dashboard. Have a productive day!</p>
                                </div>
                            </div>
                            
                            {/* Kartu Jam & Tanggal (Sesuai Gambar Baru) */}
                            {/* PERUBAHAN: Menambahkan border-orange-200 */}
                            <div className="bg-white border border-orange-200 rounded-lg p-6 flex items-center space-x-4">
                                <div className="bg-orange-100 p-3 rounded-lg">
                                    <CalendarDays className="w-7 h-7 text-orange-600" />
                                </div>
                                <div>
                                    {/* Tampilkan jam & tanggal hanya jika sudah mounted (client-side) */}
                                    {isMounted ? (
                                        <>
                                            <p id="clock" className="text-lg font-semibold text-gray-800">{timeString}</p>
                                            <p id="date" className="text-sm text-gray-500">{dateString}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-lg font-semibold text-gray-800">-- : -- : --</p>
                                            <p className="text-sm text-gray-500">Memuat...</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Kartu Today's Jobs (Sesuai Gambar Baru) - DIBUAT JADI TOMBOL */}
                            <button
                                type="button"
                                onClick={() => {
                                    setTodoSelectedDate(new Date()); // Reset tanggal ke hari ini saat dibuka
                                    setIsTodoSidebarOpen(true);
                                }}
                                className={`bg-pink-50 border border-pink-200 rounded-lg p-6 flex justify-between items-center text-left hover:bg-pink-100 transition-colors duration-200 ${ringStyles}`}
                            >
                                <div>
                                    <p className="text-sm text-pink-700">Today&apos;s Jobs</p>
                                    <p className="text-3xl font-bold text-pink-900">6</p>
                                </div>
                                <div className="bg-pink-100 p-3 rounded-lg">
                                    <ListChecks className="w-7 h-7 text-pink-600" />
                                </div>
                            </button>
                        </div>

                        {/* Baris 2: Statistik Proyek */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            {/* Total Project */}
                            {/* PERUBAHAN: Menambahkan border-blue-200 */}
                            <div className="bg-white border border-blue-200 rounded-lg p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Project</p>
                                        <p className="text-3xl font-bold text-gray-800">28</p>
                                    </div>
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Archive className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                            </div>
                            {/* Open Project */}
                            {/* PERUBAHAN: Menambahkan border-orange-200 */}
                            <div className="bg-white border border-orange-200 rounded-lg p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500">Open Project</p>
                                        <p className="text-3xl font-bold text-gray-800">8</p>
                                    </div>
                                    <div className="bg-orange-100 p-3 rounded-full">
                                        <FolderOpen className="w-6 h-6 text-orange-600" />
                                    </div>
                                </div>
                            </div>
                            {/* Progress Project */}
                            {/* PERUBAHAN: Menambahkan border-indigo-200 */}
                            <div className="bg-white border border-indigo-200 rounded-lg p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500">Progress Project</p>
                                        <p className="text-3xl font-bold text-gray-800">16</p>
                                    </div>
                                    <div className="bg-indigo-100 p-3 rounded-full">
                                        <Loader className="w-6 h-6 text-indigo-600" />
                                    </div>
                                </div>
                            </div>
                            {/* Closed Project */}
                            {/* PERUBAHAN: Menambahkan border-green-200 */}
                            <div className="bg-white border border-green-200 rounded-lg p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm text-gray-500">Closed Project</p>
                                        <p className="text-3xl font-bold text-gray-800">4</p>
                                    </div>
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <FolderCheck className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Baris 3: Summary of Project & Employee Jobs Summary (BARU) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            {/* Kartu Summary of Project 2025 --> */}
                            <div className="bg-white border rounded-lg p-6">
                                <div className="flex items-center space-x-2 mb-4">
                                    <BarChartHorizontal className="w-5 h-5 text-gray-700" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Summary of Project 2025</h3>
                                        <p className="text-sm text-gray-500">Summary of project</p>
                                    </div>
                                </div>
                                {/* Bar Chart Sederhana */}
                                <div className="space-y-4 pt-2 pr-4">
                                    <div className="flex items-center">
                                        <span className="w-16 text-sm text-gray-500">Critical</span>
                                        <div className="flex-1 h-5 bg-gray-200 rounded-r-full"></div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-16 text-sm text-gray-500">High</span>
                                        <div className="flex-1 h-5 bg-pink-500 rounded-r-full" style={{ width: '40%' }}></div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-16 text-sm text-gray-500">Medium</span>
                                        <div className="flex-1 h-5 bg-yellow-400 rounded-r-full" style={{ width: '100%' }}></div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-16 text-sm text-gray-500">Low</span>
                                        <div className="flex-1 h-5 bg-teal-500 rounded-r-full" style={{ width: '25%' }}></div>
                                    </div>
                                </div>
                                <div className="text-center mt-4">
                                    <span className="text-sm font-medium text-gray-700">Project Summary</span>
                                </div>
                            </div>

                            {/* Kartu Employee Jobs Summary 2025 --> */}
                            <div className="bg-white border rounded-lg p-6">
                                <div className="flex items-center space-x-2 mb-4">
                                    <ClipboardList className="w-5 h-5 text-gray-700" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Employee Jobs Summary 2025</h3>
                                        <p className="text-sm text-gray-500">The following is a total recap of employee jobs</p>
                                    </div>
                                </div>
                                
                                <div className="flex justify-between items-end mb-2">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Jobs</p>
                                        <p className="text-3xl font-bold text-gray-800">394</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Completion Rate</p>
                                        <p className="text-3xl font-bold text-green-600">76%</p>
                                    </div>
                                </div>

                                {/* Multi Progress Bar */}
                                <div className="flex h-2 rounded-full overflow-hidden bg-gray-200 mb-6">
                                    <div style={{ width: '19%' }} className="bg-orange-500" title="Open 19%"></div>
                                    <div style={{ width: '4%' }} className="bg-blue-500" title="Progress 4%"></div>
                                    <div style={{ width: '1%' }} className="bg-purple-500" title="Review 1%"></div>
                                    <div style={{ width: '76%' }} className="bg-green-500" title="Closed 76%"></div>
                                </div>

                                {/* Sub-Statistik */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div className="border border-orange-200 bg-orange-50 rounded-lg p-3 text-center">
                                        <p className="text-sm text-orange-700">Open</p>
                                        <p className="text-xl font-bold text-orange-900">75</p>
                                        <p className="text-xs text-gray-500">19% of total</p>
                                    </div>
                                    <div className="border border-blue-200 bg-blue-50 rounded-lg p-3 text-center">
                                        <p className="text-sm text-blue-700">Progress</p>
                                        <p className="text-xl font-bold text-blue-900">14</p>
                                        <p className="text-xs text-gray-500">4% of total</p>
                                    </div>
                                    <div className="border border-purple-200 bg-purple-50 rounded-lg p-3 text-center">
                                        <p className="text-sm text-purple-700">Review</p>
                                        <p className="text-xl font-bold text-purple-900">5</p>
                                        <p className="text-xs text-gray-500">1% of total</p>
                                    </div>
                                    <div className="border border-green-200 bg-green-50 rounded-lg p-3 text-center">
                                        <p className="text-sm text-green-700">Closed</p>
                                        <p className="text-xl font-bold text-green-900">300</p>
                                        <p className="text-xs text-gray-500">76% of total</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Baris 4: All Data Project & Employee Performance (Sesuai Gambar Baru) --> */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            
                            {/* Kartu All Data Project 2025 --> */}
                            <div className="bg-white border rounded-lg p-6">
                                <div className="flex items-center space-x-2 mb-4">
                                    <List className="w-5 h-5 text-gray-700" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">All Data Project 2025</h3>
                                        <p className="text-sm text-gray-500">Summary project of the year</p>
                                    </div>
                                </div>
                                
                                {/* Daftar Proyek */}
                                <div className="space-y-3">
                                    {/* Item Proyek 1 */}
                                    <a href="#" className={`flex items-start p-3 -mx-3 rounded-lg hover:bg-gray-50 ${ringStyles}`}>
                                        <div className="w-1 h-10 bg-yellow-400 rounded-full mr-3 mt-1"></div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-gray-800">Rutin Digitalisa...</span>
                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                                                <CalendarDays className="w-4 h-4" />
                                                <span>01 Jan - 31 Dec</span>
                                                <span className="text-yellow-600 font-medium">Medium</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm mt-1">
                                                <span className="text-gray-500">Progress</span>
                                                <div className="w-full bg-gray-200 rounded-full h-1.5 flex-1">
                                                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '93.37%' }}></div>
                                                </div>
                                                <span className="font-medium text-gray-700">93.37%</span>
                                            </div>
                                        </div>
                                    </a>
                                    
                                    {/* Item Proyek 2 */}
                                    <a href="#" className={`flex items-start p-3 -mx-3 rounded-lg hover:bg-gray-50 ${ringStyles}`}>
                                        <div className="w-1 h-10 bg-yellow-400 rounded-full mr-3 mt-1"></div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-gray-800">Pentest (RKAP...</span>
                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                                                <CalendarDays className="w-4 h-4" />
                                                <span>04 Aug - 10 Oct</span>
                                                <span className="text-yellow-600 font-medium">Medium</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm mt-1">
                                                <span className="text-gray-500">Progress</span>
                                                <div className="w-full bg-gray-200 rounded-full h-1.5 flex-1">
                                                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                                                </div>
                                                <span className="font-medium text-gray-700">100%</span>
                                            </div>
                                        </div>
                                    </a>

                                    {/* Item Proyek 3 (Contoh Tambahan) */}
                                    <a href="#" className={`flex items-start p-3 -mx-3 rounded-lg hover:bg-gray-50 ${ringStyles}`}>
                                        <div className="w-1 h-10 bg-red-500 rounded-full mr-3 mt-1"></div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-gray-800">Pemeliharaan...</span>
                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                                                <CalendarDays className="w-4 h-4" />
                                                <span>15 Jul - 20 Jul</span>
                                                <span className="text-red-600 font-medium">Critical</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm mt-1">
                                                <span className="text-gray-500">Progress</span>
                                                <div className="w-full bg-gray-200 rounded-full h-1.5 flex-1">
                                                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                                                </div>
                                                <span className="font-medium text-gray-700">100%</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            
                            {/* Kartu Employee Performance 2025 --> */}
                            <div className="bg-white border rounded-lg p-6">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Users className="w-5 h-5 text-gray-700" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Employee Performance 2025</h3>
                                        <p className="text-sm text-gray-500">Individual job completion status by employee</p>
                                    </div>
                                </div>
                                
                                {/* Daftar Karyawan */}
                                <div className="space-y-4">
                                    {/* Item Karyawan 1 */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            {/* PERBAIKAN: Menggunakan <img> standar */}
                                            <img className="w-10 h-10 rounded-full" src="https://placehold.co/40x40/FF5252/FFFFFF?text=AR" alt="Arnandha Rifkiano" width={40} height={40} />
                                            <div>
                                                <p className="font-medium text-gray-800">Arnandha Rifkiano</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-800">0</p>
                                            <p className="text-xs text-gray-500">Total Jobs</p>
                                        </div>
                                    </div>
                                    
                                    {/* Item Karyawan 2 */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            {/* PERBAIKAN: Menggunakan <img> standar */}
                                            <img className="w-10 h-10 rounded-full" src="https://placehold.co/40x40/C0C0C0/000000?text=AW" alt="Aditya Okta Wibowo" width={40} height={40} />
                                            <div>
                                                <p className="font-medium text-gray-800">Aditya Okta Wibowo</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-800">0</p>
                                            <p className="text-xs text-gray-500">Total Jobs</p>
                                        </div>
                                    </div>
                                    
                                    {/* Item Karyawan 3 */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            {/* PERBAIKAN: Menggunakan <img> standar */}
                                            <img className="w-10 h-10 rounded-full" src="https://placehold.co/40x40/333333/FFFFFF?text=CF" alt="Candra Firmansyah" width={40} height={40} />
                                            <div>
                                                <p className="font-medium text-gray-800">Candra Firmansyah</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-800">0</p>
                                            <p className="text-xs text-gray-500">Total Jobs</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </main>
                    {/* ===== Akhir Area Konten ===== --> */}
                </div>
                {/* ===== Akhir Konten Utama ===== --> */}
            </div>

            {/* ===== Render Sidebar Todo List ===== */}
            <TodoSidebar 
                isOpen={isTodoSidebarOpen} 
                onClose={() => setIsTodoSidebarOpen(false)} 
                selectedDate={todoSelectedDate}
                setSelectedDate={setTodoSelectedDate}
                currentDateString={todoDateString}
                onOpenModal={() => setIsTodoModalOpen(true)} // Hubungkan ke state modal
            />

            {/* ===== Render Modal Tambah Todo ===== */}
            <AddTodoModal 
                isOpen={isTodoModalOpen} 
                onClose={() => setIsTodoModalOpen(false)} 
            />
            {/* ===== Login success modal (if any) ===== */}
            {showSuccess && (
                <LoginSuccessModal name={successName} onClose={() => setShowSuccess(false)} />
            )}
        </>
    );
};

export default AdminDashboardPage;

