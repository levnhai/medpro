const routes = {
  home: '/',
  about: '/about',
  downApp: '/huong-dan/cai-dat-ung-dung',
  refunds: '/huong-dan/quy-trinh-hoan-phi',
  question: '/huong-dan/cau-hoi-thuong-gap',
  appointment: '/huong-dan/dat-lich-kham',
  facilitie: 'co-so-y-te',
  login: '/login',
  AdminLogin: '/admin-login',
  checkPhone: '/check-phone',
  otpInput: '/otp-input',
  RegisterAccount: 'register-account',
  appointmentDoctor: '/dich-vu-y-te/dat-kham-theo-bac-sy',
  appointmentFacility: '/dich-vu-y-te/dat-kham-tai-co-so',
  appointmentDoctorDetail: '/chon-lich-kham/:id/',

  // Admin
  dashboard: '/system',
  userManage: '/system/user-manage',
  docterManage: '/system/docter-manage',
  docterInfor: '/system/docter-infor',
  hospitalManage: '/system/hospital-manage',
  scheduleManage: '/docter/manage-schedule',
  notFound: '*',
};
export default routes;
