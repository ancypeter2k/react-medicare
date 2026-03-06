import Navbar from "../components/Navbar";
import { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  Calendar,
  ChevronUp,
  Trash2,
  ChevronDown,
  ClipboardList,
} from "lucide-react";
import { procedures, locations, feeLevels } from "../data/dummyData";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProcedures, setSelectedProcedures] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);
  const [globalFeeLevel, setGlobalFeeLevel] = useState("Medicare");
  const [selectedLocation, setSelectedLocation] = useState("NSW");

  // Handle Search Input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 0) {
      const filtered = procedures.filter(p => 
        p.name.toLowerCase().includes(value.toLowerCase()) || 
        p.code.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Add procedure to table
  const selectProcedure = (proc) => {
    if (!selectedProcedures.find(p => p.id === proc.id)) {
      setSelectedProcedures([...selectedProcedures, proc]);
    }
    setSearchTerm("");
    setShowSuggestions(false);
  };

  // Remove procedure
  const removeProcedure = (id) => {
    setSelectedProcedures(selectedProcedures.filter(p => p.id !== id));
  };

  // Update specific row fee level
  const updateRowFeeLevel = (id, newLevel) => {
    setSelectedProcedures(selectedProcedures.map(p => 
      p.id === id ? { ...p, feeLevel: newLevel } : p
    ));
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Totals Calculation
  const totalAmount = selectedProcedures.reduce((acc, curr) => acc + curr.amount, 0);
  const totalGap = selectedProcedures.reduce((acc, curr) => acc + curr.gap, 0);

  return (
    <div className="bg-[#0b1421] min-h-screen text-white font-sans">
      <Navbar />

      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between gap-5 mb-6">
            <div className="flex flex-col">
              <div
                className="flex flex-col items-center justify-center border border-[#01C0C842] rounded-lg bg-[#111c2d] cursor-pointer hover:bg-[#16253a] transition-colors"
                style={{ width: "180px", height: "150px" }}
              >
                <div className="w-12 h-12 rounded-full bg-[#1c2e45] flex items-center justify-center mb-3">
                  <Plus className="text-[#01C0C8] w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-300">Add a Patient</span>
              </div>
            </div>

            <div className="flex-1 max-w-sm space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-400">Quote No</label>
                <input
                  type="text"
                  value="QT-289"
                  readOnly
                  className="bg-[#111c2d] border border-gray-700 rounded text-gray-400 px-3 py-2 w-64 text-sm focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-400">
                  Date of issue<span className="text-red-500">*</span>
                </label>
                <div className="relative w-64">
                  <input
                    type="text"
                    value="23/10/2025"
                    readOnly
                    className="bg-[#111c2d] border border-gray-700 rounded px-3 py-2 w-full text-sm focus:outline-none"
                  />
                  <Calendar className="absolute right-3 top-2 w-4 h-4 text-[#01C0C8]" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-400 whitespace-nowrap">
                  Fee level<span className="text-red-500">*</span>
                </label>
                <div className="relative w-64">
                  <select 
                    value={globalFeeLevel}
                    onChange={(e) => setGlobalFeeLevel(e.target.value)}
                    className="bg-[#111c2d] border border-gray-700 rounded text-gray-300 px-3 py-2 w-full text-sm appearance-none focus:outline-none focus:border-[#01C0C8]"
                  >
                    {feeLevels.map(level => (
                      <option key={level.id} value={level.label}>{level.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="flex flex-wrap items-center gap-4 mb-4 relative" ref={suggestionRef}>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Procedure name or code"
                className={`bg-[#111c2d] border ${showSuggestions ? 'border-[#01C0C8]' : 'border-gray-700'} rounded px-10 py-2 w-full text-sm focus:outline-none focus:border-[#01C0C8] transition-colors`}
              />
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 left-0 right-0 mt-1 bg-[#1F2937] border border-gray-700 rounded shadow-xl overflow-hidden">
                  {suggestions.map((proc) => (
                    <div 
                      key={proc.id}
                      onClick={() => selectProcedure(proc)}
                      className="px-4 py-3 hover:bg-[#2d3a4d] cursor-pointer text-sm border-b border-gray-700 last:border-none"
                    >
                      <div className="font-medium">{proc.category}</div>
                      <div className="text-gray-400 text-xs">{proc.code}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative w-40">
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-[#111c2d] border border-gray-700 rounded px-3 py-2 w-full text-sm appearance-none focus:outline-none focus:border-[#01C0C8]"
              >
                {locations.map(loc => (
                  <option key={loc.id} value={loc.code}>{loc.code}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
            </div>

            <button className="flex items-center gap-2 bg-[#01C0C815] border border-[#01C0C8] text-white px-4 py-2 rounded font-semibold text-sm hover:bg-[#01C0C825]">
              Inventories <ClipboardList className="w-4 h-4" />
            </button>
          </div>              

          {/* Procedure Tables */}
          <div className="space-y-4 mb-8">
            {selectedProcedures.map((proc) => (
              <div key={proc.id} className="border border-gray-800 rounded-lg overflow-hidden">
                {/* Header Row */}
                <div className="bg-[#16253a] px-4 py-2 flex items-center justify-between border-b border-gray-800">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <ChevronUp className="w-4 h-4" /> {proc.category}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold">${proc.amount.toFixed(2)}</span>
                    <button onClick={() => removeProcedure(proc.id)} className="text-red-500 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {/* Table Content */}
                <table className="w-full text-xs text-left">
                  <thead className="text-gray-400 bg-[#0b1421]">
                    <tr>
                      <th className="px-4 py-3 font-normal">Item Code</th>
                      <th className="px-4 py-3 font-normal">Description</th>
                      <th className="px-4 py-3 font-normal text-right">Amount</th>
                      <th className="px-4 py-3 font-normal text-right">Gap</th>
                      <th className="px-4 py-3 font-normal">Fee level</th>
                      <th className="px-4 py-3 font-normal text-right">Line total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#111c2d]">
                    <tr className="border-t border-gray-800">
                      <td className="px-4 py-4">{proc.code}</td>
                      <td className="px-4 py-4 text-gray-300">{proc.description}</td>
                      <td className="px-4 py-4 text-right">${proc.amount.toFixed(2)}</td>
                      <td className="px-4 py-4 text-right">{proc.gap.toFixed(2)}</td>
                      <td className="px-4 py-4">
                        <div className="relative inline-block w-32">
                              <select 
                                value={proc.feeLevel}
                                onChange={(e) => updateRowFeeLevel(proc.id, e.target.value)}
                                className="bg-transparent border-none text-gray-300 w-full appearance-none focus:outline-none cursor-pointer"
                              >
                                {feeLevels.map(level => (
                                  <option key={level.id} value={level.label}>{level.label}</option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-0 top-1 w-3 h-3 text-gray-500 pointer-events-none" />
                            </div>
                      </td>
                      <td className="px-4 py-4 text-right font-semibold">${proc.amount.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {/* Subject Line */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Type Subject Line"
              className="bg-[#111c2d] border border-gray-700 rounded px-3 py-2 w-full max-w-lg text-sm focus:outline-none"
            />
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="space-y-4 max-w-sm">
              <h3 className="font-bold text-sm">Terms and conditions</h3>
              <p className="text-gray-500 text-xs leading-relaxed">Terms applied</p>
            </div>

            {/* Summary Box */}
            <div className="w-full max-w-xs mt-8 md:mt-0">
              <div className="border border-[#01C0C842] rounded-lg p-5 bg-[#111c2d] space-y-3">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Rebate Total:</span>
                  <span className="font-mono text-white">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Gap Total:</span>
                  <span className="font-mono text-white">${totalGap.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Inventories Total:</span>
                  <span className="font-mono text-white">$0.00</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Total Discount:</span>
                  <span className="font-mono text-white">$0.00</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-700 font-bold">
                  <span className="text-base">Net Total:</span>
                  <span className="text-[#01C0C8] text-xl font-mono">
                    ${(totalAmount + totalGap).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button className="bg-[#a0aec0] text-[#111c2d] px-8 py-2 rounded font-bold text-sm hover:bg-white transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;