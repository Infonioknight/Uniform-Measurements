const employeeDetailTemp = async (req, res) => {
    // Set the appropriate headers for file download
    res.setHeader('Content-Disposition', 'attachment; filename=tshirt-details-template.xlsx');
    res.download("templetefile/employee-details-templete.xlsx");
};

const tshirtDetailTemp = async (req, res) => {
    // Set the appropriate headers for file download
    res.setHeader('Content-Disposition', 'attachment; filename=tshirt-details-template.xlsx');
    res.download("templetefile/tshirts-details-template.xlsx");
};

const employeeEmailTemp = async (req, res) => {
    // Set the appropriate headers for file download
    res.setHeader('Content-Disposition', 'attachment; filename=employee-emails-template.xlsx');
    res.download("templetefile/employee-emails.xlsx");
};

module.exports = {
    employeeDetailTemp,
    tshirtDetailTemp,
    employeeEmailTemp,
};
