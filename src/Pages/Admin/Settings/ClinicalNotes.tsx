import React, { useState, useEffect } from 'react';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import { ColumnsType } from 'antd/lib/table';
import { HomeFilled, PlusOutlined } from '@ant-design/icons';
import { EditIcon, TrashIcon } from '../../../CustomIcons';
import { AdminPath } from '../../../constants';
import { Space, Row, Col, Button, Popconfirm, Select, Form, Modal, Table, Typography, Input } from 'antd';
import { ClinicalNote } from '../../../models/ClinicalNote';
import { ClinicalNotesRepository } from '../../../repository/ClincalNotesRepository';

const FormItem = Form.Item;
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const ClinicalNotes = () => {
  const breadcrumbItems: Array<BreadcrumbItem> = [
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
              onEditNoteClick(row.ID);
            }}
          ></EditIcon>
          <Popconfirm
            title="Are you sure you want to delete this type"
            onConfirm={() => {
              onDeleteNoteClick(row.ID);
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

  const [form] = Form.useForm();
  const [clinicalNotes, setClinicalNotes] = useState<ClinicalNote[]>([]);
  const [modalType, setModalType] = useState<'Add' | 'Update'>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<ClinicalNote>({ ID: -1, NoteType: '', Note: '' });

  const notesDB = new ClinicalNotesRepository(); // Clinical Notes Databse repository

  /**
   * Deletes the note from databse
   * @param id ID of Note to delete
   */
  async function onDeleteNoteClick(id: number) {
    await notesDB.delete(id);
    getAllNotes();
  }

  /**
   * Opens the modal popup with new form
   */
  function onAddNoteClick() {
    setModalType('Add');
    setSelectedNote({ ID: -1, NoteType: 'Problem', Note: '' });
    form.setFieldsValue(selectedNote);
    setShowModal(true);
  }

  /**
   * Opens teh modal popup with edit form
   * @param id ID of note to edit
   */
  async function onEditNoteClick(id: number) {
    setModalType('Update');
    const note: ClinicalNote = await notesDB.getById(id);
    setSelectedNote({ ...note });

    form.setFieldsValue({ ...note });
    setShowModal(true);
  }

  /**
   * Fetched all notes from databse
   */
  async function getAllNotes() {
    console.log('dsad');
    setClinicalNotes(await notesDB.getAll());
  }

  /**
   * Add a note to databse
   */
  async function addNote() {
    try {
      await form.validateFields();
      await notesDB.add(selectedNote);
      getAllNotes();
      setShowModal(false);
    } catch (error) {}
  }

  /**
   * Update a note in databse
   */
  async function updateNote() {
    try {
      await form.validateFields();
      await notesDB.update(selectedNote);
      getAllNotes();
      setShowModal(false);
    } catch (err) {}
  }

  /**
   * Modal Cancel button click event
   */
  let onModalCancelClick = () => {
    setShowModal(false);
  };

  /**
   * Modal close event
   */
  let onModalClose = () => {};

  useEffect(() => {
    getAllNotes();
    return () => {};
    // eslint-disable-next-line
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
            <Button type="primary" icon={<PlusOutlined />} onClick={onAddNoteClick}>
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
      <Modal title={`${modalType} Clinical Note`} visible={showModal} onOk={modalType === 'Add' ? addNote : updateNote} onCancel={onModalCancelClick} destroyOnClose={true} afterClose={onModalClose} okText={modalType}>
        <Form layout="vertical" form={form}>
          <FormItem name="NoteType" label="Note Type" required={true}>
            <Select
              size="large"
              onSelect={(value) => {
                setSelectedNote({ ...selectedNote, NoteType: value });
              }}
              defaultValue={selectedNote.NoteType}
            >
              <Option value={'Problem'}>{'Problem'}</Option>
              <Option value={'Observation'}>{'Observation'}</Option>
              <Option value={'Diagnosis'}>{'Diagnosis'}</Option>
              <Option value={'Investigation'}>{'Investigation'}</Option>
            </Select>
          </FormItem>
          <FormItem name="Note" label="Description" rules={[{ required: true, message: 'Please enter description' }]}>
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
