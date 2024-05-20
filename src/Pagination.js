import React, { useState, useEffect } from 'react';
import './Pagination.css'; // Import CSS file

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      const json = await response.json();
      setData(json);
      setTotalPages(Math.ceil(json.length / 10));
    } catch (error) {
      alert('Failed to fetch data');
      console.error(error);
    }
  };

  const handlePrevious = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = Math.min(startIndex + 10, data.length);

  const visibleData = data.slice(startIndex, endIndex);

  return (
    <div className="pagination-container">
      <table className="data-table">
        <thead>
          <tr>
          <th>ID</th>
          <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            {/* Add other column headers */}
          </tr>
        </thead>
        <tbody>
          {visibleData.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>

              <td>{employee.email}</td>
              <td>{employee.role}</td>
              {/* Add other columns */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-buttons">
        <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Pagination;
