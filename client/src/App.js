import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';


//Authentication Pages
import { LoginPage, RegisterPage, ResetPasswordPage, ForgetPasswordPage } from './pages/auth/indexAuth'


//Dashboard Pages 
import { AnnouncementsPage,
    ComplaintsPage,
    ContributionsPage,
    DashboardPage,
    DocumentsPage,
    MeetingsPage,
    UsersPage,
    VotesPage,
    MembersPage, } from './pages/admin/indexAdmin'

//Forms ADD
import {UserPost} from './components/admin/post/index'

//Forms UPDATE
import {UserPut} from './components/admin/put/index'


import Layout from './components/shared/Layout';
import AuthRequire from './utils/AuthRequire';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='resetpassword' element={<ResetPasswordPage />} />
        <Route path='forgetpassword' element={<ForgetPasswordPage />} />
        
        <Route element={<AuthRequire />}>
          <Route path="dashboard/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="contributions" element={<ContributionsPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="meetings" element={<MeetingsPage />} />
            <Route path="complaints" element={<ComplaintsPage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="members" element={<MembersPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="votes" element={<VotesPage />} />

            <Route path="users/add" element={<UserPost />} />
            <Route path="users/:id" element={<UserPut />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;