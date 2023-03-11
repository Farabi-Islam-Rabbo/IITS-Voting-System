import React from 'react'
import AllProfilePage from './Pages/AllProfilePage'
import CreateProfilePage from './Pages/CreateProfilePage'
import UpdateProfilePage from './Pages/UpdateProfilePage'
import PermissionPage from './Pages/PermissionPage'
import CreateUserPage from './Pages/CreateUserPage'
import DashboardPage from './Pages/DashboardPage'
import AdminDashboardPage from './Pages/AdminDashboardPage'
import LoginPage from './Pages/LoginPage'
import RegistrationPage from './Pages/RegistrationPage'
import UpdateUserPage from './Pages/UpdateUserPage'
import UsersPage from './Pages/UsersPage'
import AllRequestPage from './Pages/AllRequestPage'
import ViewRequest from './Pages/ViewRequest'
import AllBillingPage from './Pages/AllBillingPage'
import CreateBillingPage from './Pages/CreateBillingPage'
import UpdateBillingPage from './Pages/UpdateBillingPage'
import CreatePermissionPage from './Pages/CreatePermissionPage'
import UpdatePermissionPage from './Pages/UpdatePermissionPage'
import SubAdmins from './Pages/SubAdmins'
import CreateSubAdmins from './Pages/CreateSubAdmins'
import TransferHistory from './Pages/TransferHistory'
import ViewHistory from './Pages/ViewHistory'
import UpdateSubAdmins from './Pages/UpdateSubAdmins'
import Custom from './Pages/Custom'
import CreateCustom from './Pages/CreateCustom'
import UpdateCustoms from './Pages/UpdateCustoms'
import UpdatePasswordPage from './Pages/UpdatePassword'
import ForgetPasswordPage from './Pages/ForgetPasswordPage'
import AllCommittee from './Pages/AllCommittee'
import CreateCommittee from './Pages/CreateCommittee'
import AllWing from './Pages/AllWing'
import CreateWing from './Pages/CreateWing'
import AllPost from './Pages/AllPost'
import CreatePost from './Pages/CreatePost'
import AllApplication from './Pages/AllApplication'
import CreateApplication from './Pages/CreateApplication'
import AllApp from './Pages/AllApp'
import ViewApplication from './Pages/ViewApplication'
import AllUserType from './Pages/AllUserType'
import CreateProgram from './Pages/CreateProgram'
import AllProgramCreate from './Pages/AllProgramCreate'
import CreateUserType from './Pages/CreateUserType'
import AllCreateStudent from './Pages/AllCreateStudent'
import CreateStudent from './Pages/CreateStudent'
import AllVotingPannel from './Pages/AllVotingPannel'
import UpdateCommitteeee from './Pages/UpdateCommitteeee'
import UpdateWing from './Pages/UpdateWing'
import UpdatePost from './Pages/UpdatePost'
import UpdateUserType from './Pages/UpdateUserType'
import UpdateProgram from './Pages/UpdateProgram'

