import { employeesAPI, type TEmployee } from "../../../../../features/employees/employeesAPI";
import CreateEmployeeModal from "./createEmployeeModal";
import { useState } from "react";

const employees = () => {
   const [showCreateModal, setShowCreateModal] = useState(false);
    const [deleteEmployee] = employeesAPI.useDeleteEmployeeMutation();
    const [updateEmployee] = employeesAPI.useUpdateEmployeeMutation();
    const { data:employeesData, isLoading:  employeesLoading, error:employeesError } = employeesAPI.useGetLeaveRequestsQuery();
    console.log("Employees", employeesData);

   
  const roles = ["Employee", "Admin"];

    const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
        await deleteEmployee(id).unwrap();
        console.log("Employee deleted");
    } catch (err) {
        console.error("Failed to delete employee", err);
    }
};


  const handleRoleChange = async (employee: TEmployee, newRole: string) => {
    try {
      // Only update the role, but send all other required fields
      await updateEmployee({
        id: employee.staffid,
        username: employee.username,
        email: employee.email,
         role: newRole,
      }).unwrap();


    } catch (err: any) {
      console.error("Failed to update role", err);
   
    }
  };



  return (

    <div>
        { employeesLoading  && <p>Loading employees...</p>}
        { employeesError && <p className="text-red-700 font-bold">Error fetching employees........</p>}
        {employeesData && employeesData.data && employeesData.data.length > 0 ? (
            <div>
             <table className="table-xl">
                <thead>
                    <tr className="bg-blue-600 text-white text-md lg:text-lg">
                        <th className="px-8 py-2">Staff ID</th>
                        <th className="px-8 py-2">Name</th>
                        <th className="px-8 py-2">Email</th>
                        <th className="px-8 py-2">Role</th>
                        <th className="px-8 py-2">Actions</th>


                    </tr>
                </thead>
                <tbody>
                    {employeesData.data.map((employee: TEmployee) => (
                        <tr key={employee.staffid} className="border-b hover:bg-gray-100">
                            <td className="px-8 py-2 border-r border-gray-400 lg:text-base">{employee.staffid}</td>
                            <td className="px-8 py-2 border-r border-gray-400 lg:text-base">{employee.username}</td>
                            <td className="px-8 py-2 border-r border-gray-400 lg:text-base">{employee.email}</td>
                              <td className="px-8 py-2 border-r border-gray-400 lg:text-base flex items-center space-x-2">
                   
                    <select
                      value={employee.role}
                      onChange={(e) => handleRoleChange(employee, e.target.value)}
                      className="border border-gray-300 rounded-md p-2 bg-orange-50"
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>

                    </td>
                            <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                               
                                <button onClick={() => handleDelete(employee.staffid)} className="bg-red-600 text-white px-2 py-1 mr-2 rounded hover:bg-red-600">Delete</button>
                           
                               
                            </td>


                        </tr>
                    ))}
                </tbody>
             </table>
             <button className="btn btn-wide bg-blue-500 text-white px-2 py-1 mr-2 rounded hover:bg-blue-600"   onClick={() => setShowCreateModal(true)} >Add New Employee</button>
               {showCreateModal && (
            <CreateEmployeeModal onClose={() => setShowCreateModal(false)} />
)}       
            </div>

        ): (
           <p>No Employees to display.</p> 
        )
        }


    </div>
  )
}

export default employees