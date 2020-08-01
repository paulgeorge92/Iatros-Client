import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

interface DateRangePickerProps {
  onChange?: Function;
}

const DateRangePicker = (props: DateRangePickerProps) => {
  const onChange = (dates: any, dateStrings: any) => {
    if (typeof props.onChange === 'function') {
      props.onChange(dates, dateStrings);
    }
  };

  return (
    <RangePicker
      ranges={{
        Today: [moment(), moment()],
        Yesterday: [moment().add(-1, 'd'), moment().add(-1, 'd')],
        'Last 7 Days': [moment().add(-7, 'd'), moment()],
        'Last 30 days': [moment().add(-30, 'd'), moment()],
        'This Month': [moment().startOf('month'), moment()],
        'Last Month': [moment().add(-1, 'month').startOf('month'), moment().add(-1, 'month').endOf('month')],
        'This Year': [moment().startOf('year'), moment()],
        'Last Year': [moment().add(-1, 'year').startOf('year'), moment().add(-1, 'year').endOf('year')],
      }}
      onChange={onChange}
    ></RangePicker>
  );
};

export default DateRangePicker;
