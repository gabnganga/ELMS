import { useState } from "react";
import { leaverequestAPI, type TLeaveRequest } from "../../../../../features/leaves/leaverequestAPI";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../app/store";
import EditLeaveModal from "./editmodal";

export default function LeaveDashboard() {
  const [editingLeave, setEditingLeave] = useState<TLeaveRequest | null>(null);

  const user = useSelector((state: RootState) => state.user.user);
  const staffid = user?.Staffid;

  const { data: leaves = [], isLoading } = leaverequestAPI.useGetLeaveHistoryQuery(staffid!);
  const sortedLeaves = [...leaves].sort(
  (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
);

  const [requestLeave] = leaverequestAPI.useRequestLeaveMutation();
  const [deleteLeave] = leaverequestAPI.useDeleteLeaveMutation();

  const [form, setForm] = useState({
    leavetypeid: 1,
    start_date: "",
    end_date: "",
  });

  const handleSubmit = async () => {
    await requestLeave({ ...form, staffid });
    setForm({ leavetypeid: 1, start_date: "", end_date: "" });
  };



  const handleDelete = async (id: number) => {
    await deleteLeave(id);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Leave Request Dashboard</h2>

      {/* Leave Request Form */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-2">Apply for Leave</h3>

        <select
          className="border p-2 mr-2"
          value={form.leavetypeid}
          onChange={(e) => setForm({ ...form, leavetypeid: Number(e.target.value) })}
        >
          <option value={1}>Annual Leave</option>
          <option value={2}>Sick Leave</option>
          <option value={3}>Maternity Leave</option>
          <option value={4}>Emergency Leave</option>
          <option value={5}>Unpaid Leave</option>
         
        </select>

        <input
          type="date"
          className="border p-2 mr-2"
          value={form.start_date}
          onChange={(e) => setForm({ ...form, start_date: e.target.value })}
        />

        <input
          type="date"
          className="border p-2 mr-2"
          value={form.end_date}
          onChange={(e) => setForm({ ...form, end_date: e.target.value })}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div> 

      {/* History Table */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-2">Leave History</h3>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>Leave Type</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedLeaves.map((leave) => (
              <tr key={leave.leaveid}>
                <td className="border p-2">{leave.leavetype || "..."}</td>
                <td className="border p-2"> {new Date(leave.start_date).toLocaleDateString()}</td>
                <td className="border p-2">{new Date(leave.end_date).toLocaleDateString()}</td>
                <td className="border p-2">{leave.status ||"Pending"}</td>
                <td className="border p-2">{leave.comment ||"Awaiting Review"}</td>
                <td className="flex  border p-6 space-x-2">
                <button
                 disabled={leave.status == "Rejected" || leave.status == "Approved"}
                  onClick={() => setEditingLeave(leave)}
                  className={` px-2 py-1 rounded text-white ${
                  leave.status == "Rejected" || leave.status == "Approved"
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
                >
                  Edit
                </button>
                {editingLeave && (
                  <EditLeaveModal
                    leave={editingLeave}
                    onClose={() => setEditingLeave(null)}
                  />
                )}


                  <button
                   disabled={leave.status == "Rejected" || leave.status == "Approved"}
                    onClick={() => handleDelete(leave.leaveid)}
                    
                    className={`px-2 py-1 rounded text-white ${
                  leave.status == "Rejected" || leave.status == "Approved"
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                } `}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
