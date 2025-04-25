# AI Safety Incident Dashboard

A Next.js application for tracking, filtering, and reporting AI safety incidents. This dashboard provides a clean interface for managing AI safety incidents with features for filtering, sorting, and adding new incidents.

AI Safety Dashboard Live link
```
https://incident-dasboard.vercel.app
```
## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Component Breakdown](#component-breakdown)
- [Future Enhancements](#future-enhancements)

## Features

- **Incident Listing**: View all AI safety incidents with their title, severity, and reported date
- **Filtering**: Filter incidents by severity level (All, Low, Medium, High)
- **Sorting**: Sort incidents by date (Newest First, Oldest First)
- **Expandable Details**: Toggle visibility of full incident descriptions
- **Incident Reporting**: Add new incidents via a validated form
- **Responsive Design**: Works on mobile, tablet, and desktop devices

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling and responsive design
- **shadcn/ui**: Component library for consistent UI elements
- **React Hooks**: For state management and component logic

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-safety-dashboard.git
   cd ai-safety-dashboard
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

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
ai-safety-dashboard/
├── app/
│   ├── page.tsx           # Main page component
│   └── layout.tsx         # Root layout
├── components/
│   ├── ai-safety-dashboard.tsx  # Main dashboard component
│   ├── incident-card.tsx        # Individual incident display
│   └── new-incident-form.tsx    # Form for adding new incidents
├── lib/
│   └── types.ts           # TypeScript type definitions
└── public/
    └── ...                # Static assets
```

## Usage Guide

### Viewing Incidents

The dashboard displays all incidents by default. Each incident card shows:
- Title of the incident
- Severity level (color-coded badge)
- Reported date
- "View Details" button to expand and see the full description

### Filtering and Sorting

1. **Filter by Severity**:
   - Use the "Filter by Severity" dropdown to select All, Low, Medium, or High severity incidents
   - The list will update immediately to show only matching incidents

2. **Sort by Date**:
   - Use the "Sort by Date" dropdown to choose between "Newest First" or "Oldest First"
   - The list will reorder based on your selection

### Reporting New Incidents

1. Click the "Report New Incident" button to show the form
2. Fill in the required fields:
   - Title: A concise name for the incident
   - Description: Detailed information about what happened
   - Severity Level: Select Low, Medium, or High
3. Click "Submit Incident Report" to add the incident to the list
4. The form will validate all fields and show error messages if needed
5. After successful submission, the form will close and the new incident will appear in the list

### Expanding Incident Details

- Click "View Details" on any incident card to see its full description
- Click "Hide Details" to collapse the description

## Component Breakdown

### AISafetyDashboard

The main component that:
- Manages the state for incidents, filters, and sorting
- Handles the logic for filtering and sorting incidents
- Manages the expanded/collapsed state of incident details
- Controls the visibility of the new incident form
- Adds new incidents to the list

### IncidentCard

Displays a single incident with:
- Title, severity badge, and reported date
- Toggle button for expanding/collapsing details
- Conditional rendering of the description when expanded

### NewIncidentForm

Provides a form for adding new incidents with:
- Input fields for title, description, and severity
- Form validation with error messages
- Submission handling

## Future Enhancements

Potential improvements for future versions:

- Persistent storage using localStorage or a backend database
- User authentication and role-based permissions
- Advanced filtering options (date range, keywords)
- Incident status tracking (Open, In Progress, Resolved)
- Data visualization and statistics dashboard
- Export functionality (CSV, PDF)
- Dark mode support

## License

[MIT](LICENSE)
