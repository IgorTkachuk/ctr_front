import React from "react";
import { Spin, Table, Button, Image, Space } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useGetAllPrinterModelsQuery,
  useDeletePrinterModelMutation,
} from "../../redux/printerModel/printerModelApi";
import { useGetAllVendorsQuery } from "../../redux/vendor/vendorApi";

const PrnModel = () => {
  const navigate = useNavigate();
  const { data: prnModelData, isLoading: isPrnModelLoading } =
    useGetAllPrinterModelsQuery();
  const { data: vendorData, isLoading: isVendorLoading } =
    useGetAllVendorsQuery();

  const [deletePrinterModel] = useDeletePrinterModelMutation();

  const handleNewPrnModel = () => {
    navigate("/dashboard/printer/new");
  };

  const handleDeletePrnModel = (id) => {
    deletePrinterModel(id);
  };

  const handleEditPrnModel = (id) => {
    navigate(`/dashboard/printer/edit/${id}`);
  };

  if (isPrnModelLoading || isVendorLoading) {
    return <Spin />;
  }

  const dataSource = prnModelData.map((model) => {
    const vendor_name = vendorData.find(
      (vendor) => vendor.id === model.vendor_id
    )?.name;
    return {
      ...model,
      vendor_name,
    };
  });

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Vendor ID",
    //   dataIndex: "vendor_id",
    //   key: "vendor_id",
    // },
    {
      title: "Vendor name",
      dataIndex: "vendor_name",
      key: "vendor_name",
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image",
      render: (image) => <Image src={image} height={40} alt="printer image" />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEditPrnModel(record.id)}>
            Edit
          </Button>
          <Button danger onClick={() => handleDeletePrnModel(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Button type="primary" onClick={handleNewPrnModel}>
          Add new printer model
        </Button>
        <Table dataSource={dataSource} columns={columns} />
      </Space>
    </div>
  );
};

export default PrnModel;
