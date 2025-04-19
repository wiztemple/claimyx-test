# Healthcare Billing Dashboard

A modern, interactive web application for healthcare billing management with revenue forecasting capabilities using Monte Carlo simulation.

## Features

- **Dashboard Summary**
  - Overview of total billing amount
  - Count of claims by status
  - Visual representation of claim distribution

- **Claims Management Table**
  - Filterable and sortable table
  - Search functionality across all fields
  - Column sorting (ascending/descending)
  - Status filtering (All, Pending, Approved, Denied)

- **Revenue Forecasting Tool**
  - Interactive sliders to adjust payment probabilities by status
  - Monte Carlo simulation for revenue projections
  - Responsive UI during calculations
  - Visualized simulation results

- **UI/UX Features**
  - Dark/Light mode support
  - Glassmorphism design
  - Responsive layout for all device sizes
  - Interactive components with smooth animations

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Charts**: Chart.js with react-chartjs-2
- **Theme Management**: next-themes

## Project Structure

```
healthcare-billing-dashboard/
├── app/
│   ├── globals.css         # Global styles and Tailwind imports
│   ├── layout.tsx          # Root layout with ThemeProvider
│   └── page.tsx            # Main dashboard page
├── components/
│   ├── ui/                 # shadcn UI components
│   ├── claims-table.tsx    # Filterable/sortable claims table
│   ├── dashboard.tsx       # Main dashboard wrapper
│   ├── dashboard-header.tsx# Dashboard title and theme toggle
│   ├── dashboard-summary.tsx# Summary cards and chart
│   ├── doughnut-chart.tsx  # Status distribution chart
│   ├── revenue-forecasting.tsx# Monte Carlo simulation tool
│   ├── theme-provider.tsx  # Theme context provider
│   └── theme-toggle.tsx    # Dark/Light mode toggle
├── lib/
│   ├── data.ts             # Mock data and server action
│   └── utils.ts            # Utility functions
└── public/
    └── ...                 # Static assets
```

## Implementation Details

### Component Architecture

The application follows a component-based architecture with clear separation of concerns:

1. **Dashboard Component**: Acts as the main container, handling data fetching and distributing it to child components.

2. **Summary Component**: Shows key metrics and visualizations.

3. **Claims Table Component**: Implements filtering, sorting, and searching functionality.

4. **Revenue Forecasting Component**: Handles the Monte Carlo simulation with adjustable parameters.

### State Management

- React's built-in state management is used for UI state
- Server Actions for data fetching (simulated)

### Responsive Design

- Mobile-first approach using Tailwind's responsive utilities
- Layout adjustments for different screen sizes

### Performance Optimizations

- Monte Carlo simulation runs in batches to maintain UI responsiveness
- Dynamic imports for chart components to optimize initial load time
- Debounced simulation updates when adjusting parameters

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/healthcare-billing-dashboard.git
   cd healthcare-billing-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Future Enhancements

- Add more robust data filtering options
- Implement editable claims
- Add more sophisticated visualization options
- Integrate with a backend API
- Add user authentication
- Export data functionality

## License

MIT

---

Built for Claimyx technical assessment - April 2025