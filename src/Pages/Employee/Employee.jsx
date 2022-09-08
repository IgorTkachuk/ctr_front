import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Spin, Space } from "antd";
import {
  useGetAllEmployeeQuery,
  useDeleteEmployeeMutation,
} from "../../redux/employee/employeeApi";
import { useGetAllOuQuery } from "../../redux/ou/ouApi";

const Employee = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllEmployeeQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const { data: ouData, isLoading: isOuLoading } = useGetAllOuQuery();

  const handleEdit = (id) => {
    navigate(`/dashboard/employee/edit/${id}`);
  };

  const handleDelete = (id) => {
    deleteEmployee(id);
  };

  const handleNewEmployee = () => {
    navigate("/dashboard/employee/new");
  };

  if (isLoading || isOuLoading) {
    return <Spin />;
  }

  const dataSource = data.map((employee) => ({
    ...employee,
    ou_name: ouData.find((ou) => ou.id === employee.ou_id)?.name,
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
      title: "Org Unit",
      dataIndex: "ou_name",
      key: "ou_name",
    },
    {
      title: "Actions",
      key: "name",
      render: (_, record) => (
        <Space size='middle'>
          <Button type='primary' onClick={() => handleEdit(record.id)}>
            Edit
          </Button>
          <Button type='primary' danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Space direction='vertical' size='middle' style={{ display: "flex" }}>
      <Button type='primary' onClick={handleNewEmployee}>
        Create new employee
      </Button>
      <Table dataSource={dataSource} columns={columns} />
    </Space>
  );
};

export default Employee;
