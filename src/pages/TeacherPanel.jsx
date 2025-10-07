import { useEffect, useState } from 'react';
import { getSchedules, getWeekKey, getWeekDates, formatDate } from '../services/scheduleService';

const TeacherPanel = () => {
  useEffect(() => {
    const role = sessionStorage.getItem('ikids_role');
    if (role !== 'Teacher') { // Changed from 'User'
      window.location.hash = '#select';
    }
  }, []);

  const signOut = () => {
    sessionStorage.removeItem('ikids_role');
    window.location.hash = '#select';
  };

  const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentWeekKey = getWeekKey(currentDate);
  const weekDates = getWeekDates(currentWeekKey);
  const [schedules, setSchedules] = useState(getSchedules(currentWeekKey));

  useEffect(() => {
    setSchedules(getSchedules(currentWeekKey));
  }, [currentWeekKey]);

  const navigateWeek = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + offset * 7);
    setCurrentDate(newDate);
  };

  const formatTime = (t) => {
    if (!t) return '';
    const [hStr, mStr] = t.split(':');
    const h = Number(hStr);
    const m = Number(mStr);
    const isPM = h >= 12;
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${m.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-lg font-bold text-[#14B0F2]">Teacher Panel</div>
            <span className="text-xs rounded-full bg-[#14B0F2]/10 text-[#14B0F2] px-2 py-0.5">Role: Teacher</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#/" className="text-sm hover:text-[#14B0F2]">Back to Home</a>
            <button type="button" onClick={signOut} className="inline-flex items-center rounded-full border border-[#14B0F2]/30 text-[#14B0F2] px-3 py-1.5 text-sm font-semibold hover:border-[#14B0F2]">Sign out</button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-5">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Weekly Schedule</h1>
            <p className="mt-2 text-gray-600">
              {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigateWeek(-1)} 
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:border-[#14B0F2] hover:text-[#14B0F2]"
            >
              Previous Week
            </button>
            <button 
              onClick={() => setCurrentDate(new Date())} 
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:border-[#14B0F2] hover:text-[#14B0F2]"
            >
              Current Week
            </button>
            <button 
              onClick={() => navigateWeek(1)} 
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:border-[#14B0F2] hover:text-[#14B0F2]"
            >
              Next Week
            </button>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6">
          {DAYS.map((day, index) => {
            const dayDate = weekDates[index];
            return (
              <div key={day} className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{day}</h2>
                    <div className="text-sm text-gray-500">{formatDate(dayDate)}</div>
                  </div>
                  <span className="text-xs text-gray-500">{(schedules[day] || []).length} schedule(s)</span>
                </div>
                <div className="p-4 space-y-4">
                  {(schedules[day] || []).length === 0 ? (
                    <p className="text-sm text-gray-500">No class scheduled yet.</p>
                  ) : (
                    <ul className="space-y-3">
                      {(schedules[day] || []).map((item) => (
                        <li key={item.id} className="rounded-xl border border-gray-200 p-3">
                          <div>
                            <div className="font-medium">{item.teacher}</div>
                            <div className="text-xs text-gray-600">
                              <span className="font-medium text-gray-700">Class:</span> {item.className}
                            </div>
                            <div className="text-xs text-gray-600">
                              <span className="font-medium text-gray-700">Location:</span> {item.place}
                            </div>
                            {(item.startTime || item.endTime) && (
                              <div className="text-xs text-gray-600 mt-1">
                                <span className="font-medium text-gray-700">Time:</span> {formatTime(item.startTime)}{item.startTime && item.endTime ? ' – ' : ''}{formatTime(item.endTime)}
                              </div>
                            )}
                            {item.students && item.students.split(',').map(s => s.trim()).filter(Boolean).length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {item.students.split(',').map(s => s.trim()).filter(Boolean).map((stu, idx) => (
                                    <span key={idx} className="text-xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">{stu}</span>
                                  ))}
                                </div>
                              )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default TeacherPanel;