import { useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage.jsx';
import AdminSelect from './pages/AdminSelect.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import TeacherPanel from './pages/TeacherPanel.jsx';

const App = () => {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (route.startsWith('#select')) {
    return <AdminSelect />;
  }
  if (route.startsWith('#admin-panel')) {
    const role = sessionStorage.getItem('ikids_role');
    if (role !== 'Admin') {
      window.location.hash = '#select';
      return <AdminSelect />;
    }
    return <AdminPanel />;
  }
  if (route.startsWith('#teacher-panel')) { // Changed from #user-panel
    const role = sessionStorage.getItem('ikids_role');
    if (role !== 'Teacher') {
      window.location.hash = '#select';
      return <AdminSelect />;
    }
    return <TeacherPanel />;
  }
  return <LandingPage />;
};

export default App;