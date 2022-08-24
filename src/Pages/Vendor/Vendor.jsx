import React from "react";
import { useGetAllVendorsQuery } from "../../redux/vendor/slice";
import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";

export const Vendor = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllVendorsQuery();

  if (isLoading) {
    return <Spin />;
  }

  return (
    <>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name}{" "}
            <img width="60" alt={`Logo ${item.name}`} src={item.logo_url}></img>
          </li>
        ))}
      </ul>
      <Button
        type="primary"
        onClick={(e) => {
          navigate("/dashboard/vendor/new");
        }}
      >
        Add new
      </Button>
    </>
  );
};
