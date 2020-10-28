import { Divider, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Wrapper } from "../components/wraper";
import { BMILevels } from "../enums/bmiLevels";
import { useMeLazyQuery } from "../generated/graphql";

const calculateIMC = (height: number, weight: number): number =>
  weight / (height * height);

const getImcStatus = (imc: number): string => {
  return imc < BMILevels.SevereThinness
    ? "Extremamente abaixo do peso"
    : imc < BMILevels.ModerateThinness
    ? "Gravemente abaixo do peso"
    : imc < BMILevels.MildThinness
    ? "Abaixo do peso ideal"
    : imc < BMILevels.Normal
    ? "Faixa de peso ideal"
    : imc < BMILevels.PreObese
    ? "Sobrepeso"
    : imc < BMILevels.Overweight
    ? "Obesidade grau I"
    : imc < BMILevels.ObeseClassII
    ? "Obesidade grau II (grave)"
    : "Obesidade grau III (mórbida)";
};

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

interface examProps {}

const exam: React.FC<examProps> = ({}) => {
  const [loadPage, setPageLoading] = useState(false);
  const [userImc, setUserImc] = useState<number>();
  const [me, { data, loading, error }] = useMeLazyQuery({
    //testing refresh token (working epicly)
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    // set user imc
  }, [data]);

  useEffect(() => {
    me();
    setPageLoading(false);
    setUserImc(calculateIMC(userImcData[3].height, userImcData[3].weight));
  }, []);

  const columns = [
    {
      title: "Data",
      key: "data",
      render: (tData: any) => tData.date,
    },
    {
      title: "Status",
      key: "status",
      render: (tData: any) =>
        getImcStatus(calculateIMC(tData.height, tData.weight)),
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

  if (loadPage) return <div>loading</div>;
  if (error)
    return (
      <Wrapper>
        <p>Error loading data for user</p>
      </Wrapper>
    );

  return (
    <Wrapper>
      <Divider orientation="left">Exame de aptidao Física</Divider>

      {userImc && (
        <>
          <p>
            Seu imc atualmente é {getImcStatus(userImc)}: {userImc}
          </p>
          <p>Histórico de IMC</p>

          <Table<any> columns={columns} dataSource={userImcData} />
        </>
      )}
    </Wrapper>
  );
};

export default exam;
