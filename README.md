# Fertilizer Analytics Dashboard

This project is a web application that serves as a dashboard to visualize fertilizer requirement and availability data across various states in India. It is designed to provide meaningful insights through tables and graphs to improve the company's supply chain.

This project was built as an assignment, and the following tasks were completed based on the requirements.

## Key Features & Changes

### 1. Dynamic Data in Bigchart.jsx
- **Removed Hardcoded Data:** The `Bigchart.jsx` component was initially using hardcoded data for states and months. This has been replaced with dynamic data sourced directly from `result.js`.
- **Dynamic Dropdowns:** The dropdown menus for selecting "State" and "Month" are now dynamically populated based on the unique values present in the dataset. This ensures that the chart always reflects the available data accurately.

### 2. Top 5 Products Tables
- **Top 5 Required Products:** A new table has been added to the dashboard that displays the top 5 fertilizers with the highest requirement. The data is calculated dynamically, and the table shows each product's percentage contribution to the total requirement.
- **Top 5 Available Products:** Similarly, a table for the top 5 most available fertilizers has been implemented. This table also shows the percentage contribution of each product to the total availability.
- **Synced with Pie Charts:** Both tables are synchronized with their corresponding pie charts, ensuring data consistency across the dashboard.

### 3. Fertilizer Availability & Requirements Across the Year
- **New Chart Implementation:** A new chart has been added to `Featured.jsx` that visualizes the availability and requirements of fertilizers across the year. This provides a clear overview of the demand and supply trends over time.

### 4. Tabular Representation of Data with AG Grid
- **AG Grid Integration:** The project now uses AG Grid to display the raw data in a tabular format.
- **Enhanced Functionality:** The grid includes features like sorting, filtering, and column resizing, allowing for easy data exploration and analysis.

### 5. Dark Mode Toggle
- **Theme Switching:** Implemented a dark mode toggle that allows users to switch between a light and dark theme for better visual comfort.

### 6. Assignment Page
- **Dedicated Route:** A new page has been created at the `/Assignment` route, which showcases the core features of the assignment in a focused view.

These changes fulfill all the requirements of the assignment, providing a comprehensive and interactive dashboard for fertilizer data analysis.

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- Node.js (v14.17.6 or greater)
- npm (v6.14.15 or greater)

### Installation and Setup

1. Clone the repo
   ```sh
   git clone https://github.com/abhishekpandey26/Assignment_fyllo.git
   ```
2. Install packages
   ```sh
   npm install
   ```
3. To start server
   ```sh
    npm start
   ```
4. To visit App
   ```sh
   localhost:3000
   ```
