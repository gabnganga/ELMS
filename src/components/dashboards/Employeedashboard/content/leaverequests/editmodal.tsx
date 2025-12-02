import { useEffect, useState } from "react";

import { leaverequestAPI, type TLeaveRequest } from "../../../../../features/leaves/leaverequestAPI";

type Props = {
  leave: TLeaveRequest | null;
  onClose: () => void;
};

export default function EditLeaveModal({ leave, onClose }: Props) {
  const [updateLeave] = leaverequestAPI.useUpdateLeaveMutation();
    const leaveTypes = [
    { leavetypeid: 1, leavetype: "Annual Leave" },
    { leavetypeid: 2, leavetype: "Sick Leave" },
    { leavetypeid: 3, leavetype: "Maternity Leave" },
    { leavetypeid: 4, leavetype: "Emergency Leave" },
    { leavetypeid: 5, leavetype: "Unpaid Leave" },
    ]

  const [form, setForm] = useState({
    leavetypeid: 1,
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (leave) {
      setForm({
        leavetypeid: leaveTypes.find(lt => lt.leavetype === leave.leavetype)?.leavetypeid || 1,
        start_date: leave.start_date.split("T")[0],
        end_date: leave.end_date.split("T")[0],
      });
    }
  }, [leave]);

  const handleUpdate = async () => {
    await updateLeave({ leaveid: leave?.leaveid!, ...form });
    onClose();
  };

  if (!leave) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-gray-300/10" 
      onClick={onClose}></div>

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 bg-white  rounded p-6 w-[350px] z-50 -translate-x-1/2 -translate-y-1/2">
        <h3 className="text-lg font-semibold mb-4">Edit Leave Request</h3>

        <label className="block mb-2">
          Leave Type
          <select
            className="border w-full p-2"
            value={form.leavetypeid}
            onChange={(e) => setForm({ ...form, leavetypeid: Number(e.target.value) })}
          >
            {leaveTypes.map((lt) => (
              <option key={lt.leavetypeid} value={lt.leavetypeid}>
                {lt.leavetype}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-2">
          Start Date
          <input
            type="date"
            className="border w-full p-2"
            value={form.start_date}
            onChange={(e) => setForm({ ...form, start_date: e.target.value })}
          />
        </label>

        <label className="block mb-4">
          End Date
          <input
            type="date"
            className="border w-full p-2"
            value={form.end_date}
            onChange={(e) => setForm({ ...form, end_date: e.target.value })}
          />
        </label>

        <div className="flex justify-between">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleUpdate}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
