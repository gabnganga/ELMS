import { useState } from "react";
import { leaverequestAPI, type TLeaveRequest } from "../../../../../features/leaves/leaverequestAPI";
import { BsThreeDots } from "react-icons/bs";
import LeaveActionModal from "./leavevommentseditmodl";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../app/store";

const leaverequest = () => {
    const { data:LeaveRequestdata, isLoading:  requestsloading, error:LeaveRequestError } = leaverequestAPI.useGetLeaveRequestsQuery();
    console.log("LeaveRequest", LeaveRequestdata);

      const [modalOpen, setModalOpen] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState<number | null>(null);

  const user = useSelector((state: RootState) => state.user); // logged-in user
  const managerId = user.user?.Staffid;

  const handleOpenModal = (leaveId: number) => {
    setSelectedLeaveId(leaveId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedLeaveId(null);
    setModalOpen(false);
  };


  // Filtering + Search State
const [searchTerm, setSearchTerm] = useState("");
const [filterStatus, setFilterStatus] = useState("All");

// Filter + Search Logic
const filteredRequests = LeaveRequestdata?.data
  ?.filter((req: TLeaveRequest) => {
    const matchesSearch =
      req.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.staffid.toString().includes(searchTerm);

    const matchesStatus =
      filterStatus === "All" || req.status === filterStatus;

    return matchesSearch && matchesStatus;
  });



  return (

    <div>
        { requestsloading  && <p>Loading leave requests...</p>}
        { LeaveRequestError && <p className="text-red-700 font-bold">Error fetching leave requests........</p>}
        {LeaveRequestdata && LeaveRequestdata.data && LeaveRequestdata.data.length >0 ? (
            <div >
                        <div className="flex flex-wrap gap-3 mb-4 mt-4 items-center">
                            {/* Search Bar */}
                            <input
                                type="text"
                                placeholder="Search by Name or Staff ID..."
                                className="input input-bordered w-full max-w-xs"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                            {/* Filter Buttons */}
                            <div className="flex gap-2">
                                {["All", "Pending", "Approved", "Rejected"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-3 py-1 rounded text-sm ${
                                    filterStatus === status
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-black hover:bg-gray-300"
                                    }`}
                                >
                                    {status}
                                </button>
                                ))}
                            </div>
                            </div>

                
             <table className="table-xs">
                <thead>
                    <tr className="bg-blue-600 text-white text-md lg:text-lg">
                        <th className="px-4 py-2">Staff ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-8 py-2">Leave Type</th>
                        <th className="px-4 py-2">Start Date</th>
                        <th className="px-4 py-2">End Date</th>
                        <th className="px-8 py-2">Status</th>
                        <th className="px-4 py-2">Comment</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRequests
                    ?.sort((a, b) => b.leaveid - a.leaveid) // latest first
                    .map((request: TLeaveRequest) => (

                        <tr key={request.leaveid} className="border-b hover:bg-gray-100">
                            <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{request.staffid}</td>
                            <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{request.username}</td>
                            <td className="px-8 py-2 border-r border-gray-400 lg:text-base">{request.leavetype}</td>
                            <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{new Date(request.start_date).toLocaleDateString()}</td>
                            <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{new Date(request.end_date).toLocaleDateString()}</td>
                            <td className="px-8 py-2 border-r border-gray-400 lg:text-base">{request.status || "Pending"} 
                                <span 
                                                     className={`  ${
                                                    request.status == "Rejected" || request.status == "Approved"
                                                    ? ""
                                                    : "loading loading-ring loading-xs"
                                               
                                                    
                                                      }`}    
                                    
                                ></span></td>
                            <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{request.comment || "Awaiting Review"} 

                            </td>
                            <td>
                              <button
                                disabled={request.status == "Rejected" || request.status == "Approved"}
                                onClick={() => handleOpenModal(request.leaveid)}
                                                className={` px-2 py-1  inline ml-2 ${
                                                request.status == "Rejected" || request.status == "Approved"
                                                    ? "text-gray-700 cursor-not-allowed"
                                                    : "text-blue-500 hover:text-blue-700 cursor-pointer"
                                                      }`}    
                                    
                                >
                                    <BsThreeDots/>
                                </button>

                            </td>

                        </tr>
                    ))}
                </tbody>
             </table>
              
            </div>

        ): (
           <p>No leave requests found.</p> 
        )
        }

        {selectedLeaveId && managerId && (
        <LeaveActionModal
          leaveId={selectedLeaveId}
          isOpen={modalOpen}
          onClose={handleCloseModal}
          managerId={managerId}
        />
      )}

    </div>
  )
}

export default leaverequest