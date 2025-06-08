import { useState, useEffect } from "react"
import "./YearlyChart.css" 

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
  Area,
  AreaChart
} from "recharts"

function YearlyChart({ title, data }) {
  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [uniqueProducts, setUniqueProducts] = useState([])
  const [uniqueStates, setUniqueStates] = useState([])
  const [chartData, setChartData] = useState([])

  
  useEffect(() => {
    if (data && data.length > 0) {
      const products = [...new Set(data.map(item => item.product))].filter(Boolean)
      const states = [...new Set(data.map(item => item.state))].filter(Boolean)
      
      setUniqueProducts(products)
      setUniqueStates(states)
      
      
      if (products.length > 0) setSelectedProduct(products[0])
      if (states.length > 0) setSelectedState(states[0])
    }
  }, [data])

  
  useEffect(() => {
    if (selectedProduct && selectedState && data.length > 0) {
      
      const filteredData = data.filter(item => 
        item.product === selectedProduct && item.state === selectedState
      )

      
      const monthlyData = filteredData.reduce((acc, item) => {
        const month = item.month
        const requirement = parseFloat(item.requirement_in_mt_) || 0
        const availability = parseFloat(item.availability_in_mt_) || 0

        if (!acc[month]) {
          acc[month] = {
            month: month,
            requirement: 0,
            availability: 0,
            shortage: 0
          }
        }

        acc[month].requirement += requirement
        acc[month].availability += availability
        acc[month].shortage = acc[month].requirement - acc[month].availability

        return acc
      }, {})

      
      const monthOrder = [
        'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December', 'January', 'February', 'March'
      ]

      const sortedData = Object.values(monthlyData).sort((a, b) => {
        return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
      })

      setChartData(sortedData)
    }
  }, [selectedProduct, selectedState, data])

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value)
  }

  const handleStateChange = (e) => {
    setSelectedState(e.target.value)
  }

  return (
    <div className="yearly-chart">
      <h3 className="yearly-chart-title">{title}</h3>
      
      <div className="yearly-chart-controls">
        <div className="control-group">
          <label>Select Fertilizer:</label>
          <select value={selectedProduct} onChange={handleProductChange}>
            {uniqueProducts.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>
        
        <div className="control-group">
          <label>Select State:</label>
          <select value={selectedState} onChange={handleStateChange}>
            {uniqueStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      {chartData.length > 0 ? (
        <div className="chart-container">
          
          <div className="chart-section">
            <h4>Monthly Trend Analysis</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value.toLocaleString()} MT`,
                    name === 'requirement' ? 'Required' : 
                    name === 'availability' ? 'Available' : 'Shortage'
                  ]}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="requirement" 
                  stroke="#60AC4A" 
                  strokeWidth={3}
                  name="Requirement"
                />
                <Line 
                  type="monotone" 
                  dataKey="availability" 
                  stroke="#FF6347" 
                  strokeWidth={3}
                  name="Availability"
                />
                <Line 
                  type="monotone" 
                  dataKey="shortage" 
                  stroke="#FF0000" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Shortage"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          
          <div className="chart-section">
            <h4>Monthly Comparison</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value.toLocaleString()} MT`,
                    name === 'requirement' ? 'Required' : 'Available'
                  ]}
                />
                <Legend />
                <Bar dataKey="requirement" fill="#60AC4A" name="Required" />
                <Bar dataKey="availability" fill="#FF6347" name="Available" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          
          <div className="chart-section">
            <h4>Supply-Demand Gap Analysis</h4>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value.toLocaleString()} MT`,
                    name === 'requirement' ? 'Required' : 'Available'
                  ]}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="requirement"
                  stackId="1"
                  stroke="#60AC4A"
                  fill="#60AC4A"
                  fillOpacity={0.3}
                  name="Required"
                />
                <Area
                  type="monotone"
                  dataKey="availability"
                  stackId="2"
                  stroke="#FF6347"
                  fill="#FF6347"
                  fillOpacity={0.3}
                  name="Available"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="no-data-message">
          <p>No data available for {selectedProduct} in {selectedState}</p>
        </div>
      )}
    </div>
  )
}

export default YearlyChart