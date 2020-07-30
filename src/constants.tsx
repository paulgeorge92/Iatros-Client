import React, { ReactNode } from 'react';
import { DesktopIcon, HeartBeatIcon, CalendarIcon, RecieptIcon, PrescriptionFileIcon, StoreIcon, MoneyBillIcon, RupeeIcon, DoctorIcon, SettingsIcon, UserIcon, FileIcon } from './CustomIcons';
import AdminDashboard from './Pages/Admin/Dashboard';
import Patients from './Pages/Admin/Patients/Patients';

interface MenuItem {
  name: string;
  path: string;
  index: number;
  subMenu?: Array<MenuItem>;
  icon?: React.ReactElement;
  showInMenu?: boolean;
  component?: ReactNode;
}

export const AdminPath = '/admin';
export const LogoImage = require('./assets/images/Logo.png') as string;
export const LogoWhiteImage = require('./assets/images/logo_white.png') as string;
export const AdminMenuItems: Array<MenuItem> = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    index: 1,
    icon: <DesktopIcon />,
    showInMenu: true,
    component: <AdminDashboard />,
  },
  {
    name: 'Patients',
    path: 'patients',
    index: 2,
    icon: <HeartBeatIcon />,
    showInMenu: true,
    component: <Patients />,
  },
  {
    name: 'Appointments',
    path: 'appointments',
    index: 3,
    icon: <CalendarIcon />,
    showInMenu: true,
  },
  {
    name: 'Invoices',
    path: 'invoices',
    index: 4,
    icon: <RecieptIcon />,
    showInMenu: true,
  },
  {
    name: 'Prescriptions',
    path: 'prescriptions',
    index: 5,
    icon: <PrescriptionFileIcon />,
    showInMenu: true,
  },
  {
    name: 'Pharmacy',
    path: '',
    index: 6,
    icon: <StoreIcon />,
    showInMenu: true,
    subMenu: [
      {
        name: 'POS/Bill',
        path: 'pharmacy/billing',
        index: 1,
        showInMenu: true,
      },
      {
        name: 'Purchases',
        path: 'pharmacy/purchasing',
        index: 2,
        showInMenu: true,
      },
      {
        name: 'Stock adjustment',
        path: 'pharmacy/stock-adjustment',
        index: 3,
        showInMenu: true,
      },
      {
        name: 'Medicines',
        path: 'pharmacy/medicine',
        index: 4,
        showInMenu: true,
      },
      {
        name: 'Medicine Categories',
        path: 'pharmacy/medicine-categories',
        index: 5,
        showInMenu: true,
      },
    ],
  },
  {
    name: 'Requests/Enquiry',
    path: 'requests',
    index: 7,
    icon: <FileIcon />,
    showInMenu: true,
  },
  {
    name: 'Expenses',
    path: 'expenses',
    index: 8,
    icon: <MoneyBillIcon />,
    showInMenu: true,
  },
  {
    name: 'Payroll',
    path: '',
    index: 9,
    icon: <RupeeIcon />,
    showInMenu: true,
    subMenu: [
      {
        name: 'Salary Template',
        path: 'payroll/salary-template',
        index: 1,
        showInMenu: true,
      },
      {
        name: 'Manage Salary',
        path: 'payroll/manage-salary',
        index: 2,
        showInMenu: true,
      },
      {
        name: 'Make Payement',
        path: 'payroll/payments',
        index: 3,
        showInMenu: true,
      },
    ],
  },
  {
    name: 'Doctors',
    path: 'doctors',
    index: 10,
    icon: <DoctorIcon />,
    showInMenu: true,
  },
  {
    name: 'Users',
    path: '',
    index: 11,
    icon: <UserIcon />,
    showInMenu: true,
    subMenu: [
      {
        name: 'Users',
        path: 'users',
        index: 1,
        showInMenu: true,
      },
      {
        name: 'User Roles',
        path: 'user-roles',
        index: 2,
        showInMenu: true,
      },
    ],
  },
  {
    name: 'Settings',
    path: '',
    index: 12,
    icon: <SettingsIcon />,
    showInMenu: true,
    subMenu: [
      {
        name: 'System Info',
        path: 'settings/sysinfo',
        index: 1,
        showInMenu: true,
      },
      {
        name: 'Theme Customization',
        path: 'settings/customize',
        index: 2,
        showInMenu: true,
      },
      {
        name: 'Taxes',
        path: 'settings/taxes',
        index: 3,
        showInMenu: true,
      },
      {
        name: 'Expense Types',
        path: 'settings/expense-types',
        index: 4,
        showInMenu: true,
      },
      {
        name: 'Suppliers',
        path: 'settings/suppliers',
        index: 5,
        showInMenu: true,
      },
    ],
  },
];
