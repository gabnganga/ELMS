import { useState } from "react";
import { employeesAPI } from "../../../../../features/employees/employeesAPI";

interface CreateEmployeeModalProps {
  onClose: () => void;
}

const CreateEmployeeModal = ({ onClose }: CreateEmployeeModalProps) => {
    const [Staffid, setStaffid] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Employee');
  const [password, setPassword] = useState('');

  const [createEmployee] = employeesAPI.useCreateEmployeeMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createEmployee({
        staffid: Staffid,
        username,
        email,
        role,
        password
      }).unwrap();

      onClose();
      console.log("Employee created successfully");

      // Reset form
      setStaffid(0);
      setUsername('');
      setEmail('');
      setRole('Employee');
      setPassword('');
    } catch (err) {
      console.error("Failed to create employee", err);
    }
  };

  return (
    <dialog id="create_employee_modal" className="modal modal-bottom sm:modal-middle" open>
      <form onSubmit={handleSubmit} className="modal-box bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="font-bold text-lg text-blue-700">Create Employee</h3>

        <div className="py-2">
          <label className="label"><span className=" font-bold text-black">StaffID</span></label>
          <input
            type="number"
            value={Staffid}
            onChange={(e) => setStaffid(Number(e.target.value))}
            className="input border rounded w-full"
            required
          />
        </div>
        <div className="py-2">
          <label className="label"><span className=" font-bold text-black">Name</span></label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input border rounded w-full"
            required
          />
        </div>

        <div className="py-2">
          <label className="label"><span className=" font-bold text-black">Email</span></label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input border rounded w-full"
            required
          />
        </div>

<div className="py-2">
  <label className="label">
    <span className="font-bold text-black">Role</span>
  </label>

  <div className="dropdown w-full">
    {/* Dropdown trigger */}
    <div
      tabIndex={0}
      className="input border rounded w-full cursor-pointer"
    >
      {role || "Select Role"}
    </div>

    {/* Dropdown menu */}
    <ul
      tabIndex={-1}
      className="dropdown-content menu  rounded-box z-10 w-full p-2 shadow-sm bg-gray-500"
    >
      <li>
        <a onClick={() => setRole("Employee")}>Employee</a>
      </li>

      <li>
        <a onClick={() => setRole("Admin")}>Admin</a>
      </li>
    </ul>
  </div>
</div>


        <div className="py-2">
          <label className="label"><span className=" font-bold text-black">Password</span></label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input border rounded w-full"
            required
          />
        </div>

        <div className="modal-action">
          <button type="submit" className="bg-gray-200 text-blue-700 font-semibold px-8 py-3 rounded-xl shadow hover:bg-blue-50 transition">Create</button>
          <button type="button" className="bg-gray-200 text-blue-700 font-semibold px-8 py-3 rounded-xl shadow hover:bg-blue-50 transition" 
          onClick={onClose}>Cancel</button>
        </div>
      </form>
    </dialog>
  );
};

export default CreateEmployeeModal;
