import React, { useState, useEffect, useRef } from 'react';
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
    FileSignature, // Ikon baru untuk logo
    Settings, // Ikon untuk 'Information'
    Clipboard, // Ikon untuk 'Notes'
    Users2, // Ikon untuk 'PIC Project'
    CircleDot, // Ikon untuk Change Status
    Edit2, // Ikon untuk Update
    Eye, // Ikon untuk Detail
    Trash2, // Ikon untuk Delete
    ChevronsUpDown, // Ikon untuk combobox
    Info, // Baru untuk modal detail
    Clock, // Baru untuk durasi
    AlertTriangle // Baru untuk modal delete
} from 'lucide-react';

// --- Data Mock untuk Todo List ---
const todoItems = [
    {
        id: 1,
        title: "Update UI UX",
        date: "29 Sep - 31 Oct",
        category: "Project",
        status: "Progress",
        color: "blue" as const,
        notes: "Selesaikan desain high-fidelity untuk halaman login dan dashboard.",
        pic: { name: 'Riza Ilhamsyah', avatar: 'https://placehold.co/40x40/E0F2FE/0891B2?text=RI', npp: '12231149' }
    },
    {
        id: 2,
        title: "Pembuatan API...",
        date: "01 Oct - 31 Oct",
        category: "Project",
        status: "Progress",
        color: "blue" as const,
        notes: "Endpoint untuk CRUD user dan project.",
        pic: { name: 'Tono Sartono', avatar: 'https://placehold.co/40x40/E2E8F0/4A5568?text=TS', npp: '12231150' }
    },
    {
        id: 3,
        title: "Integrasi Front End...",
        date: "07 Oct - 31 Oct",
        category: "Project",
        status: "Progress",
        color: "blue" as const,
        notes: "Sambungkan API user ke halaman profil.",
        pic: { name: 'Asep Saepul Pahmit', avatar: 'https://placehold.co/40x40/CBD5E0/4A5568?text=AP', npp: '12231151' }
    },
    {
        id: 4,
        title: "Modul Consumable",
        date: "15 Sep - 31 Oct",
        category: "Project",
        status: "Review",
        color: "purple" as const,
        notes: "Review kode untuk modul consumable.",
        pic: { name: 'Riza Ilhamsyah', avatar: 'https://placehold.co/40x40/E0F2FE/0891B2?text=RI', npp: '12231149' }
    },
    {
        id: 5,
        title: "Deployment",
        date: "01 Nov - 05 Nov",
        category: "Project",
        status: "Closed",
        color: "green" as const,
        notes: "Deploy ke server production.",
        pic: { name: 'Tono Sartono', avatar: 'https://placehold.co/40x40/E2E8F0/4A5568?text=TS', npp: '12231150' }
    },
    {
        id: 6,
        title: "Pembuatan Report dan Dashboard",
        date: "03 Nov - 10 Nov",
        category: "Project",
        status: "Open",
        color: "orange" as const,
        notes: "Pembuatan Front End, Report dan Dashboard",
        pic: { name: 'Riza Ilhamsyah', avatar: 'https://placehold.co/40x40/E0F2FE/0891B2?text=RI', npp: '12231149' }
    },
];
// Tipe data Todo
type TodoItem = typeof todoItems[0];
// Tipe data PIC
type PIC = typeof todoItems[0]['pic'];


// --- Data Mock untuk PIC ---
const picOptions: PIC[] = [
    { name: 'Riza Ilhamsyah', avatar: 'https://placehold.co/40x40/E0F2FE/0891B2?text=RI', npp: '12231149' },
    { name: 'Tono Sartono', avatar: 'https://placehold.co/40x40/E2E8F0/4A5568?text=TS', npp: '12231150' },
    { name: 'Asep Saepul Pahmit', avatar: 'https://placehold.co/40x40/CBD5E0/4A5568?text=AP', npp: '12231151' },
    { name: 'Aditya Okta Wibowo', avatar: 'https://placehold.co/40x40/C0C0C0/000000?text=AW', npp: '12231152' },
    { name: 'Candra Firmansyah', avatar: 'https://placehold.co/40x40/333333/FFFFFF?text=CF', npp: '12231153' }
];


// --- Data Mock untuk All Data Project ---
const allProjectsData = [
    {
        id: 'p1',
        title: 'SPIRIT',
        priority: 'High',
        priorityColor: 'red',
        date: '01 Jan 2025 - 31 Dec 2025',
        stream: 'Others',
        notes: 'Pengembangan fitur sesuai agenda 2025',
        progress: 93.37,
        progressColor: 'blue-600',
        pics: [
            { name: 'Tono Sartono', avatar: 'https://placehold.co/40x40/E2E8F0/4A5568?text=TS' },
            { name: 'Asep Saepul Pahmit', avatar: 'https://placehold.co/40x40/CBD5E0/4A5568?text=AP' }
        ]
    },
    {
        id: 'p2',
        title: 'Pentest (RKAP...)',
        priority: 'Medium',
        priorityColor: 'yellow',
        date: '04 Aug - 10 Oct',
        stream: 'Security',
        notes: 'Testing keamanan aplikasi.',
        progress: 100,
        progressColor: 'green-500',
        pics: [
            { name: 'Aditya Okta Wibowo', avatar: 'https://placehold.co/40x40/C0C0C0/000000?text=AW' }
        ]
    },
    {
        id: 'p3',
        title: 'Pemeliharaan...',
        priority: 'Critical',
        priorityColor: 'red',
        date: '15 Jul - 20 Jul',
        stream: 'Maintenance',
        notes: 'Perbaikan server mendadak.',
        progress: 100,
        progressColor: 'green-500',
        pics: [
            { name: 'Candra Firmansyah', avatar: 'https://placehold.co/40x40/333333/FFFFFF?text=CF' }
        ]
    }
];
// Tipe data Project
type ProjectData = typeof allProjectsData[0];


