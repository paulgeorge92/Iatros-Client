import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import { StatCard } from '../../components/StatCard/StatCard';
import { LoadingOutlined } from '@ant-design/icons';
import { HeartBeatIcon, CalendarIcon, RecieptIcon, FileIcon } from '../../CustomIcons';
import { ChartAssistData } from '../../components/ChartAssistData/ChartAssistData';
import { LineChart, LineChartProps } from '../../components/Charts';

const AdminDashboard = (props: any) => {
  interface Stats {
    patients?: number;
    appointments?: number;
    invoices?: number;
    requests?: number;
  }

  const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  const [stats, setStats] = useState<Stats>({});
  const [incomExpenseChartData, setIncomExpenseChartData] = useState<any>({});
  const [incomeExpenseFacts, setIncomeExpenseFacts] = useState<any>({});
  const [pharmacyIncomeExpenseChartData, setPharmacyIncomeExpenseChartData] = useState<any>({});
  const [pharmacyIncomeExpenseFacts, setPharmacyIncomeExpenseFacts] = useState<any>({});
  const [patientsChartData, setPatientsChartData] = useState<any>({});
  const [requestChartData, setRequestChartData] = useState<any>({});

  useEffect(() => {
    setTimeout(function () {
      setStats({
        patients: 1,
        appointments: 10,
        invoices: 2,
        requests: 3,
      });
      let incomeExpenseData: LineChartProps = {
        id: 'income-expense',
        series: [
          {
            name: 'Expense',
            data: [5807, 9078, 9983, 7713, 8491, 8491, 7090, 12661, 14688, 4573, 6678, 11530],
          },
          {
            name: 'Income',
            data: [7246, 11328, 12447, 11360, 12109, 11965, 8772, 10784, 9519, 9012, 14155, 13242],
          },
        ],
        xAxis: months,
        height: 300,
        width: '100%',
      };
      setIncomExpenseChartData(incomeExpenseData);
      setIncomeExpenseFacts({
        revenue12Months: 'Rs. 12346',
        revenue30Days: 'Rs.23457',
        expense12Months: 'Rs.9999',
        expense30Days: 'Rs.12345',
      });

      let pharmacyIncomeExpenseData: LineChartProps = {
        id: 'pharmacy-income-expense',
        series: [
          {
            name: 'Expense',
            data: [5807, 9078, 9983, 7713, 8491, 8491, 7090, 12661, 14688, 4573, 6678, 11530],
          },
          {
            name: 'Income',
            data: [7246, 11328, 12447, 11360, 12109, 11965, 8772, 10784, 9519, 9012, 14155, 13242],
          },
        ],
        xAxis: months,
        height: 300,
        width: '100%',
      };
      setPharmacyIncomeExpenseChartData(pharmacyIncomeExpenseData);
      setPharmacyIncomeExpenseFacts({
        revenue12Months: 'Rs. 12346',
        revenue30Days: 'Rs.23457',
        purchase12Months: 'Rs.9999',
        purchase30Days: 'Rs.12345',
      });

      setPatientsChartData({
        id: 'patients',
        series: [
          {
            name: 'Patients',
            data: [90, 100, 56, 45, 20, 45, 89, 12, 56, 89, 23, 9],
          },
        ],
        xAxis: months,
        height: 300,
        width: '100%',
      });
      setRequestChartData({
        id: 'requests',
        series: [
          {
            name: 'Requests',
            data: [2, 4, 14, 12, 5, 9, 34, 15, 6, 34, 2, 0],
          },
        ],
        xAxis: months,
        height: 300,
        width: '100%',
      });
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      console.log('cleaned up');
    };
  }, []);

  return (
    <>
      <Row gutter={[16, 24]}>
        <Col xs={24} md={12} lg={6}>
          <StatCard title="Patients" value={stats.patients} icon={<HeartBeatIcon />} iconColor="rgba(194, 17, 7, .7)"></StatCard>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <StatCard title="Appointments" value={stats.appointments} icon={<CalendarIcon />} iconColor="rgb(251, 150, 120)"></StatCard>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <StatCard title="Invoices" value={stats.invoices} icon={<RecieptIcon />} iconColor="rgb(11 195 110)"></StatCard>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <StatCard title="Requests" value={stats.requests} icon={<FileIcon />} iconColor="rgb(254 193 7)"></StatCard>
        </Col>
      </Row>

      {/* Income Expense Chart */}
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Card title="Income and Expense">
            <Row gutter={24}>
              <Col xs={24} lg={16} id="incomeExpenseChart">
                {incomExpenseChartData.series ? <LineChart {...incomExpenseChartData}></LineChart> : <LoadingOutlined className="loading-center" />}
              </Col>
              <Col xs={24} lg={8}>
                <Row gutter={[24, 24]}>
                  <ChartAssistData title="Revenue" caption="in Last 12 months" value={incomeExpenseFacts.revenue12Months}></ChartAssistData>
                  <ChartAssistData title="Revenue" caption="in Last 30 days" value={incomeExpenseFacts.revenue30Days}></ChartAssistData>
                  <ChartAssistData title="Expenses" caption="in Last 12 months" value={incomeExpenseFacts.expense12Months}></ChartAssistData>
                  <ChartAssistData title="Expenses" caption="in Last 30 days" value={incomeExpenseFacts.expense30Days}></ChartAssistData>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Pharmacy Income and Expense */}
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Card title="Pharmacy Revenue and Purchase">
            <Row gutter={24}>
              <Col xs={24} lg={16} id="pharmaceIncomeExpenseChart">
                {pharmacyIncomeExpenseChartData.series ? <LineChart {...pharmacyIncomeExpenseChartData}></LineChart> : <LoadingOutlined className="loading-center" />}
              </Col>
              <Col xs={24} lg={8}>
                <Row gutter={[24, 24]}>
                  <ChartAssistData title="Revenue" caption="in Last 12 months" value={pharmacyIncomeExpenseFacts.revenue12Months}></ChartAssistData>
                  <ChartAssistData title="Revenue" caption="in Last 30 days" value={pharmacyIncomeExpenseFacts.revenue30Days}></ChartAssistData>
                  <ChartAssistData title="Purchase" caption="in Last 12 months" value={pharmacyIncomeExpenseFacts.purchase12Months}></ChartAssistData>
                  <ChartAssistData title="Purchase" caption="in Last 30 days" value={pharmacyIncomeExpenseFacts.purchase30Days}></ChartAssistData>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 24]}>
        <Col xs={24} md={12}>
          <Card title="Patients">{patientsChartData.series ? <LineChart {...patientsChartData}></LineChart> : <LoadingOutlined className="loading-center" />}</Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Requests">{requestChartData.series ? <LineChart {...requestChartData}></LineChart> : <LoadingOutlined className="loading-center" />}</Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
