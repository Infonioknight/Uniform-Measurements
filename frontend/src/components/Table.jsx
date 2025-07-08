import PropTypes from "prop-types";
import DataTable from "react-data-table-component";

const MyTable = ({ columns, data, title }) => {
  return (
    <div>
      <DataTable
        title={title}
        columns={columns}
        data={data}
        pagination
        highlightOnHover
      />
    </div>
  );
};

MyTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
};

export default MyTable;