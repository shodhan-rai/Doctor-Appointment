import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
    meetings,
    getDoctorMeetings,
    updateMeetingResponse,
  } = useContext(DoctorContext);
  
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
      getDoctorMeetings();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currency} {dashData.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointment_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {meetings && meetings.filter(m => m.status === 'Scheduled').length}
              </p>
              <p className="text-gray-400">Meeting Requests</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments && dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div
                className="flex items-center px-6 py-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.userData?.image || assets.doctor_icon}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.userData?.name || 'N/A'}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <div className="flex">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.tick_icon}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Meeting Requests Section */}
        {meetings && meetings.filter(m => m.status === 'Scheduled').length > 0 && (
          <div className="bg-white mt-10">
            <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border">
              <img src={assets.appointment_icon} alt="" />
              <p className="font-semibold">Pending Meeting Requests</p>
            </div>

            <div className="pt-4 border border-t-0">
              {meetings.filter(m => m.status === 'Scheduled').slice(0, 3).map((item, index) => (
                <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-50" key={index}>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{item.title}</p>
                    <p className="text-gray-600 text-sm">
                      {item.medRepId?.name} - {item.medRepId?.company}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {new Date(item.meetingDate).toLocaleDateString()} at {new Date(item.meetingDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateMeetingResponse(item._id, 'Confirmed')}
                      className="bg-green-500 text-white px-3 py-1 text-xs rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateMeetingResponse(item._id, 'Cancelled')}
                      className="bg-red-500 text-white px-3 py-1 text-xs rounded"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default DoctorDashboard;
