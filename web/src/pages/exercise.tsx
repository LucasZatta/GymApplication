import { Divider } from "antd";
import Table from "antd/lib/table/Table";
import React from "react";
import { Wrapper } from "../components/wraper";

interface exerciseProps {}

const exercise: React.FC<exerciseProps> = ({}) => {
  const userImcData = [
    {
      date: "21/05/2019",
      height: 1.8,
      weight: 130,
    },
    {
      date: "26/10/2019",
      height: 1.81,
      weight: 108,
    },
    {
      date: "15/04/2020",
      height: 1.81,
      weight: 95,
    },
    {
      date: "27/10/2020",
      height: 1.81,
      weight: 87,
    },
  ];
  const columns = [
    {
      title: "Data",
      key: "data",
      render: (tData: any) => tData.date,
    },
    {
      title: "Status",
      key: "status",
      render: (tData: any) => tData.date,
    },
    {
      title: "Altura",
      key: "altura",
      render: (tData: any) => tData.height,
    },
    {
      title: "Peso",
      key: "peso",
      render: (tData: any) => tData.weight,
    },
  ];

  return (
    <Wrapper>
      <Divider orientation="left">Fichas de alunos</Divider>
      {<Table<any> columns={columns} dataSource={userImcData} />}
    </Wrapper>
  );
};

export default exercise;
