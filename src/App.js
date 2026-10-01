import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";

import AddJob from "./features/jobs/AddJob";
import LocationForm from "./features/locations/LocationForm";
import JobTypeForm from "./features/jobTypes/JobTypeForm";
import LocationTable from "./features/locations/LocationTable";
import EditLocation from "./features/locations/EditLocation";
import CategoryTable from "./features/categories/CategoryTable";
import CategoryForm from "./features/categories/CategoryForm";
import EditCategory from "./features/categories/EditCategory";
import JobTypeTable from "./features/jobTypes/JobTypeTable";
import EditJobType from "./features/jobTypes/EditJobType";
import CompanyTable from "./features/companies/CompanyTable";
import CompanyForm from "./features/companies/CompanyForm";
import EditCompany from "./features/companies/EditCompany";
import CompanyList from "./features/companies/CompanyList";
import CompanyDetails from "./features/companies/CompanyDetails";

import JobList from "./features/jobs/JobList";
import JobDetail from "./features/jobs/JobDetail";
import Company from "./features/companies/Company";
import SearchCompany from "./features/companies/SearchCompany";
import Job from "./features/jobs/Job";
import JobTable from "./features/jobs/JobTable";
import EditJob from "./features/jobs/EditJob";
import Application from "./features/application/Application";

import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Login from "./features/register/Login";
import Signup from "./features/register/Signup";
import Layout from "./components/layout/Layout";
import UnAuthenticated from "./components/pages/UnAuthenticated";
import ProtectedRoute from "./features/auth/PotectedRoute";
import AdminLayout from "./components/layout/AdminLayout";
import About from "./components/pages/About";
import UserTable from "./features/user/UserTable";
import ProfilePage from "./features/user/ProfilePage";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="jobPost" element={<Job />} />
          <Route path="jobList" element={<JobList />} />
          <Route path="jobPost/:jobPostId" element={<JobDetail />} />
          <Route path="company" element={<Company />} />
          <Route path="company/:companyId" element={<CompanyDetails />} />
          <Route path="companyList" element={<CompanyList />} />
          <Route path="searchCompany" element={<SearchCompany />} />
          <Route path="about" element={<About />} />
          <Route path="userTable" element={<UserTable />} />

          {/* Protected Routes for Candidate */}
          <Route element={<ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN"]} />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="app" element={<Application />} />
            <Route path="unauthenticated" element={<UnAuthenticated />} />
          </Route>
        </Route>

        {/* Protected Routes for Admin */}
        <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
          <Route path="/admin/" element={<AdminLayout />}>
            <Route path="locationForm" element={<LocationForm />} />
            <Route path="locationTable" element={<LocationTable />} />
            <Route path="editLocation/id/:locationId" element={<EditLocation />} />
            <Route path="companyTable" element={<CompanyTable />} />
            <Route path="companyForm" element={<CompanyForm />} />
            <Route path="editCompany/id/:companyId" element={<EditCompany />} />
            <Route path="categoryForm" element={<CategoryForm />} />
            <Route path="categoryTable" element={<CategoryTable />} />
            <Route path="editCategory/id/:categoryId" element={<EditCategory />} />
            <Route path="addJob" element={<AddJob />} />
            <Route path="jobtable" element={<JobTable />} />
            <Route path="editJobPost/id/:jobPostId" element={<EditJob />} />
            <Route path="jobTypeForm" element={<JobTypeForm />} />
            <Route path="jobTypeTable" element={<JobTypeTable />} />
            <Route path="editJobType/id/:jobTypeId" element={<EditJobType />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
