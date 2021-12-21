import { Button, Card, Col, Modal, PageHeader, Row, Tabs, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import { AdminMenuItems, AdminPath } from '../../../constants';
import { AdminContext } from '../../../contexts/AdminContext';
import { EditIcon, HeartBeatIcon, HomeIcon } from '../../../CustomIcons';
import { Patient } from '../../../models/Patient';
import { PatientRepository } from '../../../repository/PatientRepository';
const { TabPane } = Tabs;
const { Text } = Typography;

interface props {
  id?: number;
  location?: any;
}

const ViewPatient = (props: props) => {
  const { id } = useParams();
  const patientDB = new PatientRepository();

  const settings = useContext(AdminContext).context.settings;

  const [patient, setPatient] = useState<Patient | null>(null);
  let breadcrumbItems: Array<BreadcrumbItem> = [
    {
      icon: <HomeIcon />,
      link: AdminPath,
    },
    {
      icon: <HeartBeatIcon />,
      title: 'Patients',
      link: AdminPath + '/' + AdminMenuItems.getMenu('Patients')?.path,
    },
    {
      title: 'Patient Details',
    },
  ];

  async function getPatient(id: number) {
    try {
      let patient = await patientDB.getByID(id);
      setPatient({ ...patient });
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: error?.toString(),
      });
    }
  }

  useEffect(() => {
    if (props && props.id) {
      getPatient(id);
    } else if (props && props.location?.this.state?.id) {
      getPatient(parseInt(props.location?.this.state?.id));
    } else if (id) {
      getPatient(parseInt(id));
    } else {
    }

    return () => {};
    /* eslint-disable-next-line */
  }, []);

  return !patient ? (
    <button></button>
  ) : (
    <>
      <PageHeader className="page-title no-print" title={`Patient Details`} subTitle={<Breadcrumb items={breadcrumbItems} className="breadcrumb"></Breadcrumb>}></PageHeader>

      <Row gutter={[16, 24]}>
        <Col xs={24} className="card-container">
          <Card className="card-container">
            <Tabs className="cards">
              <TabPane tab="Patient Infomation" key="1"></TabPane>
              <TabPane tab="Clinical Notes" key="2"></TabPane>
              <TabPane tab="Documents" key="3"></TabPane>
              <TabPane tab="Prescription" key="4"></TabPane>
              <TabPane tab="Appointments" key="5"></TabPane>
              <TabPane tab="Invoices" key="6"></TabPane>
              <TabPane tab="Message" key="7"></TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ViewPatient;
