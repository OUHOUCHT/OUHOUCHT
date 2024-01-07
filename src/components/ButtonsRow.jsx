import TableRowItem from "./TableRowItem";
import left_arrow  from '/left-arrow-svgrepo-com.svg';


// Reusable Buttons Row Component
const ButtonsRow = ({ handleShowModal }) => (
    <>
      <TableRowItem link="https://www.parlement.ma/" label="البوابة الإلكترونية" icon={left_arrow} onClick={handleShowModal} />
      <TableRowItem link="#" label="إصدارات البرلمان" icon={left_arrow} />
      <TableRowItem link="#" label="الصور" icon={left_arrow} />
      <TableRowItem link="#" label="الوثائق" icon={left_arrow} />
      <TableRowItem link="https://bibliotheque.parlement.ma/" label="المكتبة" icon={left_arrow} />
      <TableRowItem link="http://portail.parlement.ma:9080/navigator/" label="الأرشيف" icon={left_arrow} />
    </>
  );


  export default ButtonsRow;