// Reusable Table Row Item Component
const TableRowItem = ({ link, label, icon, onClick }) => (
      <td className="centered-cell">
        <a href={link} onClick={onClick}>
          <div className="button-border-2 animate__animated animate__zoomIn">
            <h2>
              <img className="icon-butt" src={icon} alt="" /> {label}
            </h2>
          </div>
        </a>
      </td>
  );

  export default TableRowItem;