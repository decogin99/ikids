import { useState } from 'react';
import ikidsLogo from '../assets/images/ikids-logo.png'

const AdminSelect = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const openModal = (selectedRole) => {
    setRole(selectedRole);
    setPassword('');
    setError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRole(null);
    setPassword('');
    setError('');
  };

  const submitPassword = (e) => {
    e.preventDefault();
    const expected = role === 'Admin' ? import.meta.env.VITE_ADMIN_PASSWORD : import.meta.env.VITE_TEACHER_PASSWORD;
    if (!expected) {
      const envKey = role === 'Admin' ? 'VITE_ADMIN_PASSWORD' : 'VITE_TEACHER_PASSWORD';
      setError(`${role} password not configured. Please set ${envKey}.`);
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    if (password === expected) {
      setIsModalOpen(false);
      // Fix: Change 'Teachers' to 'Teacher' to match the role check in App.jsx and TeacherPanel.jsx
      sessionStorage.setItem('ikids_role', role === 'Admin' ? 'Admin' : 'Teacher');
      window.location.hash = role === 'Admin' ? '#admin-panel' : '#teacher-panel';
    } else {
      setError('Incorrect password.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/60 to-white">
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={ikidsLogo}
              alt="iKids Academy logo"
              className="w-20 h-auto rounded-lg"
            />
            <div>
              <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#14B0F2] flex items-center gap-2">
                iKids Academy
                <span className="inline-flex items-center rounded-full bg-[#14B0F2]/10 text-[#14B0F2] px-2 py-0.5 text-[10px] sm:text-xs font-semibold">Internal Access</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-500">Foreign Language Education Center</div>
            </div>
          </div>
          <a href="/" className="text-sm hover:text-[#14B0F2]">Back to Home</a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-5">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-[#14B0F2]">Internal</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">Select Access</h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600 text-sm sm:text-base">Choose Admin or Teacher to continue. Access is restricted to internal teams.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <button
            type="button"
            aria-label="Enter Admin area"
            onClick={() => openModal('Admin')}
            className="group w-full rounded-3xl p-8 bg-gradient-to-br from-[#14B0F2] to-[#129EDB] text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#14B0F2]"
          >
            <div className="text-center">
              <div className="text-2xl font-bold mb-3">Admin</div>
              <p className="text-sm opacity-90 leading-relaxed">Manage internal configurations, content, and administrative settings</p>
            </div>
          </button>

          <button
            type="button"
            aria-label="Enter Teacher area"
            onClick={() => openModal('Teacher')} // Fix: Change 'Teachers' to 'Teacher'
            className="group w-full rounded-3xl p-8 bg-white border-2 border-[#14B0F2]/20 text-[#0F6DAF] shadow-lg hover:shadow-xl hover:border-[#14B0F2]/40 hover:bg-[#14B0F2]/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#14B0F2]"
          >
            <div className="text-center">
              <div className="text-2xl font-bold mb-3 text-[#0F6DAF]">Teacher</div> {/* Fix: Change 'Teachers' to 'Teacher' */}
              <p className="text-sm text-[#0F6DAF]/80 leading-relaxed">View internal information, resources, and teacher-level content</p>
            </div>
          </button>
        </div>

        <p className="mt-10 text-center text-xs text-gray-500">Passwords are configured internally. Contact the admin team if you need access.</p>
      </main>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{role} Access</h2>
              <button type="button" onClick={closeModal} aria-label="Close" className="p-2 rounded-full hover:bg-gray-100">✕</button>
            </div>
            <p className="mt-1 text-sm text-gray-600">Enter the {role} password to continue.</p>
            <form onSubmit={submitPassword} className="mt-6 space-y-4">
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-[#14B0F2] focus:border-[#14B0F2]"
              />
              {error && <div className="text-sm text-red-600">{error}</div>}
              <div className="flex gap-3">
                <button type="submit" className="flex-1 rounded-xl bg-[#14B0F2] text-white px-4 py-3 font-semibold hover:bg-[#129EDB]">Continue</button>
                <button type="button" onClick={closeModal} className="rounded-xl border border-gray-300 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSelect;