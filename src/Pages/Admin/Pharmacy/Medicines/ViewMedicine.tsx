import { Col, Modal, Row, Typography, Tabs, Table, Button, Descriptions, Card, Space } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import Breadcrumb, { BreadcrumbItem } from '../../../../components/Breadcrumb';
import { AdminPath, AdminMenuItems } from '../../../../constants';
import { MedicineBatch } from '../../../../models/Batch';
import { Medicine } from '../../../../models/Medicine';
import { BatchRepository } from '../../../../repository/BatchRepository';
import { MedicineRepository } from '../../../../repository/MedicineRepository';
import { Link, useParams } from 'react-router-dom';
import { EditIcon } from '../../../../CustomIcons';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

const { Title } = Typography;
const { TabPane } = Tabs;

interface props {
  id?: number;
  location?: any;
}

const ViewMedicine = (props: props) => {
  const { id } = useParams();
  const medicineDB = new MedicineRepository();
  const batchDB = new BatchRepository();
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [batches, setBatches] = useState<MedicineBatch[]>([]);
  const [badBatches, setBadBatches] = useState<MedicineBatch[]>([]);
  const [goodBatches, setGoodBatches] = useState<MedicineBatch[]>([]);
  let breadcrumbItems: Array<BreadcrumbItem> = [
    {
      icon: <HomeFilled />,
      link: AdminPath,
    },
    {
      title: 'Medinces',
      link: AdminPath + '/' + AdminMenuItems.getMenu('Medicines')?.path,
    },
    {
      title: 'View Medicine',
    },
  ];

  async function getData(id: number) {
    try {
      let medicine = await medicineDB.get(id);
      let batches = await batchDB.getBatchesByMedicine(id);
      let badBatches: MedicineBatch[] = [],
        goodBatches: MedicineBatch[] = [];
      batches.forEach((batch) => {
        if (batch.Expiry && batch.Expiry < new Date()) {
          badBatches.push({ ...batch });
        } else {
          goodBatches.push({ ...batch });
        }
      });

      setMedicine({ ...medicine });
      setBatches([...batches]);
      setBadBatches([...badBatches]);
      setGoodBatches([...goodBatches]);
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: error.toString(),
      });
    }
  }

  let goodBatchColumns: ColumnsType<MedicineBatch> = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
      sorter: (a: MedicineBatch, b: MedicineBatch) => (a.ID < b.ID ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Batch',
      dataIndex: 'Batch',
      key: 'Batch',
      sorter: (a: MedicineBatch, b: MedicineBatch) => ((a.Batch || '') < (b.Batch || '') ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Expiry',
      dataIndex: 'Expiry',
      key: 'Expiry',
      render: (date: Date) => <>{date ? moment(date).format('MMM YYYY') : ''}</>,
      sorter: (a: MedicineBatch, b: MedicineBatch) => ((a.Expiry || '') < (b.Expiry || '') ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Purchase Price',
      dataIndex: 'PurchasePrice',
      key: 'PurchasePrice',
      sorter: (a: MedicineBatch, b: MedicineBatch) => ((a.PurchasePrice || 0) < (b.PurchasePrice || 0) ? -1 : 1),
      sortDirections: ['ascend', 'descend'],
    },
  ];

  useEffect(() => {
    if (props && props.id) {
      getData(id);
    } else if (props && props.location?.this.state?.id) {
      getData(parseInt(props.location?.this.state?.id));
    } else if (id) {
      getData(parseInt(id));
    } else {
    }

    return () => {};
    /* eslint-disable-next-line */
  }, []);

  return !medicine ? (
    <Button></Button>
  ) : (
    <>
      <Row gutter={[16, 24]}>
        <Col xs={24} md={12}>
          <Title level={4} className="page-title">
            View Medicine
          </Title>
          <Breadcrumb items={breadcrumbItems} className="breadcrumb"></Breadcrumb>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: 'right' }}>
          <Space>
            <Link to={`${AdminPath}/${(AdminMenuItems.getMenu('Edit Medicine')?.path || '').replace(':id', medicine.ID)}`}>
              <Button type="primary" icon={<EditIcon />}>
                Edit Medicine
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        <Col xs={24} className="card-container">
          <Card className="card-conatiner">
            <Tabs type="card">
              <TabPane tab="Details" key="1">
                <Descriptions title="Medicine Details" bordered={true} layout="vertical" column={{ xs: 1, md: 3 }}>
                  <Descriptions.Item label="Medicine Name">{medicine.Name}</Descriptions.Item>
                  <Descriptions.Item label="Company Name">{medicine.Company}</Descriptions.Item>
                  <Descriptions.Item label="Category">{medicine.CategoryName}</Descriptions.Item>
                  <Descriptions.Item label="Generic">{medicine.Genreic}</Descriptions.Item>
                  <Descriptions.Item label="Unit">{medicine.Unit}</Descriptions.Item>
                  <Descriptions.Item label="Unit/Packing">{medicine.UnitPerPacking}</Descriptions.Item>
                  <Descriptions.Item label="Store Box">{medicine.StroeBox}</Descriptions.Item>
                  <Descriptions.Item label="Minimum Level">{medicine.MinLevel}</Descriptions.Item>
                  <Descriptions.Item label="Re-Order Level">{medicine.ReOrderLevel}</Descriptions.Item>
                </Descriptions>
              </TabPane>
              <TabPane tab="Stock" key="2"></TabPane>
              <TabPane tab="Expired Stock" key="3"></TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ViewMedicine;
