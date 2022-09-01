import React from "react";
import { Table, Spin, Button, Space, Image, List } from "antd";
import {
  useDeleteCartridgeModelMutation,
  useGetAllCartridgeModelsQuery,
} from "../../redux/cartridgeModel/cartridgeModelApi";
import { useGetAllPrinterModelsQuery } from "../../redux/printerModel/printerModelApi";
import { useGetAllVendorsQuery } from "../../redux/vendor/vendorApi";
import { useNavigate } from "react-router-dom";

function CtrModel() {
  const navigate = useNavigate();

  const [deleteCtrModel] = useDeleteCartridgeModelMutation();

  const { data: ctrModelData, isLoading: ctrModelIsLoading } =
    useGetAllCartridgeModelsQuery();

  const { data: vendorData, isLoading: vendorDataIsLoading } =
    useGetAllVendorsQuery();

  const { data: prnModelData, isLoading: isPrnModelDataLoading } =
    useGetAllPrinterModelsQuery();

  const handleNewCtrModel = () => {
    navigate("/dashboard/ctrmodel/new");
  };

  const handleDeleteCtrModel = (id) => {
    deleteCtrModel(id);
  };
  const handleEditCtrModel = (id) => {
    navigate(`/dashboard/ctrmodel/edit/${id}`);
  };

  if (ctrModelIsLoading || vendorDataIsLoading || isPrnModelDataLoading) {
    return <Spin />;
  }

  const dataSource = ctrModelData.map((item) => ({
    ...item,
    vendor_name: vendorData.find((vendor) => vendor.id === item.vendor_id)
      ?.name,
  }));

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Supported printers",
      dataIndex: "supp_prns",
      key: "supp_prns",
      render: (_, record) => {
        const data = record.supp_prns.map(
          (prnModel_id) =>
            prnModelData.find((prnModel) => prnModel.id === prnModel_id)?.name
        );
        return (
          <List
            size='small'
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        );
      },
    },
    {
      title: "Vendor Name",
      dataIndex: "vendor_name",
      key: "vendor_name",
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (_, record) => (
        <Image src={record.image_url} alt='cartridge photo' width={30} />
      ),
    },
    {
      title: "Actions",
      dataIndex: "image_url",
      key: "image_url",
      render: (_, record) => (
        <Space>
          <Button type='primary' onClick={() => handleEditCtrModel(record.id)}>
            Edit
          </Button>
          <Button
            type='primary'
            danger
            onClick={() => handleDeleteCtrModel(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Space direction='vertical' size='middle' style={{ display: "flex" }}>
      <Button type='primary' onClick={() => handleNewCtrModel()}>
        Create new cartridge model
      </Button>
      <Table dataSource={dataSource} columns={columns} />
    </Space>
  );
}

export default CtrModel;
