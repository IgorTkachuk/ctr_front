import moment from "moment";
import { Spin, Button, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useGetAllDocQuery,
  useDeleteDocMutation,
} from "../../redux/doc/docApi";
import { useGetAllDocTypesQuery } from "../../redux/docType/docTypeApi";
import { useGetAllUsrQuery } from "../../redux/usr/usrApi";

const Doc = () => {
  const [deleteDoc] = useDeleteDocMutation();
  const { data: usrData, isLoading: isUsrDataLoading } = useGetAllUsrQuery();
  const { data: docTypeData, isLoading: isDocTypeDataLoading } =
    useGetAllDocTypesQuery();
  const { data, isLoading } = useGetAllDocQuery();
  const navigate = useNavigate();

  const handleAddNewDoc = () => {
    navigate("/dashboard/doc/new");
  };

  const handleDeleteDoc = (id) => {
    deleteDoc(id);
  };

  if (isLoading || isDocTypeDataLoading || isUsrDataLoading) {
    return <Spin />;
  }

  const preparedData = data.map((doc) => ({
    ...doc,
    doc_type: docTypeData.find((type) => type.id === doc.doc_type_id).name,
    usr: usrData.find((usr) => usr.id === doc.doc_owner_id).name,
  }));

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Doc type",
      dataIndex: "doc_type",
      key: "doc_type",
    },
    {
      title: "Owner",
      dataIndex: "usr",
      key: "usr",
    },
    {
      title: "Date",
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space direction="horizontal" size="small">
          <Button
            type="primary"
            size="small"
            danger
            onClick={() => handleDeleteDoc(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <Button type="primary" onClick={handleAddNewDoc}>
        Add new doc
      </Button>
      <Table
        columns={columns}
        dataSource={preparedData}
        size="small"
        style={{ fontSize: "10px" }}
      />
    </Space>
  );
};

export default Doc;
