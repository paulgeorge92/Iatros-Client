import React from 'react';
import { Row, Col, Tabs, Card, Input, Form, DatePicker, Select, Checkbox, Button, Space } from 'antd';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import { HomeFilled, UserOutlined, PhoneOutlined, PlusOutlined } from '@ant-design/icons';
import { HeartBeatIcon, AtIcon, HomeIcon, MapMarkerIcon, MapMarkedIcon, MapPinIcon } from '../../../CustomIcons';
import { AdminPath, BloodGroups } from '../../../constants';
import Title from 'antd/lib/typography/Title';

const { TabPane } = Tabs;
const FormItem = Form.Item;
const { Option } = Select;
const NewPatient = (props: any) => {
  let breadcrumbItems: Array<BreadcrumbItem> = [
    {
      icon: <HomeFilled />,
      link: AdminPath,
    },
    {
      icon: <HeartBeatIcon />,
      title: 'Patients',
    },
    {
      title: 'New Patient',
    },
  ];

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
            <Form layout="vertical" scrollToFirstError={true}>
              <Space size="large" direction="vertical">
                <Tabs type="card" defaultActiveKey="1">
                  <TabPane tab={<span>Basic Info</span>} key="1">
                    <Row gutter={[24, 0]}>
                      <Col xs={24} md={12}>
                        <Row gutter={[24, 0]}>
                          <Col xs={24} md={12}>
                            <FormItem name="FirstName" label="First Name" required={true}>
                              <Input size="large" placeholder="First Name" prefix={<UserOutlined />}></Input>
                            </FormItem>
                          </Col>
                          <Col xs={24} md={12}>
                            <FormItem name="LastName" label="Last Name" required={true}>
                              <Input size="large" placeholder="Last Name" prefix={<UserOutlined />}></Input>
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={24} md={12}>
                        <FormItem name="Email" label="Email" required={true}>
                          <Input size="large" placeholder="Email" prefix={<AtIcon />} type="email"></Input>
                        </FormItem>
                      </Col>
                      <Col xs={24} md={12}>
                        <Row gutter={[24, 0]}>
                          <Col xs={24} md={12}>
                            <FormItem label="Mobile Number" required={true}>
                              <Input name="MobileNumber" size="large" placeholder="Mobile Number" prefix={<PhoneOutlined />} type="tel"></Input>
                            </FormItem>
                          </Col>
                          <Col xs={24} md={12}>
                            <FormItem name="DateOfBirth" label="Date of Birth">
                              <DatePicker className="w-100" format="DD-MM-YYYY" size="large"></DatePicker>
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={24} md={12}>
                        <Row gutter={[24, 0]}>
                          <Col xs={24} md={12}>
                            <FormItem name="Gender" label="Gender">
                              <Select placeholder="Gender" size="large">
                                <Option value="Male">Male</Option>
                                <Option value="Female">Female</Option>
                                <Option value="Other">Other</Option>
                              </Select>
                            </FormItem>
                          </Col>
                          <Col xs={24} md={12}>
                            <FormItem name="BloodGroup" label="Blood Group">
                              <Select placeholder="Blood Group" size="large">
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
                            <FormItem name="AddressLine1" label="Address Line 1">
                              <Input size="large" placeholder="Address Line 1" prefix={<HomeIcon />}></Input>
                            </FormItem>
                          </Col>
                          <Col xs={24} md={12}>
                            <FormItem name="AddressLine2" label="Address Line 2">
                              <Input size="large" placeholder="Address Line 2" prefix={<HomeIcon />}></Input>
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>

                      <Col xs={24} md={12}>
                        <Row gutter={[24, 0]}>
                          <Col xs={24} md={12}>
                            <FormItem name="Town" label="Town">
                              <Input size="large" placeholder="Town" prefix={<MapMarkerIcon />}></Input>
                            </FormItem>
                          </Col>
                          <Col xs={24} md={12}>
                            <FormItem name="City" label="City">
                              <Input size="large" placeholder="City" prefix={<MapMarkerIcon />}></Input>
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>

                      <Col xs={24} md={12}>
                        <Row gutter={[24, 0]}>
                          <Col xs={24} md={12}>
                            <FormItem name="Country" label="Country">
                              <Input size="large" placeholder="Country" prefix={<MapMarkedIcon />}></Input>
                            </FormItem>
                          </Col>
                          <Col xs={24} md={12}>
                            <FormItem name="ZipCode" label="Zip Code">
                              <Input size="large" placeholder="Zip Code" prefix={<MapPinIcon />}></Input>
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab={<span>Medical History</span>} key="3">
                    <p>Do you now or have you ever had:</p>
                    <Row gutter={[24, 0]}>
                      <Col xs={24}>
                        <FormItem name="MedicalHistory">
                          <Checkbox.Group>
                            <Row gutter={[24, 0]}>
                              <Col xs={24} md={12} lg={8}>
                                <Checkbox value="Diabetes" style={{ lineHeight: '32px' }}>
                                  Diabetes
                                </Checkbox>
                              </Col>
                              <Col xs={24} md={12} lg={8}>
                                <Checkbox value="High Blood Pressure" style={{ lineHeight: '32px' }}>
                                  High Blood Pressure
                                </Checkbox>
                              </Col>
                              <Col xs={24} md={12} lg={8}>
                                <Checkbox value="High Cholestrol" style={{ lineHeight: '32px' }}>
                                  High Cholestrol
                                </Checkbox>
                              </Col>
                              <Col xs={24} md={12} lg={8}>
                                <Checkbox value="Heart Problems" style={{ lineHeight: '32px' }}>
                                  Heart Problems
                                </Checkbox>
                              </Col>
                              <Col xs={24} md={12} lg={8}>
                                <Checkbox value="Asthma" style={{ lineHeight: '32px' }}>
                                  Asthma
                                </Checkbox>
                              </Col>
                              <Col xs={24} md={12} lg={8}>
                                <Checkbox value="Kidney Disease" style={{ lineHeight: '32px' }}>
                                  Kidney Disease
                                </Checkbox>
                              </Col>
                              <Col xs={24} md={12} lg={8}>
                                <Checkbox value="Kidney Stones" style={{ lineHeight: '32px' }}>
                                  Kidney Stones
                                </Checkbox>
                              </Col>
                              <Col xs={24} md={12} lg={8}>
                                <Checkbox value="Jaundice" style={{ lineHeight: '32px' }}>
                                  Jaundice
                                </Checkbox>
                              </Col>
                              <Col xs={24} md={12} lg={8}>
                                <Checkbox value="Rheumatic Feaver" style={{ lineHeight: '32px' }}>
                                  Rheumatic Feaver
                                </Checkbox>
                              </Col>
                              <Col xs={24} md={12} lg={8}>
                                <Checkbox value="Cancer" style={{ lineHeight: '32px' }}>
                                  Cancer
                                </Checkbox>
                              </Col>
                              <Col xs={24} md={12} lg={8}>
                                <Checkbox value="HIV/AIDS" style={{ lineHeight: '32px' }}>
                                  HIV/AIDS
                                </Checkbox>
                              </Col>
                              <Col xs={24} md={12} lg={8}>
                                <Checkbox value="Epilepsy" style={{ lineHeight: '32px' }}>
                                  Epilepsy
                                </Checkbox>
                              </Col>
                              <Col xs={24} md={12} lg={8}>
                                <Checkbox value="Pregnancy" style={{ lineHeight: '32px' }}>
                                  Pregnancy
                                </Checkbox>
                              </Col>
                              <Col xs={24} md={12} lg={8}>
                                <Checkbox value="Blood Thinners" style={{ lineHeight: '32px' }}>
                                  Blood Thinners
                                </Checkbox>
                              </Col>
                            </Row>
                          </Checkbox.Group>
                        </FormItem>
                      </Col>
                      <Col xs={24}>
                        <FormItem name="OtherHistory" label="Other History:">
                          <Input.TextArea rows={6} placeholder="Other History"></Input.TextArea>
                        </FormItem>
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                  Add Patient
                </Button>
              </Space>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default NewPatient;
