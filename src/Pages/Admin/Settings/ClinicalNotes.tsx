import React, { useState, useEffect } from 'react';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import Table, { ColumnsType } from 'antd/lib/table';
import { ClinicalNotes as DummyData } from '../../../DummyData';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { EditIcon, TrashIcon } from '../../../CustomIcons';
import { AdminPath } from '../../../constants';
import { Space, Row, Col, Button, Popconfirm, Select } from 'antd';
import Title from 'antd/lib/typography/Title';
import Modal from 'antd/lib/modal/Modal';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { ClinicalNote } from '../../../models/ClinicalNote';
import TextArea from 'antd/lib/input/TextArea';
import { NoteType } from '../../../models/Enums';

const { Option } = Select;

const ClinicalNotes = () => {
  let breadcrumbItems: Array<BreadcrumbItem> = [
    {
      icon: <HomeFilled />,
      link: AdminPath,
    },
    {
      title: 'Clinical Notes',
    },
  ];
  const [tableColumns] = useState<ColumnsType<ClinicalNote>>([
    {
      title: 'Note Type',
      dataIndex: 'NoteType',
      key: 'NoteType',
      sorter: (a: ClinicalNote, b: ClinicalNote) => (a.NoteType > b.NoteType ? 1 : -1),
      sortDirections: ['ascend', 'descend'],
      width: '40%',
    },
    {
      title: 'Note',
      dataIndex: 'Note',
      key: 'Note',

      width: '50%',
    },
    {
      title: 'Action',
      key: 'Action',
      render: (text: any, row: ClinicalNote) => (
        <Space size="large">
          <EditIcon
            title={`Edit Type`}
            className="row-edit"
            onClick={() => {
              editNote(row);
            }}
          ></EditIcon>
          <Popconfirm
            title="Are you sure you want to delete this type"
            onConfirm={() => {
              deleteNote(row);
            }}
            okText="Yes"
            cancelText="No"
          >
            <TrashIcon title={`Delete Type`} className="row-delete"></TrashIcon>
          </Popconfirm>
        </Space>
      ),
    },
  ]);

  const [clinicalNotes, setClinicalNotes] = useState<ClinicalNote[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<ClinicalNote>({ ID: -1, NoteType: 'Problem', Note: '' });

  let editNote = (type: ClinicalNote) => {
    setSelectedNote(type);
    setShowEditModal(true);

    //alert(JSON.stringify(tax));
  };

  let deleteNote = (type: ClinicalNote) => {
    let index = DummyData.findIndex((x: any) => x.ID === type.ID);
    let _notes = DummyData.map((x: any) => x);
    _notes.splice(index, 1);
    setClinicalNotes(_notes);
  };

  let addNote = () => {};
  let updateNote = () => {};
  let handleCancel = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };
  let onModalClose = () => {};

  useEffect(() => {
    let _notes: ClinicalNote[] = DummyData.map((type: any) => type);
    setClinicalNotes(_notes);
    return () => {};
  }, []);

  return (
    <>
      <Row gutter={[16, 24]}>
        <Col xs={24} md={12}>
          <Title level={4} className="page-title">
            Clinical Notes
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
              Add Clinical Note
            </Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Table scroll={{ x: true, scrollToFirstRowOnChange: true }} className="iatros-table" columns={tableColumns} dataSource={clinicalNotes} rowKey={(record: ClinicalNote) => record.ID}></Table>
        </Col>
      </Row>
      <Modal title="Add Clinical Note" visible={showAddModal} onOk={addNote} onCancel={handleCancel} destroyOnClose={true} afterClose={onModalClose} okText="Add">
        <Form layout="vertical">
          <FormItem name="NoteType" label="Note Type" required={true}>
            <Select
              size="large"
              onSelect={(value) => {
                setSelectedNote({ ...selectedNote, NoteType: value.toString() as NoteType });
              }}
            >
              <Option value={'Problem'}>{'Problem'}</Option>
              <Option value={'Observation'}>{'Observation'}</Option>
              <Option value={'Diagnosis'}>{'Diagnosis'}</Option>
              <Option value={'Investigation'}>{'Investigation'}</Option>
            </Select>
          </FormItem>
          <FormItem name="Description" label="Description" required={false}>
            <TextArea
              rows={5}
              onChange={(e) => {
                setSelectedNote({ ...selectedNote, Note: e.target.value });
              }}
            ></TextArea>
          </FormItem>
        </Form>
      </Modal>

      <Modal title="Edit Clinical Note" visible={showEditModal} onOk={updateNote} onCancel={handleCancel} destroyOnClose={true} afterClose={onModalClose} okText="Update">
        <Form layout="vertical">
          <FormItem name="NoteType" label="Note Type" required={true}>
            <Select
              size="large"
              defaultValue={selectedNote.NoteType}
              onSelect={(value) => {
                setSelectedNote({ ...selectedNote, NoteType: value.toString() as NoteType });
              }}
            >
              <Option value={'Problem'}>{'Problem'}</Option>
              <Option value={'Observation'}>{'Observation'}</Option>
              <Option value={'Diagnosis'}>{'Diagnosis'}</Option>
              <Option value={'Investigation'}>{'Investigation'}</Option>
            </Select>
          </FormItem>
          <FormItem name="Description" label="Description" required={false}>
            <TextArea
              rows={5}
              defaultValue={selectedNote.Note}
              onChange={(e) => {
                setSelectedNote({ ...selectedNote, Note: e.target.value });
              }}
            ></TextArea>
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};

export default ClinicalNotes;
