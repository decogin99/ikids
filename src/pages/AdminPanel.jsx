import { useEffect, useState } from 'react';
import { getSchedules, addEntry, updateEntry, deleteEntry, getWeekKey, getWeekDates, formatDate, isPastDate } from '../services/scheduleService';

const AdminPanel = () => {
  const [showAddForm, setShowAddForm] = useState(null);
  useEffect(() => {
    const role = sessionStorage.getItem('ikids_role');
    if (role !== 'Admin') {
      window.location.hash = '#select';
    }
  }, []);

  const signOut = () => {
    sessionStorage.removeItem('ikids_role');
    window.location.hash = '#select';
  };

  // Weekly schedule management
  const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentWeekKey = getWeekKey(currentDate);
  const weekDates = getWeekDates(currentWeekKey);
  const [schedules, setSchedules] = useState(getSchedules(currentWeekKey));
  const [newEntries, setNewEntries] = useState(Object.fromEntries(
    DAYS.map(day => [day, { teacher: '', className: '', place: '', startTime: '', endTime: '', students: '' }])
  ));
  const [editing, setEditing] = useState(null);

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

  const handleNewInputChange = (day, field, value) => {
    setNewEntries(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const handleAdd = (day) => {
    const entry = newEntries[day];
    if (!entry.teacher || !entry.className || !entry.place) return;
    addEntry(currentWeekKey, day, entry);
    setSchedules(getSchedules(currentWeekKey));
    setNewEntries(prev => ({ ...prev, [day]: { teacher: '', className: '', place: '', startTime: '', endTime: '', students: '' } }));
    setShowAddForm(null);
  };

  const startEdit = (day, item) => {
    setEditing({
      day,
      id: item.id,
      values: {
        teacher: item.teacher || '',
        className: item.className || '',
        place: item.place || '',
        startTime: item.startTime || '',
        endTime: item.endTime || '',
        students: item.students || ''
      }
    });
  };

  const cancelEdit = () => setEditing(null);
  
  const handleEditChange = (field, value) => {
    setEditing(prev => prev ? { ...prev, values: { ...prev.values, [field]: value } } : prev);
  };

  const saveEdit = () => {
    if (!editing) return;
    const { day, id, values } = editing;
    if (!values.teacher || !values.className || !values.place) return;
    updateEntry(currentWeekKey, day, id, values);
    setSchedules(getSchedules(currentWeekKey));
    setEditing(null);
  };

  const removeEntry = (day, id) => {
    deleteEntry(currentWeekKey, day, id);
    setSchedules(getSchedules(currentWeekKey));
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-lg font-bold text-[#14B0F2]">Admin Panel</div>
            <span className="text-xs rounded-full bg-[#14B0F2]/10 text-[#14B0F2] px-2 py-0.5">Role: Admin</span>
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
            const isPast = isPastDate(dayDate);
            return (
            <div key={day} className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{day}</h2>
                  <div className="text-sm text-gray-500">{formatDate(dayDate)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{(schedules[day] || []).length} schedule(s)</span>
                  {!isPast && (
                    <button 
                      onClick={() => setShowAddForm(showAddForm === day ? null : day)} 
                      className="px-3 py-1.5 text-xs rounded-full border border-[#14B0F2] text-[#14B0F2] hover:bg-[#14B0F2]/5"
                    >
                      {showAddForm === day ? 'Cancel' : 'Add Schedule'}
                    </button>
                  )}
                </div>
              </div>
              <div className="p-4 space-y-4">
                {(schedules[day] || []).length === 0 ? (
                  <p className="text-sm text-gray-500">No class scheduled yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {(schedules[day] || []).map((item) => (
                      <li key={item.id} className="rounded-xl border border-gray-200 p-3">
                        {editing && editing.day === day && editing.id === item.id ? (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                              <div className="lg:col-span-2">
                                <input value={editing.values.teacher} onChange={(e)=>handleEditChange('teacher', e.target.value)} className="w-full px-3 py-2 rounded-lg border-gray-300 text-sm" placeholder="Enter teacher name" />
                              </div>
                              <div className="lg:col-span-2">
                                <input value={editing.values.className} onChange={(e)=>handleEditChange('className', e.target.value)} className="w-full px-3 py-2 rounded-lg border-gray-300 text-sm" placeholder="Enter class name" />
                              </div>
                              <div className="lg:col-span-2">
                                <input value={editing.values.place} onChange={(e)=>handleEditChange('place', e.target.value)} className="w-full px-3 py-2 rounded-lg border-gray-300 text-sm" placeholder="Enter location" />
                              </div>
                              <div className="lg:col-span-2">
                                <div className="grid grid-cols-2 gap-2">
                                  <input type="time" value={editing.values.startTime} onChange={(e)=>handleEditChange('startTime', e.target.value)} className="w-full px-3 py-2 rounded-lg border-gray-300 text-sm" placeholder="Start time" />
                                  <input type="time" value={editing.values.endTime} onChange={(e)=>handleEditChange('endTime', e.target.value)} className="w-full px-3 py-2 rounded-lg border-gray-300 text-sm" placeholder="End time" />
                                </div>
                              </div>
                              <div className="lg:col-span-4">
                                <input value={editing.values.students} onChange={(e)=>handleEditChange('students', e.target.value)} className="w-full px-3 py-2 rounded-lg border-gray-300 text-sm" placeholder="Enter student names (comma-separated)" />
                              </div>
                            </div>
                            <div className="flex gap-2 items-end">
                              <button onClick={saveEdit} className="px-3 py-1.5 text-sm rounded-lg bg-green-600 text-white">Save</button>
                              <button onClick={cancelEdit} className="px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white">Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-medium">{item.teacher}</div>
                              <div className="text-xs text-gray-600">
                                <span className="font-medium text-gray-700">Class:</span> {item.className}</div>
                              <div className="text-xs text-gray-500">
                                <span className="font-medium text-gray-700">Location:</span> {item.place}
                              </div>
                              {(item.startTime || item.endTime) && (
                                <div className="text-xs text-gray-600 mt-1">{formatTime(item.startTime)}{item.startTime && item.endTime ? ' – ' : ''}{formatTime(item.endTime)}</div>
                              )}
                              {item.students && item.students.split(',').map(s => s.trim()).filter(Boolean).length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {item.students.split(',').map(s => s.trim()).filter(Boolean).map((stu, idx) => (
                                    <span key={idx} className="text-xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">{stu}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                            {!isPast && (
                              <div className="flex items-center gap-2">
                                <button onClick={()=>startEdit(day, item)} className="px-3 py-1.5 text-xs rounded-full border border-yellow-600 text-yellow-600">Edit</button>
                                <button onClick={()=>removeEntry(day, item.id)} className="px-3 py-1.5 text-xs rounded-full border border-red-300 text-red-600">Delete</button>
                              </div>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                {showAddForm === day && !isPast && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                        <input 
                          value={newEntries[day].teacher} 
                          onChange={(e)=>handleNewInputChange(day, 'teacher', e.target.value)} 
                          className="w-full px-4 py-2.5 rounded-xl border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:ring-2 focus:ring-[#14B0F2] focus:border-[#14B0F2]" 
                          placeholder="Enter teacher name" 
                        />
                      </div>
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                        <input 
                          value={newEntries[day].className} 
                          onChange={(e)=>handleNewInputChange(day, 'className', e.target.value)} 
                          className="w-full px-4 py-2.5 rounded-xl border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:ring-2 focus:ring-[#14B0F2] focus:border-[#14B0F2]" 
                          placeholder="Enter class name" 
                        />
                      </div>
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input 
                          value={newEntries[day].place} 
                          onChange={(e)=>handleNewInputChange(day, 'place', e.target.value)} 
                          className="w-full px-4 py-2.5 rounded-xl border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:ring-2 focus:ring-[#14B0F2] focus:border-[#14B0F2]" 
                          placeholder="Enter location" 
                        />
                      </div>
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="time" 
                            value={newEntries[day].startTime} 
                            onChange={(e)=>handleNewInputChange(day, 'startTime', e.target.value)} 
                            className="w-full px-4 py-2.5 rounded-xl border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:ring-2 focus:ring-[#14B0F2] focus:border-[#14B0F2]" 
                          />
                          <input 
                            type="time" 
                            value={newEntries[day].endTime} 
                            onChange={(e)=>handleNewInputChange(day, 'endTime', e.target.value)} 
                            className="w-full px-4 py-2.5 rounded-xl border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:ring-2 focus:ring-[#14B0F2] focus:border-[#14B0F2]" 
                          />
                        </div>
                      </div>
                      <div className="lg:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Students</label>
                        <input 
                          value={newEntries[day].students} 
                          onChange={(e)=>handleNewInputChange(day, 'students', e.target.value)} 
                          className="w-full px-4 py-2.5 rounded-xl border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:ring-2 focus:ring-[#14B0F2] focus:border-[#14B0F2]" 
                          placeholder="Enter student names (comma-separated)" 
                        />
                      </div>
                      <div className="lg:col-span-1 flex items-end">
                        <button 
                          onClick={()=>handleAdd(day)} 
                          className="w-full px-4 py-2.5 text-sm font-medium rounded-xl bg-green-600 text-white hover:bg-[#14B0F2]/90 focus:ring-2 focus:ring-offset-2 focus:ring-[#14B0F2]"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}             
              </div>
            </div>
          )})}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
