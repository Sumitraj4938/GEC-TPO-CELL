import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/src/components/Layout';
import { Home } from '@/src/pages/Home';
import { BranchHome } from '@/src/pages/BranchHome';
import { Courses } from '@/src/pages/Courses';
import { AdminDashboard } from '@/src/pages/AdminDashboard';
import { Notifications } from '@/src/pages/Notifications';
import { Profile } from '@/src/pages/Profile';
import { ContentSectionPage } from '@/src/pages/ContentSectionPage';
import { AdminLogin } from '@/src/pages/AdminLogin';
import { AuthProvider } from '@/src/contexts/AuthContext';
import { ProtectedRoute } from '@/src/components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="branch/:branchId" element={<BranchHome />} />
            <Route path="courses" element={<Courses />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="content/:sectionId" element={<ContentSectionPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin-login" element={<AdminLogin />} />
            <Route 
              path="admin/*" 
              element={
                <ProtectedRoute roles={['super_admin', 'tpo_admin', 'hod_admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
