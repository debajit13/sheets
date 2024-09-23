<p align="center">
  <img style="border-width: 0; border-radius: 14px" width="400" height="400" src="./src/assets/logo.png" alt="Sheets logo">
</p>

# Sheets

Sheets is a lightweight spreadsheet application built using **React**, **TypeScript**, **Tailwind CSS**, and **Vite**. The application allows users to create, manage, and edit spreadsheet-like data stored locally in the browser using `localStorage`.

## Features

- Create multiple sheets (files) with unique filenames.
- Add infinite amount of rows and columns without putting much load on the device.
- View a list of available files on the homepage.
- Edit spreadsheet data for each sheet with full support for cell selection and input.
- Persist sheet data and filenames using `localStorage` for offline use.
- Smooth routing to different sheet files using `react-router-dom`.

## Project Structure

- **Home Page**: Displays a list of existing sheets saved in `localStorage`. Users can select a sheet to view and edit its content.
- **File Page**: Loads a selected sheet's data and filename. Users can interact with and update the data directly.
- **Sheet Component**: Handles the spreadsheet rendering, cell selection, and data input functionalities.
- **LocalStorage**: Data persistence is achieved using `localStorage` to store filenames and sheet data. This includes multiple file management, each with a unique ID.

## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **Components**: React Toastify
- **Build Tool**: Vite
- **Routing**: React Router
- **Icons**: React Icons

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**: Download and install from [nodejs.org](https://nodejs.org/)
- **pnpm**: You can install pnpm via `npm install -g pnpm`

### Installation

1. Fork and Clone the repository:

   Firstly, Fork this repo and make a copy of the project in your GitHub. Then, clone the project using,

   ```bash
   git clone https://github.com/debajit13/sheets.git
   cd sheets
   ```

2. Install the dependencies:

   Using pnpm:

   ```bash
   pnpm install
   ```

3. Start the development server:

   Using pnpm:

   ```bash
   pnpm run dev
   ```

4. Open your browser and visit `http://localhost:5173`.

### Project Structure

```plaintext
src/
│
├── assets/
│   └── logo.png                      # Logo for the application
│
├── components/
│   ├── global/
│   │   └── SheetCard.tsx             # Component to render a card representing a sheet (file)
│   ├── layout/
│   │   ├── HomeHeader.tsx            # Header component for the homepage
│   │   └── SheetHeader.tsx           # Header component for the sheet page
│   └── Sheet.tsx                     # Main spreadsheet component
│
├── constants/
│   └── data.ts                       # Constant values for cell sizes, colors, etc.
│
├── layout/
│   └── Root.tsx                      # Root layout component that wraps around pages
│
├── pages/
│   ├── Home.tsx                      # Homepage where list of sheets are displayed
│   ├── SheetPage.tsx                 # Page where the selected sheet is opened and displayed
│   └── NotFound.tsx                  # 404 page for non-existent routes
│
├── router/
│   └── Router.tsx                    # Routing setup for the application
│
├── types/
│   └── types.ts                      # TypeScript interfaces for the application
│
├── utils/
│   └── utils.ts                      # Utility functions like calculating rows/columns, resizing canvas
│
├── App.tsx                  # Main entry point for the app
├── index.tsx                # React DOM rendering
└── main.css                 # Tailwind CSS entry point
```

### Usage

1. Creating a New Sheet: Start by navigating to the homepage and click on the "+ New Sheet" button to create a new sheet. You can edit the default filename and click “Save Name” to save the name.
1. Viewing and Editing Sheets: On the homepage, you’ll see a list of all saved sheets. Click on any sheet to open it. You can then select cells and input data.
1. Persistence: All data is saved in localStorage, so it will persist even after closing the browser or refreshing the page.

### Routing

- The homepage is available at /, where you can view all available sheets and create a new sheet.
- A specific sheet can be accessed by navigating to /sheet/:id.

### Local Storage Structure

Data is saved in localStorage under the key files. Each file contains the following structure:

```json
{
  "id": "unique-file-id",
  "filename": "MySheet",
  "sheetData": [
    ["A1", "B1"],
    ["A2", "B2"]
  ]
}
```

### Future Enhancements

- Add support for importing/exporting sheet data (e.g., CSV, JSON).
- Login feature so users can see their sheets from any laptop.
- Mobile Support so that users can also edit their sheets also from mobile phones.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Contributions

Contributions are welcome! Feel free to open issues or submit pull requests.

<p align='center'>Made with ❤️ and ☕️ by Debajit Mallick</p>
