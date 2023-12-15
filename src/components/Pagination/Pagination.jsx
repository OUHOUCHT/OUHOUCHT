/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import './Pagination.css'

const Pagination = ({ currentPage, totalPages, onPageChange ,loading}) => {
  
  if (totalPages <= 0) {
    return null;
  }
  
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);



  return (
    !loading &&  <nav aria-label="تنقل الصفحات"  >
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <Button variant="light" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>&laquo; السابق</Button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''} separated-li`}>
            <Button className="page-link" variant={currentPage === number ? 'primary' : 'light'} onClick={() => onPageChange(number)}>
              {number}
            </Button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <Button variant="light"   onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>التالي &raquo;</Button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
