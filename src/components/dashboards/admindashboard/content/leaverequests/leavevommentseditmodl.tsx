// LeaveActionModal.tsx
import React, { useState } from "react";
import { leaverequestAPI } from "../../../../../features/leaves/leaverequestAPI";

interface LeaveActionModalProps {
  leaveId: number;
  isOpen: boolean;
  onClose: () => void;
  managerId: number;
  onSuccess?: () => void;
  existingComment?: string | null;
  existingStatus?: string | null;
}

const LeaveActionModal: React.FC<LeaveActionModalProps> = ({
  leaveId,
  isOpen,
  onClose,
  managerId,
  onSuccess,
  existingComment,
  existingStatus,
}) => {
  const [commentText, setCommentText] = useState("");
  const [status, setStatus] = useState<"Approved" | "Rejected">("Approved");

  const [addComment] = leaverequestAPI.useAddCommentMutation();

  const handleSubmit = async () => {
    try {
      // Only allow adding if no existing comment
      if (!existingComment) {
        await addComment({
          leaveid: leaveId,
          comment: commentText,
          status,
          managerid: managerId,
        }).unwrap();
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to submit action:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60  transition-all duration-200 z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Manage Leave</h2>

        {!existingComment && (
          <textarea
            className="w-full border p-2 mb-4"
            rows={4}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Enter comment"
          />
        )}

        <div className="mb-4">
          <label className="mr-2 font-semibold">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "Approved" | "Rejected")}
            className="border px-2 py-1 rounded"
            disabled={!!existingStatus} // disable if status already exists
          >
            <option value="Approved">Approve</option>
            <option value="Rejected">Reject</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-3 py-1 rounded mr-2 hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveActionModal;
