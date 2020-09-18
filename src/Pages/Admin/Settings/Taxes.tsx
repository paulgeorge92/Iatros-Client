import React, { useState, useEffect } from 'react';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import Table, { ColumnsType } from 'antd/lib/table';
import { Taxes as DummyTaxes } from '../../../DummyData';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { EditIcon, TrashIcon } from '../../../CustomIcons';
import { AdminPath } from '../../../constants';
import { Space, Row, Col, Button, Input, Popconfirm } from 'antd';
import Title from 'antd/lib/typography/Title';
import Modal from 'antd/lib/modal/Modal';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { Tax } from '../../../models/Tax';

const Taxes = () => {
  let breadcrumbItems: Array<BreadcrumbItem> = [
    {
      icon: <HomeFilled />,
      link: AdminPath,
    },
    {
      title: 'Taxes',
    },
  ];
  const [tableColumns] = useState<ColumnsType<Tax>>([
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      sorter: (a: Tax, b: Tax) => (a.Name > b.Name ? 1 : -1),
      sortDirections: ['ascend', 'descend'],
      width: '60%',
    },
    {
      title: 'Rate(%)',
      dataIndex: 'Rate',
      key: 'Rate',
      sorter: (a: Tax, b: Tax) => a.Rate - b.Rate,
      sortDirections: ['ascend', 'descend'],
      width: '30%',
    },
    {
      title: 'Action',
      key: 'Action',
      render: (text: any, row: Tax) => (
        <Space size="large">
          <EditIcon
            title={`Edit Tax`}
            className="row-edit"
            onClick={() => {
              editTax(row);
            }}
          ></EditIcon>
          <Popconfirm
            title="Are you sure you want to delete the tax"
            onConfirm={() => {
              deleteTax(row);
            }}
            okText="Yes"
            cancelText="No"
          >
            <TrashIcon title={`Delete Tax`} className="row-delete"></TrashIcon>
          </Popconfirm>
        </Space>
      ),
    },
  ]);

  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedTax, setSelectedTax] = useState<Tax>({ ID: -1, Name: '', Rate: 0 });

  let editTax = (tax: Tax) => {
    let _tax: Tax = {
      ID: tax.ID,
      Name: tax.Name,
      Rate: tax.Rate,
    };
    setSelectedTax(_tax);
    setShowEditModal(true);

    //alert(JSON.stringify(tax));
  };

  let deleteTax = (tax: Tax) => {
    let index = DummyTaxes.findIndex((x: Tax) => x.ID === tax.ID);
    let _taxes = DummyTaxes.map((x: Tax) => x);
    _taxes.splice(index, 1);
    setTaxes(_taxes);
  };

  let addTax = () => {};
  let updateTax = () => {};
  let handleCancel = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };
  let onModalClose = () => {};

  useEffect(() => {
    let _taxes: Tax[] = DummyTaxes.map((tax: any) => tax);
    setTaxes(_taxes);
    return () => {};
  }, []);

  return (
    <>
      <Row gutter={[16, 24]}>
        <Col xs={24} md={12}>
          <Title level={4} className="page-title">
            Taxes
          </Title>
          <Breadcrumb items={breadcrumbItems} className="breadcrumb"></Breadcrumb>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: 'right' }}>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setShowAddModal(true);
              }}
            >
              Add Tax
            </Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Table className="iatros-table" columns={tableColumns} dataSource={taxes} rowKey={(record: Tax) => record.ID}></Table>
        </Col>
      </Row>
      <Modal title="Add Tax" visible={showAddModal} onOk={addTax} onCancel={handleCancel} destroyOnClose={true} afterClose={onModalClose} okText="Add">
        <Form layout="vertical">
          <FormItem name="TaxName" label="Name" required={true}>
            <Input size="large" placeholder="Tax Name"></Input>
          </FormItem>
          <FormItem name="TaxRate" label="Name" required={true}>
            <Input size="large" type="number" placeholder="Tax Rate in %"></Input>
          </FormItem>
        </Form>
      </Modal>

      <Modal title="Edit Tax" visible={showEditModal} onOk={updateTax} onCancel={handleCancel} destroyOnClose={true} afterClose={onModalClose} okText="Update">
        <Form layout="vertical">
          <FormItem name="TaxName" label="Name" required={true}>
            <Input size="large" placeholder="Tax Name" defaultValue={selectedTax.Name}></Input>
          </FormItem>
          <FormItem name="TaxRate" label="Name" required={true}>
            <Input size="large" type="number" placeholder="Tax Rate in %" defaultValue={selectedTax.Rate}></Input>
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};

export default Taxes;
