"use client";

import { useState, useMemo } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Checkbox from "@radix-ui/react-checkbox";
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
  Settings,
  List,
  Folder,
  PlusCircle,
  Clock,
  CheckCircle,
  Search,
  Users,
  X,
  Check,
  ChevronDown,
  Archive,
  ListChecks,
  SlidersHorizontal,
} from "lucide-react";

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
    pic: ["/images/profile.png", "/images/profile.png"],
    percent: 70.59,
  },
  {
    id: 11,
    name: "Digital Aset",
    periode: "1 Aug 2025 - 6 Dec 2025",
    priority: "High",
    pic: ["/images/profile.png", "/images/profile.png"],
    percent: 0,
  },
  {
    id: 9,
    name: "DTS",
    periode: "25 Aug 2025 - 31 Oct 2025",
    priority: "High",
    pic: ["/images/profile.png", "/images/profile.png"],
    percent: 25,
  },
  {
    id: 10,
    name: "MARS",
    periode: "1 Sep 2025 - 31 Dec 2025",
    priority: "High",
    pic: ["/images/profile.png", "/images/profile.png"],
    percent: 25,
  },
  {
    id: 29,
    name: "ERP SINTAS",
    periode: "1 Oct 2025 - 31 Dec 2025",
    priority: "High",
    pic: ["/images/profile.png"],
    percent: 33.33,
  },
  {
    id: 28,
    name: "Tindak Lanjut Surveillance ISO 27001",
    periode: "20 Oct 2025 - 21 Nov 2025",
    priority: "High",
    pic: ["/images/profile.png", "/images/profile.png", "/images/profile.png"],
    extraPic: -1,
    percent: 25,
  },
  {
    id: 24,
    name: "Rutin Digitalisasi 2025",
    periode: "1 Jan 2025 - 31 Dec 2025",
    priority: "Medium",
    pic: ["/images/profile.png", "/images/profile.png", "/images/profile.png"],
    extraPic: -2,
    percent: 95.03,
  },
  {
    id: 7,
    name: "E Prakerin",
    periode: "1 Aug 2025 - 31 Oct 2025",
    priority: "Medium",
    pic: ["/images/profile.png", "/images/profile.png"],
    percent: 44.44,
  },
  {
    id: 14,
    name: "SSOT",
    periode: "4 Aug 2025 - 29 Sep 2025",
    priority: "Medium",
    pic: ["/images/profile.png"],
    percent: 85.71,
  },
  {
    id: 19,
    name: "Plantastic",
    periode: "4 Aug 2025 - 31 Oct 2025",
    priority: "Medium",
    pic: ["/images/profile.png"],
    percent: 0,
  },
];

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
    const color = percent > 75 ? "bg-blue-500" : "bg-orange-400";
    return (
        <div className="flex items-center gap-2">
            <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className={`${color} h-2 rounded-full`} style={{ width: `${percent}%` }}></div>
            </div>
            <span className="text-sm font-medium">{percent.toFixed(2)}%</span>
        </div>
    )
}

export default function Report() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [picFilter, setPicFilter] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
    periode: true,
    priority: true,
    pic: true,
    percent: true,
  });

  const allPics = useMemo(() => {
    const pics = new Set<string>();
    tableData.forEach(row => row.pic.forEach(p => pics.add(p)));
    return Array.from(pics);
  }, []);

  const filteredData = useMemo(() => {
    return tableData.filter(item => {
      const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const priorityMatch = priorityFilter.length === 0 || priorityFilter.includes(item.priority);
      const picMatch = picFilter.length === 0 || item.pic.some(p => picFilter.includes(p));
      return searchMatch && priorityMatch && picMatch;
    });
  }, [searchTerm, priorityFilter, picFilter]);

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
        <div className="flex items-center gap-2 p-2 border dark:border-gray-700 rounded-lg">
            <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium">3 Agu 2025 - 3 Nov 2025</span>
        </div>
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
                <button className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <PlusCircle className="w-5 h-5" /> Priority
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
                <button className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <PlusCircle className="w-5 h-5" /> PIC
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content 
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 mt-1 w-56 border dark:border-gray-700"
                  sideOffset={5}
                >
                  {allPics.map(pic => (
                    <DropdownMenu.CheckboxItem
                      key={pic}
                      checked={picFilter.includes(pic)}
                      onCheckedChange={() => {
                        setPicFilter(current => 
                          current.includes(pic) ? current.filter(item => item !== pic) : [...current, pic]
                        );
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none"
                    >
                      <DropdownMenu.ItemIndicator>
                        <Check className="w-4 h-4" />
                      </DropdownMenu.ItemIndicator>
                      <Image src={pic} alt="pic" width={24} height={24} className="rounded-full" />
                      <span className="flex-grow text-sm">PIC Name</span>
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
                  <SlidersHorizontal className="w-5 h-5" />
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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                {visibleColumns.id && <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">ID</th>}
                {visibleColumns.name && <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Name</th>}
                {visibleColumns.periode && <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Periode</th>}
                {visibleColumns.priority && <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Priority</th>}
                {visibleColumns.pic && <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">PIC</th>}
                {visibleColumns.percent && <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">Percent</th>}
                <th className="text-left py-3 px-4 font-semibold text-gray-500 dark:text-gray-400"></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
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
                          src={pic}
                          alt="PIC"
                          width={32}
                          height={32}
                          className="rounded-full border-2 border-white"
                        />
                      ))}
                      {row.extraPic && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 border-2 border-white">
                              {row.extraPic}
                          </div>
                      )}
                    </div>
                  </td>}
                  {visibleColumns.percent && <td className="py-4 px-4">
                    <ProgressBar percent={row.percent} />
                  </td>}
                  <td className="py-4 px-4">
                    <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between mt-6 text-sm">
            <p className="text-gray-500 dark:text-gray-400">0 of 29 row(s) selected.</p>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span>Rows per page</span>
                    <select className="border-gray-200 dark:bg-gray-700 dark:border-gray-600 rounded-md">
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                    </select>
                </div>
                <p>Page 1 of 3</p>
                <div className="flex items-center gap-1">
                    <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                        <ChevronsLeft className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                        <ChevronsRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
