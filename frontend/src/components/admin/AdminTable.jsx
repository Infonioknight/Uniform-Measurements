import React from 'react';
import DataTable from 'react-data-table-component';

const customStyles = {
	headCells: {
		style: {
			fontSize: '20px',
			fontWeight: 'bold',
			backgroundColor: '#f8444f', // Table header background color
			color: 'white', // Header text color
			paddingLeft: '12px', // Custom padding
			paddingRight: '12px',
		},
	},
	cells: {
		style: {
			paddingLeft: '12px',
			paddingRight: '12px',
			borderBottom: '1px solid #868686', // Add border between rows
			fontSize: '16px', // Font size for table data
		},
	},
	rows: {
		style: {
			'&:hover': {
				backgroundColor: '#d7eae9', // Row hover effect
			},
			fontSize: '16px',
		},
	},
    pagination: {
        style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'black',
            
        },
    },
	
};

const columns = [
  {
    name: 'ID',
    selector: row => row.id,
    sortable: true,
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Age',
    selector: row => row.age,
    sortable: true,
  },
  // Add more columns as needed
];


const AdminTable = ({columns, data}) => {

  return (
    
    <div style={{ padding: '20px' }}>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        customStyles={customStyles}
      />
    </div>
  );
}

export default AdminTable;
