import { Button, Divider, Layout, Modal } from "antd";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { Wrapper } from "../components/wraper";
import { useMeLazyQuery } from "../generated/graphql";
import Login from "./login";
const { Content } = Layout;

const Index = () => {
  const router = useRouter();
  const [me, { data, loading, error }] = useMeLazyQuery({
    //testing refresh token (working epicly)
    fetchPolicy: "network-only",
  });
  const [loadPage, setPageLoading] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);
  useEffect(() => {
    me();
    setPageLoading(false);
  }, []);

  if (loadPage) return <div>loading</div>;
  if (error)
    return (
      <Wrapper>
        <Content
          style={{
            marginTop: "1em",
            marginBottom: "1em",
            maxWidth: "90%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div>{error.message} </div>
          <Button type="primary" onClick={() => setLoginModalVisible(!loginModalVisible)}>
            Login
          </Button>
        </Content>

        <Modal title="Login" visible={loginModalVisible} onCancel={() => setLoginModalVisible(false)} footer={null}>
          <Login />
        </Modal>
      </Wrapper>
    );
  return (
    <Wrapper>
      <Content
        style={{
          marginTop: "1em",
          marginBottom: "1em",
          maxWidth: "90%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Divider>
          <div>Olá, {data && !loading ? <div> {data.me?.name}</div> : null}</div>
        </Divider>
        <Button type="primary" onClick={() => router.push("/register")}>
          Cadastrar Usuário
        </Button>
      </Content>
    </Wrapper>
  );
};

export default Index;
