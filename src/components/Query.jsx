import "./Query.css";
import React, { useEffect, useState, useMemo, useNavigate } from "react";
import axios from "axios";
import { useTable } from "react-table";

const Query = () => {
  const [query, setQuery] = useState([]);
  const [output, setOutput] = useState(false);
  const [showButtonsList, setShowButtonsList] = useState(false);
  const [showButtonsList2, setShowButtonsList2] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [columns, setColumns] = useState([]);
  const [customer, setCustomer] = useState({
    Name: "",
    CustomerId: null,
    DOB: "",
    Gender: "",
    AccountNo: null,
    CustomerType: "",
    AccountType: "",
    BranchId: null,
  });
  const [branch, setBranch] = useState({
    BranchId: null,
    Loc: "",
  });
  const [employee, setEmployee] = useState({
    eid: null,
    ename: "",
    branchId: null,
    DOE: "",
    Designation: "",
    Salary: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (selectedOption === "q1") {
          res = await axios.get("http://localhost:8800/q1");
          setQuery(res.data);
          console.log(res);
        } else if (selectedOption === "q2") {
          res = await axios.get("http://localhost:8800/q2");
          setQuery(res.data);
          console.log(res);
        } else if (selectedOption === "q3") {
          res = await axios.get("http://localhost:8800/q3");
          setQuery(res.data);
          console.log(res);
        } else if (selectedOption === "q4") {
          res = await axios.get("http://localhost:8800/q4");
          setQuery(res.data);
          console.log(res);
        } else if (selectedOption === "q5") {
          res = await axios.get("http://localhost:8800/q5");
          setQuery(res.data);
          console.log(res);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [selectedOption]);

  const data = useMemo(() => query, [query]);
  useEffect(() => {
    if (selectedOption === "q1") {
      setColumns([
        {
          Header: "BranchId",
          accessor: "BranchId",
        },
        {
          Header: "Location",
          accessor: "Loc",
        },
      ]);
    }
    if (selectedOption === "q2") {
      setColumns([
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Gender",
          accessor: "gender",
        },
        {
          Header: "AccountNo",
          accessor: "AccountNo",
        },
      ]);
    }
    if (selectedOption === "q3") {
      setColumns([
        {
          Header: "Eid",
          accessor: "eid",
        },
        {
          Header: "Ename",
          accessor: "ename",
        },
        {
          Header: "branchId",
          accessor: "branchId",
        },
        {
          Header: "DOE",
          accessor: "DOE",
        },
        {
          Header: "Designation",
          accessor: "Designation",
        },
        {
          Header: "Salary",
          accessor: "Salary",
        },
      ]);
    }
    if (selectedOption === "q4") {
      setColumns([
        {
          Header: "AccountNo",
          accessor: "AccountNo",
        },
        {
          Header: "TransactionType",
          accessor: "TransactionType",
        },
        {
          Header: "TransactionId",
          accessor: "TransactionId",
        },
        {
          Header: "Date",
          accessor: "Date",
        },
        {
          Header: "Amount",
          accessor: "Amount",
        },
        {
          Header: "Balance",
          accessor: "Balance",
        },
      ]);
    }
    if (selectedOption === "q5") {
      setColumns([
        {
          Header: "AccountType",
          accessor: "AccountType",
        },
        {
          Header: "Description",
          accessor: "Description",
        },
      ]);
    }
  }, [selectedOption]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  const divStyle = {
    height: "100vh",
  };
  const tAStyle = {
    fontFamily: "monospace",
    resize: "none",
    marginRight: "7px",
    padding: "5px",
    borderRadius: "5px",
    font: "16px sans-serif",
    height: "40px",
    width: "180px",
  };
  /*This is to collect the data for the employee table */
  //const navigate = useNavigate();
  const handleChange1 = (e) => {
    setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick1 = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/p1", employee);
      // navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  /*This is to collect the data for the customer table */
  //const navigate = useNavigate();
  const handleChange2 = (e) => {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick2 = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/p2", customer);
      //  navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  /*This is to collect the data for the customer table */
  //const navigate = useNavigate();
  const handleChange3 = (e) => {
    setBranch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick3 = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/p3", branch);
      //  navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleButtonClick = (text) => {
    if (text === "insert") {
      setShowButtonsList(true);
      setShowButtonsList2(false);
      setOutput(false);
    } else {
      setShowButtonsList(false);
    }
  };

  const handleButtonClick2 = (text) => {
    if (text === "queries") {
      setShowButtonsList2(true);
      setShowButtonsList(false);
      setOutput(false);
    } else {
      setShowButtonsList2(false);
    }
  };
  const handleButtonClick3 = (text) => {
    if (text === "output") {
      setShowButtonsList2(false);
      setShowButtonsList(false);
      setOutput(true);
    } else {
      setOutput(false);
    }
  };

  return (
    <div className="" style={divStyle}>
      <div className="whitespace-nowrap inline-block mt-2 font-normal text-white">
        <div>
          <button
            className="font-montserrat mt-10 ml-16 mr-16 mb-12 pl-6 pr-6 h-12 rounded-xl bg-purple-900 text-white text-xl hover:bg-opacity-75 active:bg-opacity-90"
            onClick={() => handleButtonClick("insert")}
          >
            Insert Tuples
          </button>
          <button
            className="font-montserrat mr-32 pl-6 pr-6 h-12 rounded-xl bg-orange-500 text-white text-xl hover:bg-opacity-75 active:bg-opacity-90"
            onClick={() => handleButtonClick2("queries")}
          >
            Run Queries
          </button>
        </div>
        <div className="block ml-16 mt-0 w-screen">
          {showButtonsList && (
            <div className="pt-0 max-w-screen-md">
              <p className="pt-0 font-montserrat text-xl mb-2">
                Select table for insertion
              </p>
              <input
                type="radio"
                name="insert"
                id="employee"
                value="emp"
                checked={selectedOption === "emp"}
                onChange={handleRadioChange}
              />
               {" "}
              <label
                className="font-montserrat text-xl mr-8 mt-8"
                htmlFor="emp"
              >
                Employee
              </label>
              <input
                type="radio"
                name="insert"
                id="customer"
                value="cust"
                checked={selectedOption === "cust"}
                onChange={handleRadioChange}
              />
               {" "}
              <label
                className="font-montserrat text-xl mr-8 mt-8"
                htmlFor="cust"
              >
                Customer
              </label>
              <input
                type="radio"
                name="insert"
                id="branch"
                value="branch"
                checked={selectedOption === "branch"}
                onChange={handleRadioChange}
              />
               {" "}
              <label
                className="font-montserrat text-xl mr-8 mt-8"
                htmlFor="branch"
              >
                Branch
              </label>
              <div>
                {selectedOption === "emp" && (
                  <div className="mt-4 text-black">
                    <textarea
                      placeholder="Employee ID"
                      style={tAStyle}
                      onChange={handleChange1}
                      name="eid"
                    />
                    <textarea
                      placeholder="Name"
                      style={tAStyle}
                      onChange={handleChange1}
                      name="ename"
                    />
                    <textarea
                      placeholder="Branch"
                      style={tAStyle}
                      onChange={handleChange1}
                      name="branchId"
                    />
                    <textarea
                      placeholder="Date of Employment"
                      style={tAStyle}
                      name="DOE"
                      onChange={handleChange1}
                    />
                    <textarea
                      placeholder="Designation"
                      style={tAStyle}
                      onChange={handleChange1}
                      name="Designation"
                    />
                    <textarea
                      placeholder="Salary"
                      style={tAStyle}
                      onChange={handleChange1}
                      name="Salary"
                    />
                    <button
                      className="text-lg mt-4 p-2 px-4 font-montserrat block rounded-2xl bg-cyan-300 text-black hover:bg-opacity-75 active:bg-opacity-90"
                      onClick={handleClick1}
                    >
                      Submit
                    </button>
                  </div>
                )}
                {selectedOption === "cust" && (
                  <div className="mt-4 text-black">
                    <textarea
                      placeholder="Name"
                      style={tAStyle}
                      name="Name"
                      onChange={handleChange2}
                    />
                    <textarea
                      placeholder="Customer ID"
                      style={tAStyle}
                      name="CustomerId"
                      onChange={handleChange2}
                    />
                    <textarea
                      placeholder="Date of Birth"
                      style={tAStyle}
                      name="DOB"
                      onChange={handleChange2}
                    />
                    <textarea
                      placeholder="Gender"
                      style={tAStyle}
                      name="Gender"
                      onChange={handleChange2}
                    />
                    <textarea
                      placeholder="A/C No."
                      style={tAStyle}
                      name="AccountNo"
                      onChange={handleChange2}
                    />
                    <textarea
                      placeholder="Customer Type"
                      style={tAStyle}
                      name="CustomerType"
                      onChange={handleChange2}
                    />
                    <br></br>
                    <textarea
                      placeholder="Account Type"
                      style={tAStyle}
                      name="AccountType"
                      onChange={handleChange2}
                    />
                    <textarea
                      placeholder="Branch ID"
                      style={tAStyle}
                      name="BranchId"
                      onChange={handleChange2}
                    />
                    <button
                      className="text-lg ml-6 mt-4 p-2 px-4 font-montserrat rounded-2xl bg-cyan-300 text-black hover:bg-opacity-75 active:bg-opacity-90"
                      onClick={handleClick2}
                    >
                      Submit
                    </button>
                  </div>
                )}
                {selectedOption === "branch" && (
                  <div className="mt-4 text-black">
                    <textarea
                      placeholder="Branch ID"
                      style={tAStyle}
                      name="BranchId"
                      onChange={handleChange3}
                    />
                    <textarea
                      placeholder="Location"
                      style={tAStyle}
                      name="Loc"
                      onChange={handleChange3}
                    />
                    <button
                      className="text-lg mt-4 p-2 px-4 font-montserrat block rounded-2xl bg-cyan-300 text-black hover:bg-opacity-75 active:bg-opacity-90"
                      onClick={handleClick3}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {showButtonsList2 && (
            <div className="pt-0 max-w-screen-md font-normal text-white">
              <p className="pt-0 font-montserrat text-xl mb-2">Select Query</p>
              <input
                type="radio"
                name="quer"
                id="q1"
                value="q1"
                checked={selectedOption === "q1"}
                onChange={handleRadioChange}
              />
               {" "}
              <label
                className="ml-2 font-montserrat text-xl mr-8 mt-8"
                htmlFor="emp"
              >
                List all the branches in New York.
              </label>
              <br></br>
              <input
                type="radio"
                name="quer"
                id="q2"
                value="q2"
                checked={selectedOption === "q2"}
                onChange={handleRadioChange}
              />
               {" "}
              <label
                className="ml-2 font-montserrat text-xl mr-8 mt-8"
                htmlFor="cust"
              >
                Give names,gender, and account number of all the customers who
                have outstanding dues more than 25000.
              </label>
              <br></br>
              <input
                type="radio"
                name="quer"
                id="q3"
                value="q3"
                checked={selectedOption === "q3"}
                onChange={handleRadioChange}
              />
               {" "}
              <label
                className="ml-2 font-montserrat text-xl mr-8 mt-8"
                htmlFor="branch"
              >
                List all the employee details who do not manage any loan
                accounts.
              </label>
              <br></br>
              <input
                type="radio"
                name="quer"
                id="q4"
                value="q4"
                checked={selectedOption === "q4"}
                onChange={handleRadioChange}
              />
               {" "}
              <label
                className="ml-2 font-montserrat text-xl mr-8 mt-8"
                htmlFor="branch"
              >
                List all withdrawal transaction logs which were made on non loan
                accounts along with their remaining balance.
              </label>
              <br></br>
              <input
                type="radio"
                name="quer"
                id="q5"
                value="q5"
                checked={selectedOption === "q5"}
                onChange={handleRadioChange}
              />
               {" "}
              <label
                className="ml-2 font-montserrat text-xl mr-8 mt-8"
                htmlFor="branch"
              >
                List all account types.
              </label>
              <button
                className="text-lg mt-4 p-2 px-4 font-montserrat block rounded-2xl bg-cyan-300 text-black hover:bg-opacity-75 active:bg-opacity-90"
                onClick={() => handleButtonClick3("output")}
              >
                Submit
              </button>
            </div>
          )}{" "}
          {output && query.length > 0 && (
            <>
              <div className="mb-6">
                <h1>Query Output</h1>
              </div>
              <div className="App mt-8">
                <div className="container mt-8 ">
                  <table {...getTableProps()}>
                    <thead>
                      {headerGroups.map((headerGroup) => (
                        <tr
                          align="centre"
                          {...headerGroup.getHeaderGroupProps()}
                        >
                          {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                              {column.render("Header")}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {rows.map((row) => {
                        prepareRow(row);
                        return (
                          <tr align="centre" {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                              <td {...cell.getCellProps()}>
                                {cell.render("Cell")}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          {output && query.length === 0 && <p>No data available.</p>}
        </div>
      </div>
    </div>
  );
};

export default Query;
