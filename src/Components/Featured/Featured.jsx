import { data } from "../../result.js"
import "./Featured.css"
import Chart from "../Chart/Chart"
import Bigchart from "../Bigchart"
import Piechart from "../Piechart"
import YearlyChart from "../YearlyChart/YearlyChart.js"

function Featured() {
  // Top 5 Required
  const productRequirements = data.reduce((acc, curr) => {
    const requirement = parseFloat(curr.requirement_in_mt_);
    if (!isNaN(requirement)) {
        acc[curr.product] = (acc[curr.product] || 0) + requirement;
    }
    return acc;
  }, {});
  const requiredProductArray = Object.keys(productRequirements).map(product => ({
      name: product,
      value: productRequirements[product]
  }));
  const totalRequirement = requiredProductArray.reduce((sum, item) => sum + item.value, 0);
  requiredProductArray.sort((a, b) => b.value - a.value);
  const top5RequiredProducts = requiredProductArray.slice(0, 5);
  const requiredTableData = top5RequiredProducts.map(item => ({
      product: item.name,
      percentage: totalRequirement > 0 ? ((item.value / totalRequirement) * 100).toFixed(0) + '%' : '0%'
  }));

  // Top 5 Available
  const productAvailability = data.reduce((acc, curr) => {
    const availability = parseFloat(curr.availability_in_mt_);
    if (!isNaN(availability)) {
        acc[curr.product] = (acc[curr.product] || 0) + availability;
    }
    return acc;
  }, {});
  const availableProductArray = Object.keys(productAvailability).map(product => ({
      name: product,
      value: productAvailability[product]
  }));
  const totalAvailability = availableProductArray.reduce((sum, item) => sum + item.value, 0);
  availableProductArray.sort((a, b) => b.value - a.value);
  const top5AvailableProducts = availableProductArray.slice(0, 5);
  const availableTableData = top5AvailableProducts.map(item => ({
      product: item.name,
      percentage: totalAvailability > 0 ? ((item.value / totalAvailability) * 100).toFixed(0) + '%' : '0%'
  }));

  return (
    <div className="featured">
      
      <div className="featuredpiechart">
        <Piechart
          data={data}
          title="Top 5 Required products"
          dataKey="requirement_in_mt_"
        />
        <Piechart
          data={data}
          title="Top 5 Available products"
          dataKey="availability_in_mt_"
        />
      </div>

      <div className="featured-table-container">
        <div className="featured-table-card">
          <h3 className="featured-table-title">Top 5 Required (Table)</h3>
          <table className="featured-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {requiredTableData.map((item, index) => (
                <tr key={index}>
                  <td>{item.product}</td>
                  <td>{item.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="featured-table-card">
          <h3 className="featured-table-title">Top 5 Available (Table)</h3>
          <table className="featured-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {availableTableData.map((item, index) => (
                <tr key={index}>
                  <td>{item.product}</td>
                  <td>{item.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Bigchart
        data={data}
        title="Product Availability and Requirements"
        grid
      />
      <YearlyChart
        data={data}
        title="Fertilizer Availability & Requirements Across the Year"
      />
      <div className="featuredItem">
        <div className="widgetsm">
          <Chart
            data={data}
            title="State wise product"
            grid
            parent="state"
            child="product"
            defaultValue={data[0]}
          />
        </div>

        <div className="widgetsm">
          <Chart
            data={data}
            title="Year wise product"
            grid
            parent="_year"
            child="product"
            defaultValue={data[0]}
          />
        </div>

        <div className="widgetsm">
          <Chart
            data={data}
            title="Month wise product"
            grid
            parent="month"
            child="product"
            defaultValue={data[0]}
          />
        </div>
      </div>
    </div>
  )
}

export default Featured
