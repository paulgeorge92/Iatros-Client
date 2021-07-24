import React, { useState, useEffect, useContext } from 'react';
import { Table, Row, Col, Button, Space, Popconfirm, PageHeader } from 'antd';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { CalendarIcon, EditIcon, TrashIcon } from '../../../CustomIcons';
import { AdminMenuItems, AdminPath } from '../../../constants';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import { ColumnsType } from 'antd/lib/table';
import { AdminContext } from '../../../contexts/AdminContext';
import { Link } from 'react-router-dom';
import { Appointment } from '../../../models/Appointment';
import { AppointmentsRepository } from '../../../repository/AppointmentRepository';

const Appointments = () => {
  let appContext = useContext(AdminContext).context;
  let breadcrumbItems: Array<BreadcrumbItem> = [
    {
      icon: <HomeFilled />,
      link: AdminPath,
    },
    {
      icon: <CalendarIcon />,
      title: 'Appointments',
    },
  ];
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const columns: ColumnsType<Appointment> = [
    {
      title: '#',
      dataIndex: 'ID',
      key: 'ID',
      sorter: (a: Appointment, b: Appointment) => a.ID - b.ID,
      sortDirections: ['ascend', 'descend'],
      width: '10%',
    },
    {
      title: 'Patient',
      dataIndex: 'Name',
      key: 'Name',
      sorter: (a: Appointment, b: Appointment) => ((a.Name || '') > (b.Name || '') ? 1 : -1),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Date',
      dataIndex: 'Slot',
      key: 'Slot',
      sorter: (a: Appointment, b: Appointment) => ((a.Slot || '') > (b.Slot || '') ? 1 : -1),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Doctor',
      dataIndex: 'Doctor',
      key: 'Doctor',
      sorter: (a: Appointment, b: Appointment) => ((a.Doctor || '') > (b.Doctor || '') ? 1 : -1),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      sorter: (a: Appointment, b: Appointment) => ((a.Status || '') > (b.Status || '') ? 1 : -1),
      sortDirections: ['ascend', 'descend'],
    },
  ];
  if (appContext.session?.Role?.Permissions?.includes('Edit Appointment') || appContext.session?.Role?.Permissions?.includes('Delete Appointment')) {
    columns.push({
      title: 'Action',
      key: 'Action',
      render: (text: any, row: Appointment) => (
        <Space size="large">
          {appContext.session?.Role?.Permissions?.includes('Edit Appointment') ? (
            <Link to={AdminPath + '/' + AdminMenuItems.getMenu('Edit Appointment')?.path.replace(':id', row.ID)}>
              <EditIcon title={`Edit`} className="row-edit"></EditIcon>
            </Link>
          ) : (
            <></>
          )}
          {appContext.session?.Role?.Permissions?.includes('Delete Appointment') ? (
            <Popconfirm
              title="Are you sure you want to delete this appointment?"
              onConfirm={() => {
                onDeleteAppointmentClick(row.ID);
              }}
              okText="Yes"
              cancelText="No"
            >
              <TrashIcon title={`Delete`} className="row-delete"></TrashIcon>
            </Popconfirm>
          ) : (
            <></>
          )}
        </Space>
      ),
      width: '10%',
    });
  }

  const appointmentDB = new AppointmentsRepository();

  async function onDeleteAppointmentClick(id: number) {
    await deleteAppointment(id);
    await getAppointments();
  }

  async function getAppointments() {
    let data = await appointmentDB.getAll();
    setAppointments([...data]);
  }

  async function deleteAppointment(id: number) {
    try {
      await appointmentDB.delete(id);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAppointments();
    return () => {};
  });

  return (
    <>
      <PageHeader
        className="page-title no-print"
        title="Appointments"
        subTitle={<Breadcrumb items={breadcrumbItems} className="breadcrumb"></Breadcrumb>}
        extra={[
          <Space>
            {appContext.session?.Role?.Permissions?.includes('Add Appointment') ? (
              <Link to={`${AdminPath}/${AdminMenuItems.getMenu('Add Appointment')?.path}`}>
                <Button type="primary" icon={<PlusOutlined />}>
                  New Appointment
                </Button>
              </Link>
            ) : (
              <></>
            )}
          </Space>,
        ]}
      ></PageHeader>

      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Table scroll={{ x: true, scrollToFirstRowOnChange: true }} sticky={true} className="iatros-table" columns={columns} dataSource={appointments}></Table>
        </Col>
      </Row>
    </>
  );
};

export default Appointments;
