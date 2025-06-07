import { useState, useEffect } from "react"; // ADDED: useEffect for dynamic data extraction
import "./Bigchart.css";

import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  Legend,
} from "recharts";

function Bigchart({
  title,
  data,
  dataKey,
  grid,
  parent,
  child,
  subtitle,
  defaultValue,
}) {
  // ❌ PROBLEM: HARDCODED ARRAYS - These might not match your actual data
  /*
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const states = [
    "Andaman & Nicobar",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chattishgarh",
    "Dadra & Nagar Haveli",
    "Delhi",
    "Goa",
    "Gujarat",
    "Harayana",
    "Himachal Pradesh",
    "Jammu & Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharastra",
    "Manipur",
    "Megalaya",
    "Mizoram",
    "Nagaland",
    "Orissa",
    "Pondicherry",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Tripura",
    "Telangana",
    "Uttar Pradesh",
    "Uttaranchal",
    "West Bengal",
    "Daman & Diu",
    "Lakshadweep",
    "Sikkim",
  ]
  */

  // ✅ FIXED: DYNAMIC ARRAYS - Extract from actual data
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const [uniqueStates, setUniqueStates] = useState([]);

  // ❌ PROBLEM: Using hardcoded array values that might not exist in data
  /*
  const [statevalue, setStatevalue] = useState(states[0])
  const [monthvalue, setMonthvalue] = useState(months[0])
  */

  // ✅ FIXED: Initialize with empty strings, set real values in useEffect
  const [statevalue, setStatevalue] = useState("");
  const [monthvalue, setMonthvalue] = useState("");

  // ✅ NEW: Extract unique values from actual data on component mount
  useEffect(() => {
    if (data && data.length > 0) {
      // Get unique months from your actual data
      const months = [...new Set(data.map((item) => item.month))].filter(
        Boolean
      );
      setUniqueMonths(months);

      // Get unique states from your actual data
      const states = [...new Set(data.map((item) => item.state))].filter(
        Boolean
      );
      setUniqueStates(states);

      // Set default values from real data
      if (months.length > 0) setMonthvalue(months[0]);
      if (states.length > 0) setStatevalue(states[0]);
    }
  }, [data]);

  function OnchangeSetstatevalue(e) {
    setStatevalue(e.target.value);
  }
  function OnchangeSetmonthvalue(e) {
    setMonthvalue(e.target.value);
  }

  // ✅ YOUR ORIGINAL FILTERING LOGIC (This was actually correct!)
  let chartData = data.filter((obj) => {
    if (obj["state"] === statevalue && obj["month"] === monthvalue) {
      return true;
    }
    return false;
  });

  // ✅ YOUR ORIGINAL DATA PROCESSING (This was also correct!)
  for (let element of chartData) {
    element["requirement_in_mt_"] = parseFloat(element["requirement_in_mt_"]);
    element["availability_in_mt_"] = parseFloat(element["availability_in_mt_"]);
  }

  // ✅ IMPROVED: Filter out zero values for better visualization (OPTIONAL)
  chartData = chartData.filter(
    (item) => item.requirement_in_mt_ > 0 || item.availability_in_mt_ > 0
  );

  return (
    <div className="bigchart">
      <h3 className="bigchartTitle">{title}</h3>

      <div className="bigchartSelect">
        <h5>Month</h5>
        {/* ❌ OLD: Using hardcoded months array */}
        {/* 
        <select onChange={OnchangeSetmonthvalue}>
          {months.map((e) => {
            return (
              <option key={e} value={e}>
                {e}
              </option>
            )
          })}
        </select>
        */}

        {/* ✅ FIXED: Using dynamic months from actual data */}
        <select value={monthvalue} onChange={OnchangeSetmonthvalue}>
          {uniqueMonths.map((e) => {
            return (
              <option key={e} value={e}>
                {e}
              </option>
            );
          })}
        </select>

        <h5>State</h5>
        {/* ❌ OLD: Using hardcoded states array */}
        {/* 
        <select onChange={OnchangeSetstatevalue}>
          {states.map((e) => {
            return (
              <option key={e} value={e}>
                {e}
              </option>
            )
          })}
        </select>
        */}

        {/* ✅ FIXED: Using dynamic states from actual data */}
        <select value={statevalue} onChange={OnchangeSetstatevalue}>
          {uniqueStates.map((e) => {
            return (
              <option key={e} value={e}>
                {e}
              </option>
            );
          })}
        </select>

        {/* ✅ YOUR ORIGINAL ERROR MESSAGE (Good!) */}
        {chartData.length ? null : (
          <h6 className="errordata">No data available to show</h6>
        )}
      </div>

      {/* ✅ YOUR ORIGINAL CHART (This was perfect!) */}
      <ResponsiveContainer width="100%" height="100%" aspect={2 / 1}>
        <BarChart
          width={700}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={"product"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="requirement_in_mt_" fill="#60AC4A" />
          <Bar dataKey="availability_in_mt_" fill="#FF6347" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Bigchart;
