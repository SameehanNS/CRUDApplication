CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_employee`(
    IN eid_param INT,
    IN ename_param VARCHAR(20),
    IN branchId_param INT,
    IN DOE_param DATE,
    IN Designation_param VARCHAR(10),
    IN Salary_param INT
)
BEGIN
    INSERT INTO employee (`eid`, `ename`, `branchId`, `DOE`, `Designation`, `Salary`)
    VALUES (eid_param, ename_param, branchId_param, DOE_param, Designation_param, Salary_param);
END