import { getApi, postApi, postFormData, putApi } from "./api/index";


// Get UnRegistered Student

export const GetAllUnRegisteredStudentId = () => getApi("GetUnregisteredStudentId");
export const GetStudentDetailsById = (id) => getApi(`GetStudentById/${id}`);
export const Register = (data) => postApi("api/Auth/register", data);
export const Login = (id, pass) => postApi(`api/Auth/Login/${id}/${pass}`);
export const VerifyOtp = (data) => postApi("api/Auth/VerifyOTP",data)

//auth
export const AdminLogin = (data) => postApi("auth/admin-login", data);

//otp
export const GetOtpByEmail = (data) => postApi("auth/send-user-otp", data);

//reset-password
export const ResetPassword = (data) => postApi("auth/reset-password", data);

//user

export const DownloadCertificate = (id) =>
  getApi(`user/download-certificate/${id}`);

export const GetAllUser = (data) => postApi("user/all-users", data);
export const RenewLicence = (data) => postApi("user/update-licence", data);
export const CreateUser = (data) => postApi("user/create", data);
export const GetUserDetails = (id) => getApi(`user/${id}`);
export const UpdateUser = (id, data) => putApi(`user/update/${id}`, data);
export const DeleteUser = (id) => postApi(`user/delete/${id}`);
export const UpdatePassword = (data) => postApi("user/update-password", data);

// Get Request
export const GetAllRequest = () => getApi("requests/getAll");
export const GetRequestDetails = (id) =>
  getApi(`requests/get-request-details/${id}`);
export const UpdateReqStatus = (id, data) =>
  putApi(`requests/update/${id}`, data);

// Billing
export const GetAllBilling = () => getApi("billing/all");
export const CreateBilling = (data) => postApi("billing/create", data);
export const GetBillingById = (id) => getApi(`billing/${id}`);
export const UpdateBilling = (id, data) => putApi(`billing/update/${id}`, data);
export const DeleteBilling = (id) => postApi(`billing/delete/${id}`);

// File
export const UploadFile = (formData) => postFormData("file/upload", formData);

//permission

export const CreatePermission = (data) => postApi("permission/create", data);

export const GetPermissionList = () =>
  getApi("permission/permission-list", null);
export const PermissionGetById = (id) =>
  getApi(`permission/getById/${id}`, null);
export const DeletePermission = (id) =>
  postApi(`permission/delete/${id}`, null);
export const UpdatePermission = (id, data) =>
  putApi(`permission/update-permission/${id}`, data);
export const GetPermissionListByType = (permissionType) =>
  getApi(`permission/permission-list-by-type/${permissionType}`, null);

//Tranfer History
export const GetTransferHistory = (id) =>
  getApi("requests/get-transfer-history/" + id);

// Profile
export const GetAllProfile = () => getApi("profile/all");
export const CreateProfile = (data) => postApi("profile/create", data);
export const GetProfileById = (id) => getApi(`profile/${id}`);
export const UpdateProfile = (id, data) => putApi(`profile/update/${id}`, data);
export const DeleteProfile = (id) => postApi(`profile/delete/${id}`);

// Sub-Admin
export const CreateSubAdmin = (data) => postApi("user/create-sub-admin", data);
export const UpdateSubAdmin = (id, data) =>
  putApi(`user/update-sub-admin/${id}`, data);
export const GetSubAdminDetails = (id) => getApi(`user/sub-admin/${id}`);

// Custom
export const CreateCustoms = (data) => postApi("user/create-custom", data);

//reports
export const UsersReport = (data) => postApi("user/users-report", data);
export const ApproveRequests = () =>
  getApi("requests/download-approve-requests");
export const TranferHistoryReport = (id) =>
  getApi(`download-transfer-history-report/${id}`);
export const DateWiseTran = (data) =>
  postApi("requests/date-wise-requests", data);

export const TransferRequestsPdf = (data) =>
  postApi("requests/transfer-requests-pdf", data);
