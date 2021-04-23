import { LogoWhiteImage } from '../constants';
import { AppSettings } from '../models/AppSettings';

export const APP_SETTINGS: AppSettings = {
  Theme: {
    Logo: LogoWhiteImage,
    FavIcon: require('../assets/images/favicon.ico') as string,
    HeaderBackground: '#c21107',
  },
  ClinicName: 'Iatros',
  ClinicLegalName: 'Iatros',
  EmailAddress: 'hello@iatros.com',
  Timezone: '',
  ContactNumber: '1234567890',
  DateFormat: 'DD MMMM YYYY',
  MonthFormat: 'MMM YYYY',
  Currency: '₹',
  CurrencyCode: 'INR',
  PatientDataVisibleToAll: false,
};
