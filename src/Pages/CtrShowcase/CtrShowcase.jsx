import moment from "moment";
import { Spin, Table, Space } from "antd";
import { useGetCtrShowcaseQuery } from "../../redux/doc/docApi";

const CtrShowcase = () => {
  const { data, isLoading } = useGetCtrShowcaseQuery();

  if (isLoading) {
    return <Spin />;
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Serial number",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Doc number",
      dataIndex: "doc_number",
      key: "doc_number",
    },
    {
      title: "Doc date",
      dataIndex: "doc_date",
      key: "doc_date",
      render: (text) => {
        if (text) {
          return moment(text).format("DD.MM.YYYY");
        }
        return "n/a";
      },
    },
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
    },
    {
      title: "Department",
      dataIndex: "ou",
      key: "ou",
    },
    {
      title: "Business line",
      dataIndex: "business_line",
      key: "business_line",
    },
  ];

  return (
    <Space direction='vertical' size='middle' style={{ display: "flex" }}>
      <Table size='small' dataSource={data} columns={columns} />
    </Space>
  );
};

export default CtrShowcase;
