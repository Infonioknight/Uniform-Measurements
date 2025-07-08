import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  // Create an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4 lg:w-6/12  md:w-6/12 w-11/12 mx-auto">
      <button
        onClick={handlePreviousPage}
        className="px-4 py-2 mx-1 font-poppins font-bold bg-gray-300 rounded hover:bg-gray-400"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-3 py-2 mx-1 font-poppins font-bold ${page === currentPage ? 'bg-crimson text-white' : 'bg-gray-300'} rounded hover:bg-gray-400`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        className="px-4 py-2 mx-1 font-poppins font-bold bg-gray-300 rounded hover:bg-gray-400"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
