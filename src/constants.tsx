import React, { ReactNode } from 'react';
import { DesktopIcon, HeartBeatIcon, CalendarIcon, RecieptIcon, PrescriptionFileIcon, StoreIcon, MoneyBillIcon, RupeeIcon, DoctorIcon, SettingsIcon, UserIcon, FileIcon } from './CustomIcons';
import AdminDashboard from './Pages/Admin/Dashboard';
import Patients from './Pages/Admin/Patients/Patients';
import NewPatient from './Pages/Admin/Patients/NewPatient';
import MedicineCategories from './Pages/Admin/Pharmacy/MedicineCategory';
import Taxes from './Pages/Admin/Settings/Taxes';
import PaymentMethods from './Pages/Admin/Settings/PaymentMethods';

interface MenuItem {
  name: string;
  path: string;
  index: number;
  subMenu?: Array<MenuItem>;
  icon?: React.ReactElement;
  showInMenu?: boolean;
  component?: ReactNode;
  showSubMenu?: Boolean;
}

export const AdminPath = '/admin';
export const LogoImage = require('./assets/images/Logo.png') as string;
export const LogoWhiteImage = require('./assets/images/logo_white.png') as string;
let _AdminMenuItems: {
  menu: Array<MenuItem>;
  getMenu: Function;
} = {
  menu: [],
  getMenu: function () {},
};

_AdminMenuItems.menu = [
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
    showSubMenu: false,
    subMenu: [
      {
        name: 'Add Patients',
        path: 'patients/new',
        showInMenu: true,
        index: 1,
        component: <NewPatient />,
      },
    ],
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
    showSubMenu: true,
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
        component: <MedicineCategories />,
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
    showSubMenu: true,
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
    showSubMenu: true,
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
    showSubMenu: true,
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
        component: <Taxes />,
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
      {
        name: 'Payement Methods',
        path: 'settings/payement-methods',
        index: 6,
        showInMenu: true,
        component: <PaymentMethods />,
      },
    ],
  },
];

_AdminMenuItems.getMenu = function (name: string): MenuItem {
  let _menu = this.menu;
  function findId(name: string, arr: Array<MenuItem>): any {
    return arr.reduce((a, item) => {
      if (a) return a;
      if (item.name === name) return item;
      if (item.subMenu) return findId(name, item.subMenu);
    }, null);
  }
  return findId(name, _menu);
};

export const AdminMenuItems = _AdminMenuItems;

export enum BloodGroup {
  APositive = 'A+ve',
  ANegative = 'A-ve',
  BPositive = 'B+ve',
  BNegative = 'B-ve',
  OPositive = 'O+ve',
  ONegative = 'O-ve',
  ABPositive = 'AB+ve',
  ABNegative = 'AB-ve',
}

export const BloodGroups = [BloodGroup.APositive, BloodGroup.ANegative, BloodGroup.BPositive, BloodGroup.BNegative, BloodGroup.OPositive, BloodGroup.ONegative, BloodGroup.ABPositive, BloodGroup.ABNegative];
