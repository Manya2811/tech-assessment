# ⚛️ Frontend Task: User Directory Table

## 🎯 Objective

This project implements a mobile-responsive React application to fetch and manage user data in a table format, complete with dynamic features like search, sorting, and client-side pagination.

---

## 🚀 Setup Instructions

1.  **Clone the Repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd frontend
    ```
2.  **Install Dependencies:** Navigate to the `frontend` directory and install the necessary packages.
    ```bash
    npm install
    ```
3.  **Run the Application:**
    ```bash
    npm run dev  # or npm start
    ```
4.  The application will be available at `http://localhost:[PORT]`.

---

## ✨ Key Features Implemented

The application meets all core requirements and includes bonus features:

| Feature                      | Implementation Detail                                                                                                                                                    | Status      |
| :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| **Data Fetching**            | Fetches user list from the configured API endpoint (`reqres.in`).                                                                                                        | ✅ Complete |
| **Search**                   | **Dynamic, real-time search** across **First Name, Last Name, and Email** fields.                                                                                        | ✅ Complete |
| **Sorting**                  | Sortable columns by **ID, First Name, Last Name, and Email**. Supports ascending (`▲`) and descending (`▼`) order.                                                       | ✅ Complete |
| **Pagination (Client-Side)** | Implemented **frontend pagination**, limiting the display to **2 items per page** (`itemsPerPage = 2`). Calculates total pages based on the filtered/sorted data length. | ✅ Complete |
| **UI/CSS Framework**         | Styled entirely using **Tailwind CSS** for a clean, modern, and utility-first design.                                                                                    | ✅ Complete |
| **Loading Spinner**          | Displays an animated loading spinner (`animate-spin`) while fetching data.                                                                                               | ✅ Bonus    |
| **Mobile Responsive**        | Uses flexible Tailwind classes to ensure the layout adapts gracefully to smaller screens.                                                                                | ✅ Bonus    |

---

## 💻 Technical Approach

- **Framework:** React with Functional Components and Hooks.
- **Performance:** **`useMemo`** is strategically used for the three critical calculation chains: **Filtering** -> **Sorting** -> **Pagination**. This prevents expensive calculations on every render, recalculating only when dependencies (`users`, `searchTerm`, `sortConfig`, `currentPage`) change.
- **State Management:** **`useState`** manages all dynamic application state (data, loading, page number, sort configuration).
- **Pagination Logic:** Pagination is applied _after_ sorting the full filtered list (`sortedUsers.slice(start, end)`), ensuring the user sees contiguous, sorted data across pages.
- **Error Handling:** Includes a `try...catch` block in `useEffect` to handle network errors and API status codes, ensuring the app remains stable even on failed requests.

---

## 📌 File Structure

The main logic resides within the `frontend/src/components` directory.
