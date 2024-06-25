CREATE DEFINER=`root`@`localhost` PROCEDURE `list_employees_without_loan_accounts`()
BEGIN
    SELECT * 
    FROM Employee e 
    WHERE NOT EXISTS (
        SELECT * 
        FROM loanaccounts a 
        WHERE a.LoanOfficer = e.eid
    );
END