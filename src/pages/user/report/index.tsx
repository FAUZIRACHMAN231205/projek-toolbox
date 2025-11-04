"use client";

import { useState, useMemo } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  LabelList,
  CartesianGrid,
} from "recharts";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Calendar as CalendarIcon,
  BarChart2,
  Folder,
  PlusCircle,
  Plus,
  Clock,
  CheckCircle,
  Search,
  Users,
  X,
  Check,
  ChevronDown,
  Archive,
  ListChecks,
  Filter,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  EyeOff,
  Settings2,
  FileText,
} from "lucide-react";

const initialDateRange: DateRange = {
  from: new Date(2025, 7, 4), // August 4, 2025
  to: new Date(2025, 10, 4),   // November 4, 2025
};

const priorityData = [
  { name: "High", value: 6, fill: "#ef4444" },
  { name: "Medium", value: 4, fill: "#f59e0b" },
  { name: "Low", value: 2, fill: "#22c55e" },
];

const jobsData = [
  { name: 'Done', value: 250, fill: '#22c55e' },
  { name: 'In Progress', value: 100, fill: '#f59e0b' },
  { name: 'To Do', value: 19, fill: '#a855f7' },
];

const tableData = [
  {
    id: 8,
    name: "SPIRIT",
    periode: "1 Jan 2025 - 31 Dec 2025",
    priority: "High",
    pic: [
      { name: "Tono Sartono", image: "/images/profile.png" },
      { name: "Asep Saepul Pahmit", image: "/images/profile2.png" },
    ],
    percent: 70.59,
    stream: "Others",
    notes: "Pengembangan fitur sesuai agenda 2025",
  },
  {
    id: 11,
    name: "Digital Aset",
    periode: "1 Aug 2025 - 6 Dec 2025",
    priority: "High",
    pic: [
        { name: "Tono Sartono", image: "/images/profile.png" },
        { name: "Asep Saepul Pahmit", image: "/images/profile2.png" },
    ],
    percent: 0,
    stream: "Development",
    notes: "Migrasi aset ke platform digital baru.",
  },
  {
    id: 9,
    name: "DTS",
    periode: "25 Aug 2025 - 31 Oct 2025",
    priority: "High",
    pic: [
        { name: "Tono Sartono", image: "/images/profile.png" },
        { name: "Asep Saepul Pahmit", image: "/images/profile2.png" },
    ],
    percent: 25,
    stream: "IT Support",
    notes: "Peningkatan sistem DTS.",
  },
  {
    id: 10,
    name: "MARS",
    periode: "1 Sep 2025 - 31 Dec 2025",
    priority: "High",
    pic: [
        { name: "Tono Sartono", image: "/images/profile.png" },
        { name: "Asep Saepul Pahmit", image: "/images/profile2.png" },
    ],
    percent: 25,
    stream: "Marketing",
    notes: "Pengembangan MARS untuk kampanye Q4.",
  },
  {
    id: 29,
    name: "ERP SINTAS",
    periode: "1 Oct 2025 - 31 Dec 2025",
    priority: "High",
    pic: [{ name: "Tono Sartono", image: "/images/profile.png" }],
    percent: 33.33,
    stream: "Finance",
    notes: "Implementasi modul baru di ERP.",
  },
  {
    id: 28,
    name: "Tindak Lanjut Surveillance ISO 27001",
    periode: "20 Oct 2025 - 21 Nov 2025",
    priority: "High",
    pic: [
      { name: "Tono Sartono", image: "/images/profile.png" },
      { name: "Asep Saepul Pahmit", image: "/images/profile2.png" },
      { name: "Rina", image: "/images/profile3.png" },
    ],
    extraPic: -1,
    percent: 25,
    stream: "Security",
    notes: "Menindaklanjuti temuan dari audit surveillance.",
  },
  {
    id: 24,
    name: "Rutin Digitalisasi 2025",
    periode: "1 Jan 2025 - 31 Dec 2025",
    priority: "Medium",
    pic: [
        { name: "Tono Sartono", image: "/images/profile.png" },
        { name: "Asep Saepul Pahmit", image: "/images/profile2.png" },
        { name: "Rina", image: "/images/profile3.png" },
    ],
    extraPic: -2,
    percent: 95.03,
    stream: "General",
    notes: "Kegiatan digitalisasi rutin.",
  },
  {
    id: 7,
    name: "E Prakerin",
    periode: "1 Aug 2025 - 31 Oct 2025",
    priority: "Medium",
    pic: [
        { name: "Tono Sartono", image: "/images/profile.png" },
        { name: "Asep Saepul Pahmit", image: "/images/profile2.png" },
    ],
    percent: 44.44,
    stream: "HR",
    notes: "Sistem untuk manajemen prakerin.",
  },
  {
    id: 14,
    name: "SSOT",
    periode: "4 Aug 2025 - 29 Sep 2025",
    priority: "Medium",
    pic: [{ name: "Tono Sartono", image: "/images/profile.png" }],
    percent: 85.71,
    stream: "Data",
    notes: "Implementasi Single Source of Truth.",
  },
  {
    id: 19,
    name: "Plantastic",
    periode: "4 Aug 2025 - 31 Oct 2025",
    priority: "Medium",
    pic: [{ name: "Tono Sartono", image: "/images/profile.png" }],
    percent: 0,
    stream: "Operations",
    notes: "Aplikasi untuk perencanaan.",
  },
];

