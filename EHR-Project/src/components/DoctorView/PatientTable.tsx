import { useState } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import SortPopup from "../SortPopup/SortPopup";
import AddPatient from "./AddPatient";
import EditPatient from "./EditPatient";
import AddBilling from "../Billing/AddBilling";
import PatientDetails from "./PatientDetails";
import Spinner from "../SmallComponent/Spinner";
import { usePatientContext } from "../Contexts/PatientContext";
import { PatientData } from "./PatientInterface";
import Swal from "sweetalert2";
import axios from "axios";
import { PatientsResponse } from "./PatientInterface";
import { useBillingContext } from "../Contexts/BillingContext";

function PatientsComp() {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showSortPopup, setShowSortPopup] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  //const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);
  const [filteredRecords, setFilteredRecords] = useState<PatientData[]>([]);
  const {showAddBill,setShowAddBill}=useBillingContext() ;
  //const [showAddBill, setShowAddBill] = useState<boolean>(false);
  //const [showAddApp, setShowAddApp] = useState<boolean>(false);

  const itemsPerPage = 7;
  const { patients,currentPatient ,setCurrentPatient,setPatients } = usePatientContext();

  const showSortPopupHandler = (): void => {
    setShowSortPopup(!showSortPopup);
  };

  const handleSort = (order: "asc" | "desc"): void => {
    const sortedRecords = [...patients].sort((a, b) => {
      return order === "asc" ? +a.nationalId - +b.nationalId : +b.nationalId - +a.nationalId;
    });
    setFilteredRecords(sortedRecords);
  };
   // Axios GET request to fetch data
   const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authorization token found.");
        return;
      }

      const response = await axios.get<PatientsResponse>(
        "https://seal-app-qiuxj.ondigitalocean.app/api/v1/patients",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const patients = response.data.data.map((patient) => ({
        ...patient,
        age:
          new Date().getFullYear() -
          new Date(patient.dateOfBirth).getFullYear(),
        firstName: patient.firstName,
        lastName:patient.lastName,
        phoneNumber:patient.phoneNumber,
        lastExamination: "N/A", // Placeholder, update with real data if available
        appointmentStatus: "Pending", // Placeholder, update with real data if available
        billingStatus: "Pending", // Placeholder, update with real data if available
      }));
      setPatients(patients);
      console.log(`patients arr is`,patients);
      
    } catch (error) {
      console.error("Error fetching patients data", error);
    }
  };
  //handle delete
  const handleDelete = async (patientId: string) => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage

    if (!token) {
      Swal.fire("Error", "You are not authenticated. Please log in.", "error");
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log(`entered on delete`);
          
          await axios.delete(
            `https://seal-app-qiuxj.ondigitalocean.app/api/v1/patients/${patientId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
              },
            }
          );
          fetchData() ;
          
          Swal.fire("Deleted!", "The patient has been deleted.", "success");
          // Update state to remove the deleted patient
          setFilteredRecords((prev) =>
            prev.filter((patient) => patient._id !== patientId)
          );
        } catch  {
          Swal.fire(
            "Error",
            "There was an error deleting the patient. Please try again.",
            "error"
          );
        }
      }
    });
  };

  const columns = [
    {
      name: "Patient ID",
      selector: (row: PatientData): number => +row.nationalId,
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row: PatientData): string => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row: PatientData): string => row.lastName,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row: PatientData): string => row.phoneNumber,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row: PatientData): number => row.age,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row: PatientData): string => row.gender,
      sortable: true,
    },
    {
      name: "Emergency Contact Name",
      selector: (row: PatientData): string => row.emergencyContact.name,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row: PatientData): string => row.address,
      sortable: true,
    },
    {
      name: "Emergency Contact Number",
      selector: (row: PatientData): string => row.emergencyContact.phoneNumber,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: PatientData): JSX.Element => (
        <>
          <i
            onClick={() => handleDelete(row._id)}
            className="fa-regular fa-trash-can cursor-pointer text-red-600"
          ></i>
          <i
            onClick={() => {
              setShowDetails(false);
              setShowEdit(true);
              //setSelectedPatient(row);
              setCurrentPatient(row) ;
            }}
            className="fa-solid fa-pen cursor-pointer text-blue-500 ml-4"
          ></i>
        </>
      ),
    },
  ];

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const input = e.target.value;
    setInputValue(input);
    const isValid = /^[a-zA-Z0-9]*$/.test(input);

    if (!isValid) {
      setInputError("Please enter only alphanumeric characters.");
      setFilteredRecords(patients);
    } else {
      setInputError("");
      const newData = patients.filter((row) =>
        row.firstName.toLowerCase().includes(input.toLowerCase()) ||
        row.lastName.toLowerCase().includes(input.toLowerCase()) ||
        row.nationalId.toString().includes(input)
      );
      setFilteredRecords(newData);
    }
  };

  const totalPages = Math.ceil(
    (filteredRecords.length || patients.length) / itemsPerPage
  );
  const currentData = (filteredRecords.length ? filteredRecords : patients).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#f5f5f5",
        
      },
    },
  };

  const csvHeaders = [
    { label: "National ID", key: "nationalId" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Age", key: "age" },
    { label: "Gender", key: "gender" },
    { label: "Phone", key: "phoneNumber" },
    { label: "Emergency Contact Name", key: "emergencyContact.name" },
    { label: "Address", key: "address" },
    { label: "Emergency Contact Number", key: "emergencyContact.phoneNumber" },
  ];

  return (
    <>
      <div className="mt-[100px] 2xl:w-[80%] 2xl:ml-[20%] xl:w-[80%] xl:ml-[18%] lg:w-[80%] lg:ml-[18%] md:w-[100%] md:ml-[0px] md:mt-20 overflow-x-auto bg-white rounded-lg sm:w-full sm:max-w-full sm:max-w-[950px] sm:ml-[0px] sm:mt-[100px] mb-0 sm:mb-[147px] shadow-md p-5  overflow-x-auto">
        <div className="flex justify-between w-full pt-5 flex-wrap">
          <span className="font-bold text-lg leading-7 text-[#101828] ml-5">
            Patients{
              " "
            }
            <small className="bg-[#f9f5ff] w-[58px] h-[22px] rounded-full ml-5 text-xs font-medium leading-4 text-center text-[#165669]">
              {patients.length} Patients
            </small>
          </span>
          <div className="flex gap-2 flex-wrap justify-end">
            <button className="bg-white min-w-[105px] h-10 rounded-lg border border-[#d0d5dd]">
              <CSVLink
                data={filteredRecords.length ? filteredRecords : patients}
                headers={csvHeaders}
                filename="Patient-data.csv"
                className="text-blue-500 mr-2"
              >
                <i className="fa-solid fa-cloud-arrow-down"></i> Export
              </CSVLink>
            </button>
            <button
              onClick={() => setShowAdd(true)}
              className="bg-[#165669] min-w-[130px] h-10 text-white rounded-lg mr-5"
            >
              <i className="fa-solid fa-plus text-blue-500 mr-2"></i>Add Patient
            </button>
            <button
              onClick={showSortPopupHandler}
              className="bg-white h-10 rounded-lg border border-[#d0d5dd] px-2"
            >
              <i className="fa-solid fa-filter text-blue-500 mr-1"></i> Sort
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full max-w-full h-11 mt-7 mx-auto mb-2 relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
          <input
            placeholder="Search by Patient ID or Name"
            type="text"
            value={inputValue}
            onChange={searchHandler}
            className={`w-full h-full pl-9 rounded-md border ${
              inputError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {inputError && <p className="text-red-500 text-xs mt-1">{inputError}</p>}
        </div>
        {showEdit && <EditPatient showEdit={showEdit} setShowEdit={setShowEdit} selectedPatient={currentPatient} />}
        {showAdd && <AddPatient showAdd={showAdd} setShowAdd={setShowAdd} />}
        {showAddBill&&<AddBilling showAdd={showAddBill}  setShowAdd={setShowAddBill} />}
        {patients.length > 0 ? (
          <DataTable
            columns={columns}
            data={currentData}
            fixedHeader
            highlightOnHover
            customStyles={customStyles}
            responsive
            onRowClicked={(row) => {
              //setSelectedPatient(row);
              setCurrentPatient(row)
              setShowDetails(true);
            }}
          />
        ) : (
          <Spinner />
        )}
        {showDetails && (
          <PatientDetails
            patient={currentPatient}
            closeDetails={() => setShowDetails(false)}
          />
        )}

        <SortPopup
          isOpen={showSortPopup}
          onClose={showSortPopupHandler}
          onSort={handleSort}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-white h-9 w-[105px] rounded-lg border border-[#d0d5dd] text-gray-500"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-customGreen text-white h-9 w-[105px] rounded-lg border border-[#d0d5dd] text-gray-500"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default PatientTable;