// --- Komponen Status Badge untuk Todo List ---
type StatusBadgeProps = {
    status: string;
    color: "blue" | "purple" | "green" | "orange";
};
const StatusBadge = ({ status, color }: StatusBadgeProps) => {
    const colors = {
        blue: "bg-blue-100 text-blue-800",
        purple: "bg-purple-100 text-purple-800",
        green: "bg-green-100 text-green-800",
        orange: "bg-orange-100 text-orange-800"
    };
    const dotColors = {
        blue: "bg-blue-500",
        purple: "bg-purple-500",
        green: "bg-green-500",
        orange: "bg-orange-500"
    };
    const colorKey = color as keyof typeof colors;

    return (
        <span className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[colorKey] || 'bg-gray-100 text-gray-800'}`}>
            <span className={`w-2 h-2 mr-1.5 rounded-full ${dotColors[colorKey] || 'bg-gray-500'}`}></span>
            {status}
        </span>
    );
};

// --- Helper Functions untuk Tanggal ---
const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
};

const getDisplayDates = (centerDate: Date) => {
    const dates = [];
    for (let i = -2; i <= 2; i++) {
        const date = new Date(centerDate);
        date.setDate(date.getDate() + i);
        dates.push(date);
    }
    return dates;
};

// Format tanggal (misal: "October 31, 2025")
const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
};

// --- Opsi Status Global ---
const statusOptions = [
    { name: 'Open', color: 'bg-orange-500', text: 'text-orange-700', bg: 'bg-orange-100' },
    { name: 'Progress', color: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-100' },
    { name: 'Review', color: 'bg-purple-500', text: 'text-purple-700', bg: 'bg-purple-100' },
    { name: 'Closed', color: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-100' }
];
// Tipe untuk status
type StatusName = "Open" | "Progress" | "Review" | "Closed" | "All Status";


// --- Komponen Calendar Popup ---
type CalendarPopupProps = {
    onSelectDate: (date: Date) => void;
    onClose: () => void;
    selectedDate: Date | null;
    displayDate: Date;
    setDisplayDate: React.Dispatch<React.SetStateAction<Date>>;
};

const CalendarPopup = ({ onSelectDate, onClose, selectedDate, displayDate, setDisplayDate }: CalendarPopupProps) => {
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];
        const startDayOfWeek = firstDay.getDay();
        for (let i = 0; i < startDayOfWeek; i++) {
            const prevMonthDay = new Date(firstDay);
            prevMonthDay.setDate(prevMonthDay.getDate() - (startDayOfWeek - i));
            days.push({ date: prevMonthDay, isCurrentMonth: false });
        }
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push({ date: new Date(year, month, i), isCurrentMonth: true });
        }
        const totalDays = days.length;
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
    
    const highlightDateRef = new Date(2025, 9, 30); // 30 Okt 2025

    return (
        <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-10 w-80" onClick={(e) => e.stopPropagation()}>
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
            
            <div className="grid grid-cols-7 gap-1">
                {daysOfWeek.map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 h-8 w-8 flex items-center justify-center">{day}</div>
                ))}
                
                {days.map(({ date, isCurrentMonth }, index) => {
                    const isSelected = selectedDate && isSameDay(date, selectedDate);
                    const isImageHighlight = !selectedDate && isCurrentMonth && isSameDay(date, highlightDateRef);
                    const key = date.toISOString() + index;
                    
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

// --- Komponen Modal Tambah Todo ---
type AddTodoModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const AddTodoModal = ({ isOpen, onClose }: AddTodoModalProps) => {
    const initialDate = new Date(2025, 9, 30);
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(initialDate);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
    const [openCalendar, setOpenCalendar] = useState<'start' | 'end' | null>(null);
    const [calendarDisplayDate, setCalendarDisplayDate] = useState(initialDate);
    const modalRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) {
            setOpenCalendar(null);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!openCalendar) return;
        const handleDocClick = () => setOpenCalendar(null);
        const timer = setTimeout(() => document.addEventListener('mousedown', handleDocClick), 50);
        return () => {
            clearTimeout(timer);
            document.removeEventListener('mousedown', handleDocClick);
        };
    }, [openCalendar]);

    if (!isOpen) return null;

    const handleModalContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const toggleCalendar = (type: 'start' | 'end') => {
        if (openCalendar === type) {
            setOpenCalendar(null);
        } else {
            const dateToView = (type === 'start' ? selectedStartDate : selectedEndDate) || initialDate;
            setCalendarDisplayDate(dateToView);
            setOpenCalendar(type);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                ref={modalRef}
                className="bg-white rounded-lg shadow-xl w-full max-w-lg transition-transform duration-300 transform scale-95 opacity-0 animate-modal-scale-in"
                onClick={handleModalContentClick}
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
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
                        <div className="relative">
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <button
                                type="button"
                                id="startDate"
                                onClick={(e) => { e.stopPropagation(); toggleCalendar('start'); }}
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
                                    onSelectDate={(date) => { setSelectedStartDate(date); setOpenCalendar(null); }}
                                    onClose={() => setOpenCalendar(null)}
                                    displayDate={calendarDisplayDate}
                                    setDisplayDate={setCalendarDisplayDate}
                                />
                            )}
                        </div>
                        <div className="relative">
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <button
                                type="button"
                                id="endDate"
                                onClick={(e) => { e.stopPropagation(); toggleCalendar('end'); }}
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
                                    onSelectDate={(date) => { setSelectedEndDate(date); setOpenCalendar(null); }}
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
                <div className="flex justify-end p-5 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Komponen Modal Detail Proyek ---
type ProjectDetailModalProps = {
    isOpen: boolean;
    onClose: () => void;
    project: ProjectData | null;
};

const ProjectDetailModal = ({ isOpen, onClose, project }: ProjectDetailModalProps) => {
    const modalRef = React.useRef<HTMLDivElement>(null);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };
    
    const getPriorityClasses = (priority: string) => {
        switch (priority.toLowerCase()) {
            case 'high':
            case 'critical':
                return 'bg-pink-100 text-pink-700 border border-pink-200';
            case 'medium':
                return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
            case 'low':
                return 'bg-teal-100 text-teal-700 border border-teal-200';
            default:
                return 'bg-gray-100 text-gray-700 border border-gray-200';
        }
    };

    if (!isOpen || !project) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={handleBackdropClick}
        >
            <div 
                ref={modalRef}
                className="bg-white rounded-lg shadow-xl w-full max-w-2xl transition-transform duration-300 transform scale-95 opacity-0 animate-modal-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Detail Project</h3>
                        <p className="text-sm text-gray-500">Detailed information about the project.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    <div className="flex justify-between items-start">
                        <h2 className="text-3xl font-bold text-gray-900">{project.title}</h2>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityClasses(project.priority)}`}>
                            {project.priority}
                        </span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Settings className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            <h4 className="text-lg font-semibold text-gray-800">Information</h4>
                        </div>
                        <div className="pl-8 space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-500 flex items-center"><CalendarDays className="w-4 h-4 mr-2"/>Period</span>
                                <span className="text-sm font-medium text-gray-800">{project.date}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-500 flex items-center"><Users className="w-4 h-4 mr-2"/>Stream</span>
                                <span className="text-sm font-medium text-gray-800">{project.stream}</span>
                            </div>
                        </div>
                    </div>
                    <hr className="border-gray-200" /> 
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Clipboard className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            <h4 className="text-lg font-semibold text-gray-800">Notes</h4>
                        </div>
                        <div className="pl-8">
                            <p className="text-sm text-gray-700 bg-white border border-gray-200 rounded-lg p-4">
                                {project.notes}
                            </p>
                        </div>
                    </div>
                    <hr className="border-gray-200" /> 
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Users2 className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            <h4 className="text-lg font-semibold text-gray-800">PIC Project</h4>
                        </div>
                        <div className="pl-8 grid grid-cols-1 md:grid-cols-2 gap-3">
                            {project.pics.map(pic => (
                                <div key={pic.name} className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg p-3">
                                    <img className="w-10 h-10 rounded-full" src={pic.avatar} alt={pic.name} width={40} height={40} />
                                    <span className="text-sm font-medium text-gray-800">{pic.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Komponen Modal Ganti Status ---
type ChangeStatusModalProps = {
    isOpen: boolean;
    onClose: () => void;
    item: TodoItem | null;
};

const ChangeStatusModal = ({ isOpen, onClose, item }: ChangeStatusModalProps) => {
    const modalRef = React.useRef<HTMLDivElement>(null);
    const [selectedStatus, setSelectedStatus] = useState(item?.status || 'Open');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (item) {
            setSelectedStatus(item.status);
        }
    }, [item]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };
    
    useEffect(() => {
        if (!isDropdownOpen) return;
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isDropdownOpen]);

    if (!isOpen || !item) return null;
    
    const currentStatusData = statusOptions.find(opt => opt.name === selectedStatus) || statusOptions[0];

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={handleBackdropClick}
        >
            <div 
                ref={modalRef}
                className="bg-white rounded-lg shadow-xl w-full max-w-md transition-transform duration-300 transform scale-95 opacity-0 animate-modal-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Change Job Status</h3>
                        <p className="text-sm text-gray-500">Update the status for this job.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Title</label>
                        <div className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-700">
                            {item.title}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-lg px-4 py-3 text-left text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <span className="flex items-center">
                                    <span className={`w-3 h-3 rounded-full mr-2.5 ${currentStatusData.color}`}></span>
                                    {selectedStatus}
                                </span>
                                <ChevronsUpDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-1">
                                    {statusOptions.map(opt => (
                                        <button
                                            key={opt.name}
                                            onClick={() => {
                                                setSelectedStatus(opt.name as StatusName);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="w-full flex items-center text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                        >
                                            <span className={`w-3 h-3 rounded-full mr-2.5 ${opt.color}`}></span>
                                            {opt.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end p-5 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                    <button 
                        onClick={onClose}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Komponen Modal Edit Job ---
type EditJobModalProps = {
    isOpen: boolean;
    onClose: () => void;
    item: TodoItem | null;
};

const EditJobModal = ({ isOpen, onClose, item }: EditJobModalProps) => {
    const modalRef = React.useRef<HTMLDivElement>(null);
    const [jobTitle, setJobTitle] = useState(item?.title || '');
    const [notes, setNotes] = useState(item?.notes || '');
    const [selectedPic, setSelectedPic] = useState<PIC | null>(item?.pic || null);
    const [isPicDropdownOpen, setIsPicDropdownOpen] = useState(false);
    const picDropdownRef = useRef<HTMLDivElement>(null);

    // Placeholder tanggal dari gambar
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(new Date(2025, 9, 31)); // 31 Okt 2025
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(new Date(2025, 10, 30)); // 30 Nov 2025
    const [openCalendar, setOpenCalendar] = useState<'start' | 'end' | null>(null);
    const [calendarDisplayDate, setCalendarDisplayDate] = useState(new Date(2025, 9, 31));

    useEffect(() => {
        if (item) {
            setJobTitle(item.title);
            setNotes(item.notes || '');
            setSelectedPic(item.pic || null);
            // Di aplikasi nyata, Anda akan mengurai item.date untuk mengatur start/end date
            // Untuk demo ini, kita biarkan placeholder
        }
    }, [item]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        if (!isPicDropdownOpen) return;
        function handleClickOutside(event: MouseEvent) {
            if (picDropdownRef.current && !picDropdownRef.current.contains(event.target as Node)) {
                setIsPicDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isPicDropdownOpen]);

    useEffect(() => {
        if (!openCalendar) return;
        const handleDocClick = () => setOpenCalendar(null);
        const timer = setTimeout(() => document.addEventListener('mousedown', handleDocClick), 50);
        return () => {
            clearTimeout(timer);
            document.removeEventListener('mousedown', handleDocClick);
        };
    }, [openCalendar]);

    const toggleCalendar = (type: 'start' | 'end') => {
        if (openCalendar === type) {
            setOpenCalendar(null);
        } else {
            const dateToView = (type === 'start' ? selectedStartDate : selectedEndDate) || new Date(2025, 9, 31);
            setCalendarDisplayDate(dateToView);
            setOpenCalendar(type);
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={handleBackdropClick}
        >
            <div 
                ref={modalRef}
                className="bg-white rounded-lg shadow-xl w-full max-w-xl transition-transform duration-300 transform scale-95 opacity-0 animate-modal-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Edit Jobs</h3>
                        <p className="text-sm text-gray-500">Update the job information below.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                    <div>
                        <label htmlFor="editJobTitle" className="block text-sm font-medium text-gray-700 mb-1.5">Job Project</label>
                        <input
                            type="text"
                            id="editJobTitle"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                            placeholder="Pembuatan Report dan Dashboard"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <label htmlFor="editStartDate" className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
                            <button
                                type="button"
                                id="editStartDate"
                                onClick={(e) => { e.stopPropagation(); toggleCalendar('start'); }}
                                className="w-full bg-white border border-gray-300 rounded-lg shadow-sm pl-4 pr-10 py-3 text-left focus:border-green-500 focus:ring-1 focus:ring-green-500 text-sm flex justify-between items-center"
                            >
                                <span className={!selectedStartDate ? "text-gray-400" : "text-gray-900"}>
                                    {selectedStartDate ? formatDate(selectedStartDate) : "Select start date"}
                                </span>
                                <CalendarDays className="w-5 h-5 text-gray-400" />
                            </button>
                            {openCalendar === 'start' && (
                                <CalendarPopup
                                    selectedDate={selectedStartDate}
                                    onSelectDate={(date) => { setSelectedStartDate(date); setOpenCalendar(null); }}
                                    onClose={() => setOpenCalendar(null)}
                                    displayDate={calendarDisplayDate}
                                    setDisplayDate={setCalendarDisplayDate}
                                />
                            )}
                        </div>
                        <div className="relative">
                            <label htmlFor="editEndDate" className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
                            <button
                                type="button"
                                id="editEndDate"
                                onClick={(e) => { e.stopPropagation(); toggleCalendar('end'); }}
                                className="w-full bg-white border border-gray-300 rounded-lg shadow-sm pl-4 pr-10 py-3 text-left focus:border-green-500 focus:ring-1 focus:ring-green-500 text-sm flex justify-between items-center"
                            >
                                <span className={!selectedEndDate ? "text-gray-400" : "text-gray-900"}>
                                    {selectedEndDate ? formatDate(selectedEndDate) : "Select end date"}
                                </span>
                                <CalendarDays className="w-5 h-5 text-gray-400" />
                            </button>
                            {openCalendar === 'end' && (
                                <CalendarPopup
                                    selectedDate={selectedEndDate}
                                    onSelectDate={(date) => { setSelectedEndDate(date); setOpenCalendar(null); }}
                                    onClose={() => setOpenCalendar(null)}
                                    displayDate={calendarDisplayDate}
                                    setDisplayDate={setCalendarDisplayDate}
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">PIC</label>
                        <div className="relative" ref={picDropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsPicDropdownOpen(!isPicDropdownOpen)}
                                className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-left text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                {selectedPic ? (
                                    <span className="flex items-center">
                                        <img className="w-8 h-8 rounded-full mr-3" src={selectedPic.avatar} alt={selectedPic.name} />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{selectedPic.name}</p>
                                            <p className="text-xs text-gray-500">{selectedPic.npp}</p>
                                        </div>
                                    </span>
                                ) : (
                                    <span className="text-sm text-gray-500">Select PIC</span>
                                )}
                                <ChevronsUpDown className={`w-5 h-5 text-gray-400 transition-transform ${isPicDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isPicDropdownOpen && (
                                <div className="absolute top-full mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-1">
                                    {picOptions.map(pic => (
                                        <button
                                            key={pic.npp}
                                            onClick={() => { setSelectedPic(pic); setIsPicDropdownOpen(false); }}
                                            className="w-full flex items-center text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                        >
                                            <img className="w-8 h-8 rounded-full mr-3" src={pic.avatar} alt={pic.name} />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{pic.name}</p>
                                                <p className="text-xs text-gray-500">{pic.npp}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="editNotes" className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
                        <textarea
                            id="editNotes"
                            rows={4}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                            placeholder="Pembuatan Front End, Report dan Dashboard"
                        ></textarea>
                    </div>
                </div>
                <div className="flex justify-end p-5 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                    <button 
                        onClick={onClose}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Komponen Modal Detail Job (Diperbarui) ---
type TodoDetailModalProps = {
    isOpen: boolean;
    onClose: () => void;
    item: TodoItem | null;
    onOpenUpdate: (item: TodoItem) => void; // Prop untuk membuka modal update
};

const TodoDetailModal = ({ isOpen, onClose, item, onOpenUpdate }: TodoDetailModalProps) => {
    const modalRef = React.useRef<HTMLDivElement>(null);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!isOpen || !item) return null;
    
    // Placeholder data based on the new image
    const startDate = new Date(2025, 10, 3); // 03 Nov 2025
    const endDate = new Date(2025, 10, 14); // 14 Nov 2025
    const duration = "11 days"; // Placeholder
    const status = item.status || "Open";
    const statusColor = statusOptions.find(s => s.name === status) || statusOptions[0];

    const handleUpdateClick = () => {
        onClose(); // Tutup modal detail
        onOpenUpdate(item); // Buka modal update
    };

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={handleBackdropClick}
        >
            <div 
                ref={modalRef}
                className="bg-white rounded-lg shadow-xl w-full max-w-2xl transition-transform duration-300 transform scale-95 opacity-0 animate-modal-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Detail Job</h3>
                        <p className="text-sm text-gray-500">Detailed job project information.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Modal Body */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    {/* Title and Status */}
                    <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                            <Info className="w-7 h-7 text-yellow-600" />
                            <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor.bg.replace('bg-', 'border-').replace('-100', '-200')} ${statusColor.text} ${statusColor.bg} border`}>
                            {status}
                        </span>
                    </div>

                    {/* Info Banner */}
                    <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 flex items-center space-x-3">
                        <Info className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">This job is <strong>{duration} remaining</strong>. Please take immediate action to complete the remaining job.</p>
                    </div>

                    {/* PIC, Period, Duration */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* PIC */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-2 flex items-center"><Users2 className="w-4 h-4 mr-2"/> PIC</label>
                            <div className="w-full flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2.5">
                                {item.pic ? (
                                    <>
                                        <img className="w-8 h-8 rounded-full mr-3" src={item.pic.avatar} alt={item.pic.name} />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{item.pic.name}</p>
                                        </div>
                                    </>
                                ) : (
                                    <span className="text-sm text-gray-500">No PIC assigned</span>
                                )}
                            </div>
                        </div>
                        {/* Period */}
                        <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-gray-500 mb-2 flex items-center">
                                <CalendarDays className="w-4 h-4 mr-2"/> Period
                                <span className="ml-auto font-normal flex items-center"><Clock className="w-4 h-4 mr-1.5"/> Duration : {duration}</span>
                             </label>
                             <div className="w-full grid grid-cols-2 gap-3">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center flex items-center justify-center space-x-2">
                                    <CalendarDays className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-medium text-blue-600">START DATE</p>
                                        <p className="text-base font-bold text-gray-800">{formatDate(startDate)}</p>
                                    </div>
                                </div>
                                 <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center flex items-center justify-center space-x-2">
                                    <CalendarDays className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-medium text-green-600">END DATE</p>
                                        <p className="text-base font-bold text-gray-800">{formatDate(endDate)}</p>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                    
                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2 flex items-center"><Clipboard className="w-4 h-4 mr-2"/> Notes</label>
                        <div className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-700 text-sm min-h-[100px]">
                            {item.notes}
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end p-5 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                    <button 
                        onClick={handleUpdateClick}
                        className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    >
                        <Edit2 className="w-4 h-4" />
                        <span>Update</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Komponen Modal Konfirmasi Delete (BARU) ---
type DeleteConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }: DeleteConfirmationModalProps) => {
    const modalRef = React.useRef<HTMLDivElement>(null);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={handleBackdropClick}
        >
            <div 
                ref={modalRef}
                className="bg-white rounded-lg shadow-xl w-full max-w-sm transition-transform duration-300 transform scale-95 opacity-0 animate-modal-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Body */}
                <div className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Hapus Data</h3>
                    <p className="text-sm text-gray-500 mb-6">
                        Yakin anda akan menghapus data ini?
                    </p>

                    {/* Tombol Aksi */}
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            onClick={onClose}
                            className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                        >
                            Tidak
                        </button>
                        <button 
                            onClick={onConfirm}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Iya
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Komponen Sidebar Todo List ---
type TodoSidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedDate: Date;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
    currentDateString: string;
    onOpenModal: () => void;
    onOpenChangeStatus: (item: TodoItem) => void;
    onOpenUpdate: (item: TodoItem) => void;
    onOpenDetail: (item: TodoItem) => void;
    onOpenDelete: (item: TodoItem) => void; // Prop baru
};
const TodoSidebar = ({ 
    isOpen, 
    onClose, 
    selectedDate, 
    setSelectedDate, 
    currentDateString, 
    onOpenModal,
    onOpenChangeStatus,
    onOpenUpdate,
    onOpenDetail,
    onOpenDelete // Menerima prop baru
}: TodoSidebarProps) => {
    
    const [displayCenterDate, setDisplayCenterDate] = useState(selectedDate);
    const [filterStatus, setFilterStatus] = useState<StatusName>('All Status');
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const statusDropdownRef = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Klik di luar dropdown status
    useEffect(() => {
        if (!isStatusOpen) return;
        function handleClickOutside(event: MouseEvent) {
            if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
                setIsStatusOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isStatusOpen]);

    // Klik di luar menu opsi
    useEffect(() => {
        if (!openMenuId) return;
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            const menuButton = document.getElementById(`menu-btn-${openMenuId}`);
            if (menuRef.current && !menuRef.current.contains(target) && (!menuButton || !menuButton.contains(target))) {
                setOpenMenuId(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openMenuId]);

    // Reset state saat sidebar dibuka
    useEffect(() => {
        if (isOpen) {
            setDisplayCenterDate(selectedDate);
            setFilterStatus('All Status');
            setSearchTerm('');
            setOpenMenuId(null);
        }
    }, [isOpen, selectedDate]);

    const moveDates = (amount: number) => {
        setDisplayCenterDate((prev: Date) => {
            const next = new Date(prev);
            next.setDate(next.getDate() + amount);
            return next;
        });
    };

    const displayDates = getDisplayDates(displayCenterDate);

    // Logika Filter Gabungan
    const filteredItems = todoItems.filter(item => {
        const statusMatch = (filterStatus === 'All Status') || (item.status === filterStatus);
        const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        return statusMatch && searchMatch;
    });

    const ringStyles = "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2";
    type ColorKey = "blue" | "purple" | "green" | "orange";

    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300" 
                    onClick={onClose}
                ></div>
            )}
            
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out flex flex-col ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Header Sidebar */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Todo List</h2>
                        <p className="text-sm text-gray-500">Here is your to-do list.</p>
                    </div>
                    <div className="flex items-center space-x-2">
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

                {/* Date Scroller */}
                <div className="p-4 border-b border-gray-200">
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
                                        onClick={() => setSelectedDate(date)}
                                        className={`text-center p-2 rounded-lg cursor-pointer min-w-[40px] transition-colors ${
                                            isSelected ? 'bg-green-600 text-white' : 'hover:bg-gray-100'
                                        } ${ringStyles}`}
                                        tabIndex={0}
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
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800">Todo List</h3>
                        <p className="text-sm font-medium text-gray-500">{currentDateString}</p>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center space-x-2">
                        <button className={`flex items-center justify-center p-2.5 h-10 w-10 border border-gray-300 rounded-md text-gray-600 bg-white hover:bg-gray-100 ${ringStyles}`}>
                            <Filter className="w-4 h-4" />
                        </button>
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search Jobs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full pl-10 pr-4 py-2 h-10 border border-gray-300 rounded-md text-sm bg-white placeholder:text-gray-500 ${ringStyles}`}
                            />
                        </div>
                        <div className="relative w-32" ref={statusDropdownRef}>
                            <button 
                                onClick={() => setIsStatusOpen(!isStatusOpen)}
                                className={`flex items-center justify-between w-full px-3 py-2 h-10 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-100 ${ringStyles}`}
                            >
                                <span>{filterStatus}</span>
                                <ChevronsUpDown className={`w-4 h-4 text-gray-500 transition-transform ${isStatusOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isStatusOpen && (
                                <div className="absolute top-full right-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 p-1">
                                    <button
                                        onClick={() => { setFilterStatus('All Status'); setIsStatusOpen(false); }}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex justify-between items-center"
                                    >
                                        All Status
                                    </button>
                                    {statusOptions.map(opt => (
                                        <button
                                            key={opt.name}
                                            onClick={() => { setFilterStatus(opt.name as StatusName); setIsStatusOpen(false); }}
                                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex justify-between items-center"
                                        >
                                            {opt.name}
                                            <span className={`w-3 h-3 rounded-full ${opt.color}`}></span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Data Header (Dinamis) */}
                    <div className="flex justify-between items-center pt-2">
                        <p className="text-sm font-medium text-gray-800">Total Data</p>
                        <p className="text-sm font-medium text-gray-600">{filteredItems.length} Data</p>
                    </div>

                    {/* Daftar Task (Dinamis) */}
                    <div className="space-y-3">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-start space-x-3">
                                    <div className={`w-1.5 h-10 rounded-full ${
                                        item.color === 'blue' ? 'bg-blue-500' :
                                        item.color === 'purple' ? 'bg-purple-500' :
                                        item.color === 'green' ? 'bg-green-500' : 'bg-orange-500'
                                    }`}></div>
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
                                    <div className="relative">
                                        <button 
                                            id={`menu-btn-${item.id}`}
                                            onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                                            className={`text-gray-400 hover:text-gray-600 p-1 rounded ${ringStyles}`}
                                        >
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                        
                                        {openMenuId === item.id && (
                                            <div ref={menuRef} className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-2">
                                                <button 
                                                    onClick={() => { onOpenChangeStatus(item); setOpenMenuId(null); }}
                                                    className="w-full flex justify-between items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                                >
                                                    Change Status
                                                    <CircleDot className="w-4 h-4 text-gray-500" />
                                                </button>
                                                <button 
                                                    onClick={() => { onOpenUpdate(item); setOpenMenuId(null); }}
                                                    className="w-full flex justify-between items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                                >
                                                    Update
                                                    <Edit2 className="w-4 h-4 text-gray-500" />
                                                </button>
                                                <button 
                                                    onClick={() => { onOpenDetail(item); setOpenMenuId(null); }}
                                                    className="w-full flex justify-between items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                                >
                                                    Detail
                                                    <Eye className="w-4 h-4 text-gray-500" />
                                                </button>
                                                <button 
                                                    onClick={() => { onOpenDelete(item); setOpenMenuId(null); }} // Hubungkan ke fungsi baru
                                                    className="w-full flex justify-between items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                                                >
                                                    Delete
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 text-center py-4">Data tidak ditemukan.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};


// Komponen Dashboard Utama
const App = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isMounted, setIsMounted] = useState(false);
    const [isTodoSidebarOpen, setIsTodoSidebarOpen] = useState(false);
    const [todoSelectedDate, setTodoSelectedDate] = useState(new Date());
    const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    
    const [tooltip, setTooltip] = useState({ visible: false, content: '', color: '', x: 0, y: 0 });
    const [jobTooltip, setJobTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });
    
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

    const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] = useState(false);
    const [selectedTodoItem, setSelectedTodoItem] = useState<TodoItem | null>(null);
    
    const [isEditJobModalOpen, setIsEditJobModalOpen] = useState(false);
    const [isTodoDetailModalOpen, setIsTodoDetailModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State baru
    
    // Fungsi untuk membuka modal detail proyek
    const handleProjectClick = (project: ProjectData) => {
        setSelectedProject(project);
        setIsProjectModalOpen(true);
    };
    
    // Fungsi untuk membuka modal ganti status todo
    const handleChangeStatusClick = (item: TodoItem) => {
        setSelectedTodoItem(item);
        setIsChangeStatusModalOpen(true);
    };

    // Fungsi untuk membuka modal update todo
    const handleUpdateClick = (item: TodoItem) => {
        setSelectedTodoItem(item);
        setIsEditJobModalOpen(true);
    };

    // Fungsi untuk membuka modal detail todo
    const handleDetailClick = (item: TodoItem) => {
        setSelectedTodoItem(item);
        setIsTodoDetailModalOpen(true);
    };
    
    // Fungsi untuk membuka modal delete todo (BARU)
    const handleDeleteClick = (item: TodoItem) => {
        setSelectedTodoItem(item);
        setIsDeleteModalOpen(true);
    };

    // Fungsi untuk konfirmasi delete (BARU)
    const confirmDelete = () => {
        console.log("Menghapus item:", selectedTodoItem?.id);
        // Di sini Anda akan menambahkan logika untuk menghapus item dari state/API
        setIsDeleteModalOpen(false);
        setSelectedTodoItem(null);
    };
    
    const summaryData = [
        { id: 'critical', label: 'Critical', value: 0, width: '0%', color: 'text-pink-600', barColor: 'bg-pink-500' },
        { id: 'high', label: 'High', value: 6, width: '40%', color: 'text-pink-600', barColor: 'bg-pink-500' },
        { id: 'medium', label: 'Medium', value: 16, width: '100%', color: 'text-yellow-600', barColor: 'bg-yellow-400' },
        { id: 'low', label: 'Low', value: 4, width: '25%', color: 'text-teal-600', barColor: 'bg-teal-500' }
    ];

    const jobSummaryData = [
        { id: 'open', label: 'Open', value: 76, width: '19%', color: 'bg-orange-500' },
        { id: 'progress', label: 'Progress', value: 12, width: '3%', color: 'bg-blue-500' },
        { id: 'review', label: 'Review', value: 5, width: '1%', color: 'bg-purple-500' },
        { id: 'closed', label: 'Closed', value: 310, width: '77%', color: 'bg-green-500' }
    ];

    // Event handler untuk tooltips
    const handleMouseLeave = () => setTooltip(prev => ({ ...prev, visible: false }));
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (tooltip.visible) setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
    };
    const handleBarHover = (data: typeof summaryData[0]) => {
        setTooltip({ visible: true, content: `${data.label} : ${data.value}`, color: data.barColor, x: 0, y: 0 });
    };
    const handleJobMouseLeave = () => setJobTooltip(prev => ({ ...prev, visible: false }));
    const handleJobMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (jobTooltip.visible) setJobTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
    };
    const handleJobBarHover = (data: typeof jobSummaryData[0], e: React.MouseEvent<HTMLDivElement>) => {
        setJobTooltip({ visible: true, content: `${data.label}: ${data.value} Jobs`, x: e.clientX, y: e.clientY });
    };

    // Efek untuk jam
    useEffect(() => {
        setIsMounted(true);
        const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const timeString = currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(/\./g, ' : ');
    const dateString = currentTime.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const todoDateString = todoSelectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const ringStyles = "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2";

    return (
        <>
            <style>
                {`
                @keyframes modal-scale-in {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-modal-scale-in { animation: modal-scale-in 0.2s ease-out forwards; }
                `}
            </style>
        
            <div className="flex h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                {/* ===== Sidebar ===== */}
                <aside className="w-64 flex-shrink-0 bg-[#3fa66c] text-white flex flex-col">
                    <div className="h-20 flex items-center px-5 gap-3">
                        <FileSignature className="w-7 h-7 flex-shrink-0" />
                        <div>
                            <h1 className="text-xl font-bold">Toolbox</h1>
                            <span className="text-xs font-light -mt-1 block">v1.0.0</span>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><Search className="w-4 h-4" /></span>
                            <input type="text" placeholder="Search menu..." className={`w-full h-10 py-2 pr-12 pl-10 bg-white text-gray-800 border border-gray-200 rounded-lg text-sm focus:outline-none ${ringStyles}`} />
                            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium bg-gray-100 border border-gray-300 rounded-md px-1.5 py-0.5">⌘K</span>
                        </div>
                    </div>
                    <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
                        <div>
                            <span className="text-xs font-semibold text-white uppercase px-2">Generals</span>
                            <ul className="mt-1 space-y-1">
                                <li>
                                    <a 
                                        href="#"
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
                        <div className="pt-2">
                            <span className="text-xs font-semibold text-white uppercase px-2">Workspace</span>
                            <ul className="mt-1 space-y-1">
                                <li>
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
                        <div className="pt-2">
                            <span className="text-xs font-semibold text-white uppercase px-2">Master Data</span>
                            <ul className="mt-1 space-y-1">
                                <li>
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

                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Home className="w-4 h-4" />
                            <ChevronRight className="w-4 h-4" />
                            <span>Dashboard</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className={`flex items-center space-x-2 border border-gray-200 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 ${ringStyles}`}>
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

                    <main className="flex-1 overflow-y-auto p-6">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="bg-gray-200 p-3 rounded-lg">
                                <LayoutDashboard className="w-8 h-8 text-gray-700" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                                <p className="text-gray-500">Dashboard Summary of The Year</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            <div className="md:col-span-2 bg-white border border-yellow-200 rounded-lg p-6 flex items-center space-x-4">
                                <div className="bg-yellow-100 p-3 rounded-lg"><Sun className="w-7 h-7 text-yellow-600" /></div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Good Morning, [User]!</h3>
                                    <p className="text-gray-500">Welcome to the Toolbox Dashboard. Have a productive day!</p>
                                </div>
                            </div>
                            <div className="bg-white border border-orange-200 rounded-lg p-6 flex items-center space-x-4">
                                <div className="bg-orange-100 p-3 rounded-lg"><CalendarDays className="w-7 h-7 text-orange-600" /></div>
                                <div>
                                    {isMounted ? (
                                        <><p id="clock" className="text-lg font-semibold text-gray-800">{timeString}</p><p id="date" className="text-sm text-gray-500">{dateString}</p></>
                                    ) : (
                                        <><p className="text-lg font-semibold text-gray-800">-- : -- : --</p><p className="text-sm text-gray-500">Memuat...</p></>
                                    )}
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => { setTodoSelectedDate(new Date()); setIsTodoSidebarOpen(true); }}
                                className={`bg-pink-50 border border-pink-200 rounded-lg p-6 flex justify-between items-center text-left hover:bg-pink-100 transition-colors duration-200 ${ringStyles}`}
                            >
                                <div>
                                    <p className="text-sm text-pink-700">Today&apos;s Jobs</p>
                                    <p className="text-3xl font-bold text-pink-900">6</p>
                                </div>
                                <div className="bg-pink-100 p-3 rounded-lg"><ListChecks className="w-7 h-7 text-pink-600" /></div>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            <div className="bg-white border border-blue-200 rounded-lg p-5">
                                <div className="flex justify-between items-start">
                                    <div><p className="text-sm text-gray-500">Total Project</p><p className="text-3xl font-bold text-gray-800">28</p></div>
                                    <div className="bg-blue-100 p-3 rounded-full"><Archive className="w-6 h-6 text-blue-600" /></div>
                                </div>
                            </div>
                            <div className="bg-white border border-orange-200 rounded-lg p-5">
                                <div className="flex justify-between items-start">
                                    <div><p className="text-sm text-gray-500">Open Project</p><p className="text-3xl font-bold text-gray-800">8</p></div>
                                    <div className="bg-orange-100 p-3 rounded-full"><FolderOpen className="w-6 h-6 text-orange-600" /></div>
                                </div>
                            </div>
                            <div className="bg-white border border-indigo-200 rounded-lg p-5">
                                <div className="flex justify-between items-start">
                                    <div><p className="text-sm text-gray-500">Progress Project</p><p className="text-3xl font-bold text-gray-800">16</p></div>
                                    <div className="bg-indigo-100 p-3 rounded-full"><Loader className="w-6 h-6 text-indigo-600" /></div>
                                </div>
                            </div>
                            <div className="bg-white border border-green-200 rounded-lg p-5">
                                <div className="flex justify-between items-start">
                                    <div><p className="text-sm text-gray-500">Closed Project</p><p className="text-3xl font-bold text-gray-800">4</p></div>
                                    <div className="bg-green-100 p-3 rounded-full"><FolderCheck className="w-6 h-6 text-green-600" /></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="bg-gray-200 p-3 rounded-lg"><BarChartHorizontal className="w-6 h-6 text-gray-700" /></div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Summary of Project 2025</h3>
                                        <p className="text-sm text-gray-500">Summary of project</p>
                                    </div>
                                </div>
                                <div className="space-y-4 pt-2 pr-4 relative" onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}>
                                    {summaryData.map((data) => (
                                        <div key={data.id} className="flex items-center group" onMouseEnter={() => handleBarHover(data)}>
                                            <span className="w-20 text-sm text-gray-500">{data.label}</span>
                                            <div className="flex-1 h-5 bg-gray-100 rounded-full">
                                                <div className={`${data.barColor} h-5 rounded-full transition-all duration-300`} style={{ width: data.width }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center mt-6 border-t border-gray-100 pt-4"><span className="text-sm font-medium text-gray-700">Project Summary</span></div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="bg-gray-200 p-3 rounded-lg"><ClipboardList className="w-6 h-6 text-gray-700" /></div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Employee Jobs Summary 2025</h3>
                                        <p className="text-sm text-gray-500">The following is a total recap of employee jobs</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-end mb-2">
                                    <div><p className="text-sm text-gray-500">Total Jobs</p><p className="text-3xl font-bold text-gray-800">403</p></div>
                                    <div className="text-right"><p className="text-sm text-gray-500">Completion Rate</p><p className="text-3xl font-bold text-green-600">77%</p></div>
                                </div>
                                <div className="flex h-3 rounded-full overflow-hidden bg-gray-200 mb-6 cursor-pointer" onMouseLeave={handleJobMouseLeave} onMouseMove={handleJobMouseMove}>
                                    {jobSummaryData.map(data => (
                                        <div key={data.id} style={{ width: data.width }} className={`${data.color} h-3 transition-all duration-300`} onMouseEnter={(e) => handleJobBarHover(data, e)}></div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div className="border border-orange-300 bg-white rounded-lg p-3">
                                        <div className="flex items-center space-x-2 mb-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span><p className="text-sm text-orange-700">Open</p></div>
                                        <p className="text-2xl font-bold text-gray-800">76</p><p className="text-xs text-gray-500">19% of total</p>
                                    </div>
                                    <div className="border border-blue-300 bg-white rounded-lg p-3">
                                        <div className="flex items-center space-x-2 mb-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span><p className="text-sm text-blue-700">Progress</p></div>
                                        <p className="text-2xl font-bold text-gray-800">12</p><p className="text-xs text-gray-500">3% of total</p>
                                    </div>
                                    <div className="border border-purple-300 bg-white rounded-lg p-3">
                                        <div className="flex items-center space-x-2 mb-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span><p className="text-sm text-purple-700">Review</p></div>
                                        <p className="text-2xl font-bold text-gray-800">5</p><p className="text-xs text-gray-500">1% of total</p>
                                    </div>
                                    <div className="border border-green-300 bg-white rounded-lg p-3">
                                        <div className="flex items-center space-x-2 mb-1"><span className="w-2 h-2 rounded-full bg-green-500"></span><p className="text-sm text-green-700">Closed</p></div>
                                        <p className="text-2xl font-bold text-gray-800">310</p><p className="text-xs text-gray-500">77% of total</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="bg-gray-200 p-3 rounded-lg"><List className="w-6 h-6 text-gray-700" /></div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">All Data Project 2025</h3>
                                        <p className="text-sm text-gray-500">Summary project of the year</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {allProjectsData.map((project) => (
                                        <a href="#" key={project.id} onClick={(e) => { e.preventDefault(); handleProjectClick(project); }} className={`block p-3 -mx-3 rounded-lg hover:bg-gray-50 ${ringStyles}`}>
                                            <div className="flex items-start">
                                                <div className={`w-1 h-10 ${project.priorityColor === 'red' ? 'bg-red-500' : project.priorityColor === 'yellow' ? 'bg-yellow-400' : 'bg-teal-500'} rounded-full mr-3 mt-1`}></div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium text-gray-800">{project.title}</span>
                                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                                                        <CalendarDays className="w-4 h-4" />
                                                        <span>{project.date}</span>
                                                        <span className={`font-medium ${project.priorityColor === 'red' ? 'text-red-600' : project.priorityColor === 'yellow' ? 'text-yellow-600' : 'text-teal-600'}`}>{project.priority}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 text-sm mt-1">
                                                        <span className="text-gray-500">Progress</span>
                                                        <div className="w-full bg-gray-200 rounded-full h-1.5 flex-1">
                                                            <div className={`h-1.5 rounded-full bg-${project.progressColor}`} style={{ width: `${project.progress}%` }}></div>
                                                        </div>
                                                        <span className="font-medium text-gray-700">{project.progress}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="bg-gray-200 p-3 rounded-lg"><Users className="w-6 h-6 text-gray-700" /></div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Employee Performance 2025</h3>
                                        <p className="text-sm text-gray-500">Individual job completion status by employee</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {picOptions.slice(0, 3).map(pic => (
                                        <div key={pic.npp} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <img className="w-10 h-10 rounded-full" src={pic.avatar} alt={pic.name} width={40} height={40} />
                                                <div><p className="font-medium text-gray-800">{pic.name}</p></div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-800">0</p>
                                                <p className="text-xs text-gray-500">Total Jobs</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* ===== Render Modals & Tooltips ===== */}
            
            <TodoSidebar 
                isOpen={isTodoSidebarOpen} 
                onClose={() => setIsTodoSidebarOpen(false)} 
                selectedDate={todoSelectedDate}
                setSelectedDate={setTodoSelectedDate}
                currentDateString={todoDateString}
                onOpenModal={() => setIsTodoModalOpen(true)}
                onOpenChangeStatus={handleChangeStatusClick}
                onOpenUpdate={handleUpdateClick}
                onOpenDetail={handleDetailClick}
                onOpenDelete={handleDeleteClick} // Hubungkan fungsi baru
            />

            <AddTodoModal 
                isOpen={isTodoModalOpen} 
                onClose={() => setIsTodoModalOpen(false)} 
            />
            
            <ProjectDetailModal
                isOpen={isProjectModalOpen}
                onClose={() => setIsProjectModalOpen(false)}
                project={selectedProject}
            />
            
            <ChangeStatusModal
                isOpen={isChangeStatusModalOpen}
                onClose={() => setIsChangeStatusModalOpen(false)}
                item={selectedTodoItem}
            />

            <EditJobModal
                isOpen={isEditJobModalOpen}
                onClose={() => setIsEditJobModalOpen(false)}
                item={selectedTodoItem}
            />
            
            <TodoDetailModal
                isOpen={isTodoDetailModalOpen}
                onClose={() => setIsTodoDetailModalOpen(false)}
                item={selectedTodoItem}
                onOpenUpdate={handleUpdateClick}
            />

            {/* Modal Delete (BARU) */}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
            />

            {tooltip.visible && (
                <div 
                    className="fixed bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-2 text-sm font-medium text-gray-800 z-[99] pointer-events-none transition-opacity duration-100"
                    style={{ top: tooltip.y + 15, left: tooltip.x }}
                >
                    <div className="flex items-center space-x-2">
                        <span className={`w-3 h-3 rounded-full ${tooltip.color}`}></span>
                        <span>{tooltip.content}</span>
                    </div>
                </div>
            )}
            
            {jobTooltip.visible && (
                <div 
                    className="fixed bg-gray-900 text-white rounded-md shadow-lg px-3 py-1.5 text-sm font-medium z-[99] pointer-events-none transition-opacity duration-100"
                    style={{ top: jobTooltip.y - 40, left: jobTooltip.x, transform: 'translateX(-50%)' }}
                >
                    {jobTooltip.content}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                </div>
            )}
        </>
    );
};

export default App;

