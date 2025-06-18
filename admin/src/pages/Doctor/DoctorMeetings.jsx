import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorMeetings = () => {
  const { dToken, meetings, getDoctorMeetings, updateMeetingResponse } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDoctorMeetings();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">Meeting Requests</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_2fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Medical Rep</p>
          <p>Date</p>
          <p>Title</p>
          <p>Type</p>
          <p>Status</p>
          <p>Actions</p>
        </div>

        {meetings && meetings.length > 0 ? (
          meetings.map((item, index) => (
            <div
              className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_2fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
              key={index}
            >
              <p className="max-sm:hidden">{index + 1}</p>
              
              <div className="flex flex-col">
                <p className="font-medium text-gray-800">{item.medRepId?.name || 'N/A'}</p>
                <p className="text-xs text-gray-500">{item.medRepId?.company || 'N/A'}</p>
                <p className="text-xs text-gray-500">{item.medRepId?.phone || 'N/A'}</p>
              </div>

              <div className="flex flex-col">
                <p>{new Date(item.meetingDate).toLocaleDateString()}</p>
                <p className="text-xs text-gray-500">
                  {new Date(item.meetingDate).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-gray-500">{item.location}</p>
                {item.description && (
                  <p className="text-xs text-gray-500 truncate max-w-32">
                    {item.description}
                  </p>
                )}
              </div>

              <p>{item.meetingType}</p>

              <div className="flex">
                <p className={`text-xs inline border px-2 py-1 rounded-full ${
                  item.status === 'Scheduled' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                  item.status === 'Confirmed' ? 'bg-green-50 text-green-600 border-green-200' :
                  item.status === 'Completed' ? 'bg-green-100 text-green-700 border-green-300' :
                  item.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-200' :
                  'bg-gray-50 text-gray-600 border-gray-200'
                }`}>
                  {item.status}
                </p>
              </div>

              <div className="flex gap-2">
                {item.status === 'Scheduled' && (
                  <>
                    <button
                      onClick={() => updateMeetingResponse(item._id, 'Confirmed')}
                      className="bg-green-500 text-white px-3 py-1 text-xs rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateMeetingResponse(item._id, 'Cancelled', 'Not available at this time')}
                      className="bg-red-500 text-white px-3 py-1 text-xs rounded hover:bg-red-600"
                    >
                      Decline
                    </button>
                  </>
                )}
                
                {item.status === 'Confirmed' && (
                  <>
                    <button
                      onClick={() => updateMeetingResponse(item._id, 'Completed')}
                      className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => updateMeetingResponse(item._id, 'Cancelled', 'Had to cancel due to emergency')}
                      className="bg-red-500 text-white px-3 py-1 text-xs rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {(item.status === 'Completed' || item.status === 'Cancelled') && (
                  <span className="text-xs text-gray-400 px-3 py-1">
                    {item.status}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No meeting requests found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorMeetings;