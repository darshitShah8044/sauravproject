import React, { useState, useEffect } from "react";

const LandingPage = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    companyName: "",
    size: "",
    clarity: "",
  });

  // Function to fetch data from API with optional filters
  const fetchData = async () => {
    try {
      let apiUrl = "https://sauravproject-gs41.onrender.com/api/item";

      // Append filters to API URL if they are set
      if (filters.companyName || filters.size || filters.clarity) {
        apiUrl += "?";

        // Build query parameters
        const queryParams = [];
        if (filters.companyName)
          queryParams.push(`companyName=${filters.companyName}`);
        if (filters.size) queryParams.push(`size=${filters.size}`);
        if (filters.clarity) queryParams.push(`clarity=${filters.clarity}`);

        apiUrl += queryParams.join("&");
      }

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []); // Refetch data when filters change

  // Handler for applying filters
  const applyFilters = () => {
    fetchData();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Item Data</h1>
      <div className="mb-4">
        <label htmlFor="companyName" className="mr-2">
          Company Name:
        </label>
        <input
          type="text"
          id="companyName"
          className="border border-gray-300 px-2 py-1 rounded"
          value={filters.companyName}
          onChange={(e) =>
            setFilters({ ...filters, companyName: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <label htmlFor="size" className="mr-2">
          Size:
        </label>
        <input
          type="text"
          id="size"
          className="border border-gray-300 px-2 py-1 rounded"
          value={filters.size}
          onChange={(e) => setFilters({ ...filters, size: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="clarity" className="mr-2">
          Clarity:
        </label>
        <input
          type="text"
          id="clarity"
          className="border border-gray-300 px-2 py-1 rounded"
          value={filters.clarity}
          onChange={(e) => setFilters({ ...filters, clarity: e.target.value })}
        />
      </div>
      <button
        onClick={applyFilters}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md mb-4"
      >
        Apply Filters
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          {/* Table headers */}
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-4 py-2 text-left">Num</th>
              <th className="px-4 py-2 text-left">Stock ID</th>
              <th className="px-4 py-2 text-left">Our Stock</th>
              <th className="px-4 py-2 text-left">Lab</th>
              <th className="px-4 py-2 text-left">Certificate</th>
              <th className="px-4 py-2 text-left">Company Name</th>
              <th className="px-4 py-2 text-left">Shape</th>
              <th className="px-4 py-2 text-left">Size</th>
              <th className="px-4 py-2 text-left">Color</th>
              <th className="px-4 py-2 text-left">Clarity</th>
              <th className="px-4 py-2 text-left">Cut</th>
              <th className="px-4 py-2 text-left">Pol</th>
              <th className="px-4 py-2 text-left">Sym</th>
              <th className="px-4 py-2 text-left">Fl</th>
              <th className="px-4 py-2 text-left">Rap</th>
              <th className="px-4 py-2 text-left">B Dis</th>
              <th className="px-4 py-2 text-left">B PC</th>
              <th className="px-4 py-2 text-left">B Amount</th>
              <th className="px-4 py-2 text-left">Sell Dis</th>
              <th className="px-4 py-2 text-left">Sell PC</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">5% Amount</th>
              <th className="px-4 py-2 text-left">Lab Cost</th>
              <th className="px-4 py-2 text-left">Other Ch</th>
              <th className="px-4 py-2 text-left">Expo C</th>
              <th className="px-4 py-2 text-left">Total Sell</th>
              <th className="px-4 py-2 text-left">Rate</th>
              <th className="px-4 py-2 text-left">RS Amount</th>
              <th className="px-4 py-2 text-left">Bill Amount</th>
              <th className="px-4 py-2 text-left">Expo Rate</th>
              <th className="px-4 py-2 text-left">Broker</th>
              <th className="px-4 py-2 text-left">Expo Num</th>
              <th className="px-4 py-2 text-left">Through</th>
              <th className="px-4 py-2 text-left">Type</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {data.map((item) => (
              <tr key={item._id} className="border-b border-gray-200">
                <td className="px-4 py-2">{item.num}</td>
                <td className="px-4 py-2">{item.stockID}</td>
                <td className="px-4 py-2">{item.ourStock}</td>
                <td className="px-4 py-2">{item.lab}</td>
                <td className="px-4 py-2">{item.certificate}</td>
                <td className="px-4 py-2">{item.companyName}</td>
                <td className="px-4 py-2">{item.shape}</td>
                <td className="px-4 py-2">{item.size}</td>
                <td className="px-4 py-2">{item.color}</td>
                <td className="px-4 py-2">{item.clarity}</td>
                <td className="px-4 py-2">{item.cut}</td>
                <td className="px-4 py-2">{item.pol}</td>
                <td className="px-4 py-2">{item.sym}</td>
                <td className="px-4 py-2">{item.fl}</td>
                <td className="px-4 py-2">{item.rap}</td>
                <td className="px-4 py-2">{item.bDis}</td>
                <td className="px-4 py-2">{item.bPC}</td>
                <td className="px-4 py-2">{item.bAmount}</td>
                <td className="px-4 py-2">{item.sellDis}</td>
                <td className="px-4 py-2">{item.sellPC}</td>
                <td className="px-4 py-2">{item.amount}</td>
                <td className="px-4 py-2">{item.fivePercent}</td>
                <td className="px-4 py-2">{item.labCost}</td>
                <td className="px-4 py-2">{item.otherCh}</td>
                <td className="px-4 py-2">{item.expoC}</td>
                <td className="px-4 py-2">{item.totalSell}</td>
                <td className="px-4 py-2">{item.rate}</td>
                <td className="px-4 py-2">{item.rsAmount}</td>
                <td className="px-4 py-2">{item.billAmount}</td>
                <td className="px-4 py-2">{item.expoRate}</td>
                <td className="px-4 py-2">{item.broker}</td>
                <td className="px-4 py-2">{item.expoNum}</td>
                <td className="px-4 py-2">{item.through}</td>
                <td className="px-4 py-2">{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LandingPage;
