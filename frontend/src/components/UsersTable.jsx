import React, { useState, useEffect, useMemo } from "react";

const API_URL = "https://reqres.in/api/users";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });

  // --- Fetch Data Once ---
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data.data)) {
          setUsers(data.data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // --- Search ---
  const filteredUsers = useMemo(() => {
    let currentUsers = users;

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      currentUsers = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(lower) ||
          user.last_name.toLowerCase().includes(lower) ||
          user.email.toLowerCase().includes(lower)
      );
    }
    return currentUsers;
  }, [users, searchTerm]);

  // --- Sort ---
  const sortedUsers = useMemo(() => {
    let sorted = [...filteredUsers];

    sorted.sort((a, b) => {
      const keyA = a[sortConfig.key];
      const keyB = b[sortConfig.key];

      if (keyA < keyB) return sortConfig.direction === "ascending" ? -1 : 1;
      if (keyA > keyB) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredUsers, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const renderSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? "▲" : "▼";
  };

  // --- Frontend Pagination ---
  const itemsPerPage = 2;

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedUsers.slice(start, start + itemsPerPage);
  }, [sortedUsers, currentPage]);

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  // --- Loading Spinner ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">User Directory</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
      />

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["id", "first_name", "last_name", "email"].map((key) => (
                <th
                  key={key}
                  onClick={() => requestSort(key)}
                  className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition duration-150"
                >
                  {key
                    .replace("_", " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}{" "}
                  {renderSortIndicator(key)}
                </th>
              ))}
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avatar
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-4">{user.id}</td>
                  <td className="px-4 py-4">{user.first_name}</td>
                  <td className="px-4 py-4">{user.last_name}</td>
                  <td className="px-4 py-4 text-blue-600">{user.email}</td>
                  <td className="px-4 py-4">
                    <img
                      src={user.avatar}
                      alt={user.first_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
