import React, { useEffect, useState } from 'react';
import { Row, Col, Tabs, Card, Input, Form, DatePicker, Select, Checkbox, Button, Space, Modal } from 'antd';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import { HomeFilled, UserOutlined, PhoneOutlined, PlusOutlined } from '@ant-design/icons';
import { HeartBeatIcon, AtIcon, HomeIcon, MapMarkerIcon, MapMarkedIcon, MapPinIcon } from '../../../CustomIcons';
import { AdminPath, BloodGroups, AdminMenuItems } from '../../../constants';
import Title from 'antd/lib/typography/Title';
import { PatientRepository } from '../../../repository/PatientRepository';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import { Patient } from '../../../models/Patient';

const { TabPane } = Tabs;
const FormItem = Form.Item;
const { Option } = Select;

interface props {
  id?: number;
  location?: any;
}
const PatientForm = (props: props) => {
  const [form] = Form.useForm();
  const patientDB = new PatientRepository();
  const { id } = useParams();
  const history = useHistory();

  const _patient: Patient = {
    ID: -1,
    FirstName: '',
    LastName: '',
    MobileNumber: '',
    BloodGroup: '',
    Email: '',
    DateOfBirth: new Date(),
    Gender: '',
    AddressLine1: '',
    AddressLine2: '',
    Town: '',
    City: '',
    Country: '',
    ZipCode: '',
    CreatedDate: new Date(),
    Status: 'Active',
    MedicalHistory: {
      Diabetes: false,
      HeartProblems: false,
      KidneyStones: false,
      Cancer: false,
      Pregnancy: false,
      HighBloodPressure: false,
      Asthma: false,
      Jaundice: false,
      HIV_AIDS: false,
      BloodThinners: false,
      HighCholestrol: false,
      KidneyDisease: false,
      RheumaticFever: false,
      Epilepsy: false,
      OtherHistory: '',
    },
  };

  const [patient, setPatient] = useState<Patient>(_patient);
  const [formType, setFormType] = useState<'Add' | 'Update'>('Add');
  let breadcrumbItems: Array<BreadcrumbItem> = [
    {
      icon: <HomeFilled />,
      link: AdminPath,
    },
    {
      icon: <HeartBeatIcon />,
      title: 'Patients',
      link: AdminPath + '/' + AdminMenuItems.getMenu('Patients')?.path,
    },
    {
      title: 'New Patient',
    },
  ];
  async function fillUserData(id: number) {
    try {
      let _patient = await patientDB.getByID(id);
      setPatient(_patient as Patient);
      form.setFieldsValue({ ..._patient, DateOfBirth: moment(_patient?.DateOfBirth), ..._patient.MedicalHistory });
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: error.toString(),
        onOk: () => {
          history.push({
            pathname: AdminPath + '/' + AdminMenuItems.getMenu('Patients')?.path,
          });
        },
        onCancel: () => {
          history.push({
            pathname: AdminPath + '/' + AdminMenuItems.getMenu('Patients')?.path,
          });
        },
      });
    }
  }

  function onFormSubmit() {
    try {
      form.validateFields();
      if (formType == 'Add') addPatient();
      else updatePatient();
    } catch (ex) {
      //validation failed
    }
  }

  async function addPatient() {
    try {
      await patientDB.add(patient);
      history.push(AdminPath + '/' + AdminMenuItems.getMenu('Patients')?.path);
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: error.toString(),
      });
    }
  }

  async function updatePatient() {
    try {
      await patientDB.update(patient);
      history.push(AdminPath + '/' + AdminMenuItems.getMenu('Patients')?.path);
    } catch (error) {}
  }

  useEffect(() => {
    //debugger;
    if (props && props.id) {
      setFormType('Update');
      fillUserData(props.id);
    } else if (props && props.location?.state?.id) {
      setFormType('Update');
      fillUserData(parseInt(props.location?.this.state?.id));
    } else if (id) {
      setFormType('Update');
      fillUserData(parseInt(id));
    } else {
      setPatient(_patient);
      setFormType('Add');
    }
    return () => {};
  }, [id]);
  return (
    <>
      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Title level={4} className="page-title">
            Patients
          </Title>
          <Breadcrumb items={breadcrumbItems} className="breadcrumb"></Breadcrumb>
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Card className="card-container">
            <Form layout="vertical" scrollToFirstError={true} form={form}>
              <Space size="large" direction="vertical">
                <Row gutter={[24, 0]}>
                  <Col xs={24} md={12}>
                    <Row gutter={[24, 0]}>
                      <Col xs={24} md={12}>
                        <FormItem name="FirstName" label="First Name" required={true} initialValue={patient.FirstName} rules={[{ required: true, message: 'Please enter First Name' }]}>
                          <Input
                            size="large"
                            placeholder="First Name"
                            prefix={<UserOutlined />}
                            onChange={(e) => {
                              setPatient({ ...patient, FirstName: e.target.value });
                            }}
                          ></Input>
                        </FormItem>
                      </Col>
                      <Col xs={24} md={12}>
                        <FormItem name="LastName" label="Last Name" required={true} rules={[{ required: true, message: 'Please enter Last Name' }]}>
                          <Input
                            size="large"
                            placeholder="Last Name"
                            prefix={<UserOutlined />}
                            onChange={(e) => {
                              setPatient({ ...patient, LastName: e.target.value });
                            }}
                          ></Input>
                        </FormItem>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24} md={12}>
                    <FormItem name="Email" label="Email">
                      <Input
                        size="large"
                        placeholder="Email"
                        prefix={<AtIcon />}
                        type="email"
                        onChange={(e) => {
                          setPatient({ ...patient, Email: e.target.value });
                        }}
                      ></Input>
                    </FormItem>
                  </Col>
                  <Col xs={24} md={12}>
                    <Row gutter={[24, 0]}>
                      <Col xs={24} md={12}>
                        <FormItem name="MobileNumber" label="Contact Number" required={true} rules={[{ required: true, message: 'Please enter contact number' }]}>
                          <Input
                            name="MobileNumber"
                            size="large"
                            placeholder="Contact Number"
                            prefix={<PhoneOutlined />}
                            type="tel"
                            onChange={(e) => {
                              setPatient({ ...patient, MobileNumber: e.target.value });
                            }}
                          ></Input>
                        </FormItem>
                      </Col>
                      <Col xs={24} md={12}>
                        <FormItem name="DateOfBirth" label="Date of Birth" rules={[{ required: true, message: 'Please enter Date of birth' }]}>
                          <DatePicker className="w-100" format="DD-MM-YYYY" size="large"></DatePicker>
                        </FormItem>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24} md={12}>
                    <Row gutter={[24, 0]}>
                      <Col xs={24} md={12}>
                        <FormItem name="Gender" label="Gender" rules={[{ required: true, message: 'Please select Gender' }]}>
                          <Select
                            placeholder="Gender"
                            size="large"
                            onChange={(e) => {
                              setPatient({ ...patient, Gender: e.toString() });
                            }}
                          >
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                            <Option value="Other">Other</Option>
                          </Select>
                        </FormItem>
                      </Col>
                      <Col xs={24} md={12}>
                        <FormItem name="BloodGroup" label="Blood Group">
                          <Select
                            placeholder="Blood Group"
                            size="large"
                            onChange={(e) => {
                              setPatient({ ...patient, BloodGroup: e.toString() });
                            }}
                          >
                            {BloodGroups.map((bg) => (
                              <Option value={bg}>{bg}</Option>
                            ))}
                          </Select>
                        </FormItem>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={24} md={12}>
                    <Row gutter={[24, 0]}>
                      <Col xs={24} md={12}>
                        <FormItem name="AddressLine1" label="Address Line 1" rules={[{ required: true, message: 'Please enter Address' }]}>
                          <Input
                            size="large"
                            placeholder="Address Line 1"
                            prefix={<HomeIcon />}
                            onChange={(e) => {
                              setPatient({ ...patient, AddressLine1: e.target.value });
                            }}
                          ></Input>
                        </FormItem>
                      </Col>
                      <Col xs={24} md={12}>
                        <FormItem name="AddressLine2" label="Address Line 2">
                          <Input
                            size="large"
                            placeholder="Address Line 2"
                            prefix={<HomeIcon />}
                            onChange={(e) => {
                              setPatient({ ...patient, AddressLine2: e.target.value });
                            }}
                          ></Input>
                        </FormItem>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={24} md={12}>
                    <Row gutter={[24, 0]}>
                      <Col xs={24} md={12}>
                        <FormItem name="Town" label="Town">
                          <Input
                            size="large"
                            placeholder="Town"
                            prefix={<MapMarkerIcon />}
                            onChange={(e) => {
                              setPatient({ ...patient, Town: e.target.value });
                            }}
                          ></Input>
                        </FormItem>
                      </Col>
                      <Col xs={24} md={12}>
                        <FormItem name="City" label="City">
                          <Input
                            size="large"
                            placeholder="City"
                            prefix={<MapMarkerIcon />}
                            onChange={(e) => {
                              setPatient({ ...patient, City: e.target.value });
                            }}
                          ></Input>
                        </FormItem>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={24} md={12}>
                    <Row gutter={[24, 0]}>
                      <Col xs={24} md={12}>
                        <FormItem name="Country" label="Country">
                          <Input
                            size="large"
                            placeholder="Country"
                            prefix={<MapMarkedIcon />}
                            onChange={(e) => {
                              setPatient({ ...patient, Country: e.target.value });
                            }}
                          ></Input>
                        </FormItem>
                      </Col>
                      <Col xs={24} md={12}>
                        <FormItem name="ZipCode" label="Zip Code">
                          <Input
                            size="large"
                            placeholder="Zip Code"
                            prefix={<MapPinIcon />}
                            onChange={(e) => {
                              setPatient({ ...patient, ZipCode: e.target.value });
                            }}
                          ></Input>
                        </FormItem>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row gutter={[24, 0]}>
                  <p>Do you now or have you ever had:</p>
                  <Col xs={24}>
                    <FormItem name="MedicalHistory">
                      <Row gutter={[24, 0]}>
                        <Col xs={24} md={12} lg={8}>
                          <Checkbox
                            value="Diabetes"
                            checked={patient.MedicalHistory.Diabetes}
                            style={{ lineHeight: '32px' }}
                            onChange={(e) => {
                              console.log(form.getFieldsValue());
                              setPatient({ ...patient, MedicalHistory: { ...patient.MedicalHistory, Diabetes: e.target.checked } });
                            }}
                          >
                            Diabetes
                          </Checkbox>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                          <Checkbox
                            value="High Blood Pressure"
                            checked={patient.MedicalHistory.HighBloodPressure}
                            style={{ lineHeight: '32px' }}
                            onChange={(e) => {
                              setPatient({ ...patient, MedicalHistory: { ...patient.MedicalHistory, HighBloodPressure: e.target.checked } });
                            }}
                          >
                            High Blood Pressure
                          </Checkbox>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                          <Checkbox
                            value="High Cholestrol"
                            checked={patient.MedicalHistory.HighCholestrol}
                            style={{ lineHeight: '32px' }}
                            onChange={(e) => {
                              setPatient({ ...patient, MedicalHistory: { ...patient.MedicalHistory, HighCholestrol: e.target.checked } });
                            }}
                          >
                            High Cholestrol
                          </Checkbox>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                          <Checkbox
                            value="Heart Problems"
                            style={{ lineHeight: '32px' }}
                            checked={patient.MedicalHistory.HeartProblems}
                            onChange={(e) => {
                              setPatient({ ...patient, MedicalHistory: { ...patient.MedicalHistory, HeartProblems: e.target.checked } });
                            }}
                          >
                            Heart Problems
                          </Checkbox>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                          <Checkbox
                            value="Asthma"
                            checked={patient.MedicalHistory.Asthma}
                            style={{ lineHeight: '32px' }}
                            onChange={(e) => {
                              setPatient({ ...patient, MedicalHistory: { ...patient.MedicalHistory, Asthma: e.target.checked } });
                            }}
                          >
                            Asthma
                          </Checkbox>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                          <Checkbox
                            value="Kidney Disease"
                            checked={patient.MedicalHistory.KidneyDisease}
                            style={{ lineHeight: '32px' }}
                            onChange={(e) => {
                              setPatient({ ...patient, MedicalHistory: { ...patient.MedicalHistory, KidneyDisease: e.target.checked } });
                            }}
                          >
                            Kidney Disease
                          </Checkbox>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                          <Checkbox
                            value="Kidney Stones"
                            checked={patient.MedicalHistory.KidneyStones}
                            style={{ lineHeight: '32px' }}
                            onChange={(e) => {
                              setPatient({ ...patient, MedicalHistory: { ...patient.MedicalHistory, KidneyStones: e.target.checked } });
                            }}
                          >
                            Kidney Stones
                          </Checkbox>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                          <Checkbox
                            value="Jaundice"
                            checked={patient.MedicalHistory.Jaundice}
                            style={{ lineHeight: '32px' }}
                            onChange={(e) => {
                              setPatient({ ...patient, MedicalHistory: { ...patient.MedicalHistory, Jaundice: e.target.checked } });
                            }}
                          >
                            Jaundice
                          </Checkbox>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                          <Checkbox
                            value="Rheumatic Feaver"
                            checked={patient.MedicalHistory.RheumaticFever}
                            style={{ lineHeight: '32px' }}
                            onChange={(e) => {
                              setPatient({ ...patient, MedicalHistory: { ...patient.MedicalHistory, RheumaticFever: e.target.checked } });
                            }}
                          >
                            Rheumatic Feaver
                          </Checkbox>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                          <Checkbox
                            value="Cancer"
                            checked={patient.MedicalHistory.Cancer}
                            style={{ lineHeight: '32px' }}
                            onChange={(e) => {
                              setPatient({ ...patient, MedicalHistory: { ...patient.MedicalHistory, Cancer: e.target.checked } });
                            }}
                          >
                            Cancer
                          </Checkbox>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                          <Checkbox
                            value="HIV/AIDS"
                            checked={patient.MedicalHistory.HIV_AIDS}
                            style={{ lineHeight: '32px' }}
                            onChange={(e) => {
                              setPatient({ ...patient, MedicalHistory: { ...patient.MedicalHistory, HIV_AIDS: e.target.checked } });
                            }}
                          >
                            HIV/AIDS
                          </Checkbox>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                          <Checkbox
                            value="Epilepsy"
                            checked={patient.MedicalHistory.Epilepsy}
                            style={{ lineHeight: '32px' }}
                            onChange={(e) => {
                              setPatient({ ...patient, MedicalHistory: { ...patient.MedicalHistory, Epilepsy: e.target.checked } });
                            }}
                          >
                            Epilepsy
                          </Checkbox>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                          <Checkbox
                            value="Pregnancy"
                            checked={patient.MedicalHistory.Pregnancy}
                            style={{ lineHeight: '32px' }}
                            onChange={(e) => {
                              setPatient({ ...patient, MedicalHistory: { ...patient.MedicalHistory, Pregnancy: e.target.checked } });
                            }}
                          >
                            Pregnancy
                          </Checkbox>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                          <Checkbox
                            value="Blood Thinners"
                            checked={patient.MedicalHistory.BloodThinners}
                            style={{ lineHeight: '32px' }}
                            onChange={(e) => {
                              setPatient({ ...patient, MedicalHistory: { ...patient.MedicalHistory, BloodThinners: e.target.checked } });
                            }}
                          >
                            Blood Thinners
                          </Checkbox>
                        </Col>
                      </Row>
                    </FormItem>
                  </Col>
                  <Col xs={24}>
                    <FormItem name="OtherHistory" label="Other History:">
                      <Input.TextArea rows={6} placeholder="Other History"></Input.TextArea>
                    </FormItem>
                  </Col>
                </Row>
                <Button type="primary" htmlType="submit" onClick={onFormSubmit}>
                  {formType} Patient
                </Button>
              </Space>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PatientForm;