type SortConfig = {
  key: keyof (typeof tableData)[0];
  direction: "ascending" | "descending";
} | null;

const PriorityBadge = ({ priority }: { priority: string }) => {
  const style = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  }[priority];
  return (
    <span
      className={`px-3 py-1 text-sm font-medium rounded-full ${style}`}
    >
      {priority}
    </span>
  );
};

const ProgressBar = ({ percent }: { percent: number }) => {
    const color = percent > 75 ? "bg-blue-500" : percent > 25 ? "bg-orange-400" : "bg-red-500";
    return (
        <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Progress</span>
            <div className="w-24 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div className={`${color} h-2 rounded-full`} style={{ width: `${percent}%` }}></div>
            </div>
            <span className="text-sm font-bold">{percent.toFixed(2)}%</span>
        </div>
    )
}

export default function Report() {
  const [date, setDate] = useState<DateRange | undefined>(initialDateRange);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [picFilter, setPicFilter] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'ascending' });
  const [selectedProject, setSelectedProject] = useState<(typeof tableData)[0] | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
    periode: true,
    priority: true,
    pic: true,
    percent: true,
  });

  const allPics = useMemo(() => {
    const pics = new Map<string, string>();
    tableData.forEach(row => row.pic.forEach(p => {
        if (!pics.has(p.name)) {
            pics.set(p.name, p.image);
        }
    }));
    return Array.from(pics.entries()).map(([name, image]) => ({ name, image }));
  }, []);

  const filteredData = useMemo(() => {
    const sortableItems = [...tableData];
    if (sortConfig) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableItems.filter(item => {
      const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const priorityMatch = priorityFilter.length === 0 || priorityFilter.includes(item.priority);
      const picMatch = picFilter.length === 0 || item.pic.some(p => picFilter.includes(p.name));
      return searchMatch && priorityMatch && picMatch;
    });
  }, [searchTerm, priorityFilter, picFilter, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  const requestSort = (key: keyof (typeof tableData)[0]) => {
    let direction: "ascending" | "descending" = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setPriorityFilter([]);
    setPicFilter([]);
  };

  const columnNames: Record<keyof typeof visibleColumns, string> = {
    id: "ID",
    name: "Job",
    periode: "Date",
    priority: "Priority",
    pic: "Pic_no_badge",
    percent: "Status",
  };

  const TableHeader = ({ columnKey, title }: { columnKey: keyof (typeof tableData)[0], title: string }) => {
    if (!visibleColumns[columnKey as keyof typeof visibleColumns]) return null;

    const isSorted = sortConfig?.key === columnKey;
    
    return (
      <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">
        <button
          className={`flex items-center gap-2 p-2 rounded-lg ${isSorted ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          onClick={() => requestSort(columnKey)}
        >
          {title}
          {isSorted ? (
            sortConfig?.direction === 'ascending' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
          ) : (
            <ArrowUpDown className="w-4 h-4 text-gray-300 dark:text-gray-600" />
          )}
        </button>
      </th>
    );
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-8">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <div className="p-3 bg-green-100 rounded-2xl">
            <BarChart2 className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Report Project</h1>
            <p className="text-gray-500 dark:text-gray-400">Report Project by Team</p>
          </div>
        </div>
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className="flex items-center gap-2 p-2 border dark:border-gray-700 rounded-lg">
              <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium">
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "d MMM yyyy")} -{" "}
                      {format(date.to, "d MMM yyyy")}
                    </>
                  ) : (
                    format(date.from, "d MMM yyyy")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </span>
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className="w-auto p-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700"
              align="end"
              sideOffset={4}
            >
              <DayPicker
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Overview Project Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Overview Project</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">29</p>
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Folder className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Open</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">8</p>
                <div className="p-2 bg-orange-100 rounded-xl">
                  <PlusCircle className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl border border-purple-300 dark:border-purple-500">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Progress</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">17</p>
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Closed</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">4</p>
                <div className="p-2 bg-green-100 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Priority Project Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Overview Priority Project</h2>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={priorityData} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" hide />
              <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="transparent" />
              <Bar dataKey="value" barSize={30} radius={[10, 10, 10, 10]}>
                <LabelList dataKey="name" position="insideLeft" offset={10} fill="#fff" style={{ fontWeight: 'bold' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Overview Jobs Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Overview Jobs</h2>
          <div className="flex-grow flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={jobsData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  background
                  dataKey="value"
                  cornerRadius={10}
                />
                 <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-3xl font-bold fill-current"
                  >
                      369
                  </text>
                  <text
                      x="50%"
                      y="65%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-sm text-gray-500 dark:text-gray-400 fill-current"
                  >
                      Total Job
                  </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 p-6 rounded-3xl">
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Searching..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Plus className="w-5 h-5" /> Priority
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content 
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 mt-1 w-48 border dark:border-gray-700"
                  sideOffset={5}
                >
                  {["High", "Medium", "Low"].map(p => (
                    <DropdownMenu.CheckboxItem
                      key={p}
                      checked={priorityFilter.includes(p)}
                      onCheckedChange={() => {
                        setPriorityFilter(current => 
                          current.includes(p) ? current.filter(item => item !== p) : [...current, p]
                        );
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none"
                    >
                      <DropdownMenu.ItemIndicator>
                        <Check className="w-4 h-4" />
                      </DropdownMenu.ItemIndicator>
                      <span className="flex-grow">{p}</span>
                    </DropdownMenu.CheckboxItem>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Plus className="w-5 h-5" /> PIC
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content 
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 mt-1 w-56 border dark:border-gray-700"
                  sideOffset={5}
                >
                  {allPics.map(pic => (
                    <DropdownMenu.CheckboxItem
                      key={pic.name}
                      checked={picFilter.includes(pic.name)}
                      onCheckedChange={() => {
                        setPicFilter(current => 
                          current.includes(pic.name) ? current.filter(item => item !== pic.name) : [...current, pic.name]
                        );
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none"
                    >
                      <DropdownMenu.ItemIndicator>
                        <Check className="w-4 h-4" />
                      </DropdownMenu.ItemIndicator>
                      <Image src={pic.image} alt={pic.name} width={24} height={24} className="rounded-full" />
                      <span className="flex-grow text-sm">{pic.name}</span>
                    </DropdownMenu.CheckboxItem>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            <button onClick={resetFilters} className="flex items-center gap-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500">
              Reset <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
              <button className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <Archive className="w-5 h-5" />
                <span className="font-semibold">Project</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-1 text-gray-600 dark:text-gray-300">
                <ListChecks className="w-5 h-5" />
                <span className="font-semibold">Job</span>
              </button>
            </div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                  <Filter className="w-5 h-5" />
                  <span className="font-semibold">View</span>
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content 
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 mt-1 w-56 border dark:border-gray-700"
                  sideOffset={5}
                >
                  <div className="px-3 py-2 font-semibold">Toggle columns</div>
                  <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                  {Object.keys(visibleColumns).map((key) => (
                    <DropdownMenu.CheckboxItem
                      key={key}
                      checked={visibleColumns[key as keyof typeof visibleColumns]}
                      onCheckedChange={(checked) =>
                        setVisibleColumns((prev) => ({ ...prev, [key]: checked }))
                      }
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none"
                    >
                      <DropdownMenu.ItemIndicator>
                        <Check className="w-4 h-4" />
                      </DropdownMenu.ItemIndicator>
                      <span className="flex-grow">{columnNames[key as keyof typeof visibleColumns]}</span>
                    </DropdownMenu.CheckboxItem>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>

        <div>
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <TableHeader columnKey="id" title="ID" />
                <TableHeader columnKey="name" title="Name" />
                <TableHeader columnKey="periode" title="Periode" />
                <TableHeader columnKey="priority" title="Priority" />
                <TableHeader columnKey="pic" title="PIC" />
                <TableHeader columnKey="percent" title="Percent" />
                <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  {visibleColumns.id && <td className="py-4 px-4">{row.id}</td>}
                  {visibleColumns.name && <td className="py-4 px-4 font-medium">{row.name}</td>}
                  {visibleColumns.periode && <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{row.periode}</td>}
                  {visibleColumns.priority && <td className="py-4 px-4">
                    <PriorityBadge priority={row.priority} />
                  </td>}
                  {visibleColumns.pic && <td className="py-4 px-4">
                    <div className="flex items-center -space-x-2">
                      {row.pic.map((pic, index) => (
                        <Image
                          key={index}
                          src={pic.image}
                          alt={pic.name}
                          width={32}
                          height={32}
                          className="rounded-full border-2 border-white dark:border-gray-800"
                        />
                      ))}
                      {row.extraPic && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 border-2 border-white dark:border-gray-800">
                              {row.extraPic > 0 ? `+${row.extraPic}`: row.extraPic}
                          </div>
                      )}
                    </div>
                  </td>}
                  {visibleColumns.percent && <td className="py-4 px-4">
                    <ProgressBar percent={row.percent} />
                  </td>}
                  <td className="py-4 px-4">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content
                          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 mt-1 w-48 border dark:border-gray-700"
                          sideOffset={5}
                          align="end"
                        >
                          <DropdownMenu.Item onSelect={() => setSelectedProject(row)} className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none">
                            <FileText className="w-4 h-4" /> Detail
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-end mt-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span>Rows per page</span>
              <Select.Root value={String(rowsPerPage)} onValueChange={(value) => setRowsPerPage(Number(value))}>
                <Select.Trigger className="w-20 p-2 border dark:border-gray-700 rounded-lg">
                  <Select.Value />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 mt-1 border dark:border-gray-700">
                    {[10, 20, 30, 40, 50].map(size => (
                      <Select.Item key={size} value={String(size)} className="px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none">
                        {size}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
            <div>Page {currentPage} of {totalPages}</div>
            <div className="flex items-center gap-2">
              <button 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="w-5 h-5" />
              </button>
              <button 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50"
                onClick={() => setCurrentPage(p => p - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50"
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedProject && (
        <Dialog.Root open onOpenChange={() => setSelectedProject(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg focus:outline-none">
              <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Detail Project
              </Dialog.Title>
              <Dialog.Description className="mt-1 mb-5 text-sm text-gray-600 dark:text-gray-400">
                Detailed information about the project.
              </Dialog.Description>
              
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{selectedProject.name}</h2>
                <PriorityBadge priority={selectedProject.priority} />
              </div>

              <hr className="dark:border-gray-700" />

              <div className="my-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2"><Settings2 className="w-5 h-5" /> Information</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-gray-500 dark:text-gray-400 flex items-center gap-2"><CalendarIcon className="w-4 h-4" /> Period</div>
                  <div className="col-span-2 font-medium">{selectedProject.periode}</div>
                  
                  <div className="text-gray-500 dark:text-gray-400 flex items-center gap-2"><BarChart2 className="w-4 h-4" /> Stream</div>
                  <div className="col-span-2 font-medium">{selectedProject.stream}</div>
                </div>
              </div>

              <div className="my-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2"><FileText className="w-5 h-5" /> Notes</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  {selectedProject.notes}
                </p>
              </div>

              <div className="my-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2"><Users className="w-5 h-5" /> PIC Project</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProject.pic.map(p => (
                    <div key={p.name} className="flex items-center gap-3 p-3 border dark:border-gray-700 rounded-lg">
                      <Image src={p.image} alt={p.name} width={40} height={40} className="rounded-full" />
                      <span className="font-medium">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Dialog.Close asChild>
                <button
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </div>
  );
}
