import React from 'react';
import { DesktopIcon, HeartBeatIcon, CalendarIcon, RecieptIcon, PrescriptionFileIcon, StoreIcon, MoneyBillIcon, RupeeIcon, DoctorIcon, SettingsIcon, UserIcon, FileIcon } from './CustomIcons';
import AdminDashboard from './Pages/Admin/Dashboard';
import Patients from './Pages/Admin/Patients/Patients';
import PatientForm from './Pages/Admin/Patients/PatientForm';
import MedicineCategories from './Pages/Admin/Pharmacy/MedicineCategory';
import Taxes from './Pages/Admin/Settings/Taxes';
import PaymentMethods from './Pages/Admin/Settings/PaymentMethods';
import ExpenseTypes from './Pages/Admin/Settings/ExpenseTypes';
import Suppliers from './Pages/Admin/Settings/Suppliers';
import ClinicalNotes from './Pages/Admin/Settings/ClinicalNotes';
import { BloodGroup } from './models/Enums';
import ErrorPage404 from './Pages/Error/404';
import Medicines from './Pages/Admin/Pharmacy/Medicines/Medicines';
import MedicineForm from './Pages/Admin/Pharmacy/Medicines/MedicineForm';
import PurchaseForm from './Pages/Admin/Pharmacy/Purchase/PurchaseForm';
import Purchases from './Pages/Admin/Pharmacy/Purchase/Purchases';
import ViewMedicine from './Pages/Admin/Pharmacy/Medicines/ViewMedicine';
import { MenuItem } from './models/MenuItem';
import ViewPurchase from './Pages/Admin/Pharmacy/Purchase/ViewPurchase';
import Doctors from './Pages/Admin/Doctors/Doctors';
import Appointments from './Pages/Admin/Appointments/Appointments.';
import ViewPatient from './Pages/Admin/Patients/ViewPatient';

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
        name: 'Add Patient',
        path: 'patients/new',
        showInMenu: false,
        index: 1,
        component: <PatientForm />,
      },
      {
        name: 'Edit Patient',
        path: 'patients/edit/:id',
        showInMenu: false,
        index: 2,
        component: <PatientForm />,
      },
      {
        name: 'View Patient',
        path: 'patients/view/:id',
        showInMenu: false,
        index: 3,
        component: <ViewPatient />,
      },
    ],
  },
  {
    name: 'Appointments',
    path: 'appointments',
    index: 3,
    icon: <CalendarIcon />,
    showInMenu: true,
    component: <Appointments />,
  },
  {
    name: 'Invoices',
    path: 'invoices',
    index: 4,
    icon: <RecieptIcon />,
    showInMenu: true,
    component: <ErrorPage404 homeUrl={AdminPath} />,
  },
  {
    name: 'Prescriptions',
    path: 'prescriptions',
    index: 5,
    icon: <PrescriptionFileIcon />,
    showInMenu: true,
    component: <ErrorPage404 homeUrl={AdminPath} />,
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
        component: <ErrorPage404 homeUrl={AdminPath} />,
      },
      {
        name: 'Purchases',
        path: 'pharmacy/purchasing',
        index: 2,
        showInMenu: true,
        component: <Purchases />,
        showSubMenu: false,
        subMenu: [
          {
            name: 'New Purchase',
            path: 'pharmacy/purchasing/new',
            index: 1,
            showInMenu: false,
            component: <PurchaseForm />,
          },
          {
            name: 'Edit Purchase',
            path: 'pharmacy/purchasing/edit/:id',
            index: 2,
            showInMenu: false,
            component: <PurchaseForm />,
          },
          {
            name: 'View Purchase',
            path: 'pharmacy/purchasing/view/:id',
            index: 2,
            showInMenu: false,
            component: <ViewPurchase />,
          },
        ],
      },
      {
        name: 'Stock adjustment',
        path: 'pharmacy/stock-adjustment',
        index: 3,
        showInMenu: true,
        component: <ErrorPage404 homeUrl={AdminPath} />,
      },
      {
        name: 'Medicines',
        path: 'pharmacy/medicines',
        index: 4,
        showInMenu: true,
        component: <Medicines />,
        showSubMenu: false,
        subMenu: [
          {
            name: 'New Medicine',
            path: 'pharmacy/medicines/new',
            index: 1,
            showInMenu: false,
            component: <MedicineForm />,
          },
          {
            name: 'Edit Medicine',
            path: 'pharmacy/medicines/edit/:id',
            index: 2,
            showInMenu: false,
            component: <MedicineForm />,
          },
          {
            name: 'View Medicine',
            path: 'pharmacy/medicines/view/:id',
            index: 3,
            showInMenu: false,
            component: <ViewMedicine />,
          },
        ],
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
    component: <ErrorPage404 homeUrl={AdminPath} />,
  },
  {
    name: 'Expenses',
    path: 'expenses',
    index: 8,
    icon: <MoneyBillIcon />,
    showInMenu: true,
    component: <ErrorPage404 homeUrl={AdminPath} />,
  },
  {
    name: 'Payroll',
    path: '',
    index: 9,
    icon: <RupeeIcon />,
    showInMenu: false,
    showSubMenu: false,
    subMenu: [
      {
        name: 'Salary Template',
        path: 'payroll/salary-template',
        index: 1,
        showInMenu: true,
        component: <ErrorPage404 homeUrl={AdminPath} />,
      },
      {
        name: 'Manage Salary',
        path: 'payroll/manage-salary',
        index: 2,
        showInMenu: true,
        component: <ErrorPage404 homeUrl={AdminPath} />,
      },
      {
        name: 'Make Payement',
        path: 'payroll/payments',
        index: 3,
        showInMenu: true,
        component: <ErrorPage404 homeUrl={AdminPath} />,
      },
    ],
  },
  {
    name: 'Doctors',
    path: 'doctors',
    index: 10,
    icon: <DoctorIcon />,
    showInMenu: true,
    component: <Doctors />,
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
        component: <ErrorPage404 homeUrl={AdminPath} />,
      },
      {
        name: 'User Roles',
        path: 'user-roles',
        index: 2,
        showInMenu: true,
        component: <ErrorPage404 homeUrl={AdminPath} />,
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
        component: <ErrorPage404 homeUrl={AdminPath} />,
      },
      {
        name: 'Theme Customization',
        path: 'settings/customize',
        index: 2,
        showInMenu: true,
        component: <ErrorPage404 homeUrl={AdminPath} />,
      },
      {
        name: 'Clinical Notes',
        path: 'settings/clincal-notes',
        index: 3,
        showInMenu: true,
        component: <ClinicalNotes />,
      },
      {
        name: 'Taxes',
        path: 'settings/taxes',
        index: 4,
        showInMenu: true,
        component: <Taxes />,
      },
      {
        name: 'Expense Types',
        path: 'settings/expense-types',
        index: 5,
        showInMenu: true,
        component: <ExpenseTypes />,
      },
      {
        name: 'Suppliers',
        path: 'settings/suppliers',
        index: 6,
        showInMenu: true,
        component: <Suppliers />,
      },
      {
        name: 'Payement Methods',
        path: 'settings/payement-methods',
        index: 7,
        showInMenu: true,
        component: <PaymentMethods />,
      },
    ],
  },
];

_AdminMenuItems.getMenu = function (name: string): MenuItem {
  let _menu = this.menu;
  function findId(name: string, arr: Array<MenuItem>): any {
    // eslint-disable-next-line
    return arr.reduce((a, item) => {
      if (a) return a;
      if (item.name === name) return item;
      if (item.subMenu) return findId(name, item.subMenu);
    }, null);
  }
  return findId(name, _menu);
};

export const AdminMenuItems = _AdminMenuItems;

export enum ContextActions {
  LOGOUT_USER = -1,
  LOGIN_USER = 1,
  SETTINGS_UPDATE = 2,
}

export const BloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
