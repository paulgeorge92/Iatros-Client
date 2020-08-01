import moment from 'moment';

export const DatePickerRanges = () => {
  var lastMonth = moment().add(-1, 'm');
  var lastYear = moment().add(-1, 'y');
  return {
    Today: [moment(), moment()],
    Yesterday: [moment().add(-1, 'd'), moment().add(-1, 'd')],
    'Last 7 Days': [moment().add(-7, 'd'), moment()],
    'Last 30 days': [moment().add(-30, 'd'), moment()],
    'This Month': [moment().startOf('month'), moment()],
    'Last Month': [lastMonth.startOf('month'), lastMonth.endOf('month')],
    'This Year': [moment().startOf('year'), moment()],
    'Last Year': [lastYear.startOf('year'), lastYear.endOf('year')],
  };
};