const routes = [
  {
    path: '/login',
    exact: true,
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/forgot-password',
    exact: true,
    name: 'Forget Password',
    component: ForgetPasswordPage,
  },
  {
    path: '/register',
    exact: true,
    name: 'Registration Page',
    component: RegistrationPage,
  },
  {
    path: '/dashboard',
    exact: true,
    name: 'Dashboard',
    component: DashboardPage,
  },
  {
    path: '/admin-dashboard',
    exact: true,
    name: 'Admin Dashboard',
    component: AdminDashboardPage,
  },
  {
    path: '/create-committee',
    exact: true,
    name: 'Create Committee',
    component: CreateCommittee,
  },
  {
    path: '/update-committee/:id',
    exact: true,
    name: 'Update Committee',
    component: UpdateCommitteeee,
  },
  {
    path: '/update-wing/:id',
    exact: true,
    name: 'Update wing',
    component: UpdateWing,
  },
  {
    path: '/update-post/:id',
    exact: true,
    name: 'Update Post',
    component: UpdatePost,
  },
  {
    path: '/update-user-type/:id',
    exact: true,
    name: 'Update User-Type',
    component: UpdateUserType,
  },
  {
    path: '/update-program/:id',
    exact: true,
    name: 'Update Program',
    component: UpdateProgram,
  },
  {
    path: '/create-wing',
    exact: true,
    name: 'Create Wing',
    component: CreateWing,
  },
  {
    path: '/create-program',
    exact: true,
    name: 'Create Program',
    component: CreateProgram,
  },
  {
    path: '/create-usertype',
    exact: true,
    name: 'Create User Type',
    component: CreateUserType,
  },
  {
    path: '/create-post',
    exact: true,
    name: 'Create Post',
    component: CreatePost,
  },
  {
     path: '/create-application',
     exact: true,
     name: 'Create Application',
     component: CreateApplication,
  },
  {
    path: '/student',
    exact: true,
    name: 'Student',
    component: AllCreateStudent,
 },
  {
    path: '/create-student',
    exact: true,
    name: 'Create Student',
    component: CreateStudent,
 },
  {
    path: '/users',
    exact: true,
    name: 'Users',
    component: UsersPage,
  },
  {
    path: '/committee',
    exact: true,
    name: 'Committee',
    component: AllCommittee,
  },
  {
    path: '/wing',
    exact: true,
    name: 'Wing',
    component: AllWing,
  },
  {
    path: '/post',
    exact: true,
    name: 'Post',
    component: AllPost,
  },
  {
    path: '/std-application',
    exact: true,
    name: 'Student Application',
    component: AllApp,
  },
  {
    path: '/application',
    exact: true,
    name: 'Application',
    component: AllApplication,
  },
  {
    path: '/view-application',
    exact: true,
    name: 'View Application',
    component: ViewApplication,
  },
  {
    path: '/user-type',
    exact: true,
    name: 'User Type',
    component: AllUserType,
  },
  {
    path: '/program',
    exact: true,
    name: 'Program Create',
    component: AllProgramCreate,
  },
  {
    path: '/create-user',
    exact: true,
    name: 'Create User',
    component: CreateUserPage,
  },
  {
    path: '/all-request',
    exact: true,
    name: 'Create User',
    component: AllRequestPage,
  },
  {
    path: '/voting-pannel',
    exact: true,
    name: 'Voting Pannel',
    component: AllVotingPannel,
  },
  {
    path: '/view-request/:id',
    exact: true,
    name: 'Create User',
    component: ViewRequest,
  },
  {
    path: '/update-user/:id',
    exact: true,
    name: 'Update User',
    component: UpdateUserPage,
  },
  {
    path: '/all-billing',
    exact: true,
    name: 'Create User',
    component: AllBillingPage,
  },
  {
    path: '/create-billing',
    exact: true,
    name: 'Create User',
    component: CreateBillingPage,
  },
  {
    path: '/update-billing/:id',
    exact: true,
    name: 'Update User',
    component: UpdateBillingPage,
  },
  {
    path: '/permission',
    exact: true,
    name: 'Permission',
    component: PermissionPage,
  },
  {
    path: '/permission/create',
    exact: true,
    name: 'Create Permission',
    component: CreatePermissionPage,
  },
  {
    path: '/permission/update/:id',
    exact: true,
    name: 'Update Permission',
    component: UpdatePermissionPage,
  },
  {
    path: '/sub-admins',
    exact: true,
    name: 'Sub Admins',
    component: SubAdmins,
  },
  {
    path: '/create-sub-admins',
    exact: true,
    name: 'Create Sub-Admins',
    component: CreateSubAdmins,
  },
  {
    path: '/transfer-history',
    path: '/update-sub-admin/:id',
    exact: true,
    name: 'Update Sub-Admin',
    component: UpdateSubAdmins,
  },
  {
    path: '/update-customs/:id',
    exact: true,
    name: 'Update Customs',
    component: UpdateCustoms,
  },
  {
    path: '/customs',
    exact: true,
    name: 'Custom',
    component: Custom,
  },
  {
    path: '/create-custom',
    exact: true,
    name: 'Create Custom',
    component: CreateCustom,
  },
  {
    path: '/transfer-history/:id',
    exact: true,
    name: 'Transfer History',
    component: TransferHistory,
  },
  {
    path: '/view-history/:id',
    exact: true,
    name: 'View History',
    component: ViewHistory,
  },
  {
    path: '/profile',
    exact: true,
    name: 'Create Profile',
    component: AllProfilePage,
  },
  {
    path: '/create-profile',
    exact: true,
    name: 'Create Profile',
    component: CreateProfilePage,
  },
  {
    path: '/update-profile/:id',
    exact: true,
    name: 'Update Profile',
    component: UpdateProfilePage,
  },
  {
    path: '/update-password',
    exact: true,
    name: 'Update Password',
    component: UpdatePasswordPage,
  },
]

export default routes
