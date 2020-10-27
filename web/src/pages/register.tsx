import { Button, Col, Divider, Layout, Row, Select } from "antd";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import * as Yup from "yup";
import { InputField } from "../components/inputField";
import { Wrapper } from "../components/wraper";
import { useRegisterMutation, UserType } from "../generated/graphql";

const { Option } = Select;
const { Content } = Layout;

interface registerProps {}

export const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "O nome deve ter no minimo 3 caracteres")
    .required("Campo obrigatório"),
  socialSecurity: Yup.string()
    //add regex?
    //.matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "Digite um CPF válido")
    .required("Campo obrigatório"),
  birthDate: Yup.date().required("Campo obrigatório"),
  username: Yup.string()
    .min(3, "Login deve ter no minimo 3 caracteres")
    .required("Campo obrigatório"),
  password: Yup.string()
    .min(3, "Senha deve ter no minimo 3 caracteres")
    .required("Campo obrigatório"),
});

const register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [userType, setUserType] = useState<string>(UserType.Costumer);
  const [register] = useRegisterMutation();
  return (
    <Wrapper>
      <Divider orientation="left">Cadastrar Usuário</Divider>

      <Formik
        validationSchema={RegisterSchema}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          name: "",
          socialSecurity: "",
          birthDate: "",
          username: "",
          password: "",
          userType: "",
        }}
        onSubmit={async (values) => {
          const res = await register({
            variables: { data: { ...values, userType: userType as UserType } },
          });

          if (res.data) {
            if (res.data.insertUser.errorMessage)
              console.log("erro: ", res.data.insertUser.errorMessage);
            else console.log(res.data.insertUser.user?.name, " cadastrado");
          } else {
            console.log(res.errors);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Content
              style={{
                marginTop: "1em",
                maxWidth: "90%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <InputField
                name="name"
                placeholder="Informe o nome"
                label="Nome"
                type="name"
              />
              <InputField
                name="socialSecurity"
                placeholder="Informe o CPF"
                label="CPF"
                type="textarea"
              />
              <InputField
                name="birthDate"
                placeholder="Informe a data de nascimento"
                label="Data de Nascimento"
                type="date"
              />
              <InputField
                name="username"
                placeholder="Informe o nome de usuário"
                label="Usuário"
                type="username"
              />
              <InputField
                name="password"
                placeholder="Informe a senha"
                label="Senha"
                type="password"
              />
              <div>
                <label>Tipo de usuário</label>

                <Select
                  style={{ width: 120 }}
                  defaultValue={UserType.Costumer}
                  onChange={(value) => setUserType(value.toString())}
                >
                  <Option value={UserType.Costumer}>Cliente</Option>
                  <Option value={UserType.Doctor}>Médico</Option>
                  <Option value={UserType.Secretary}>Secretária</Option>
                  <Option value={UserType.Teacher}>Instrutor</Option>
                </Select>
              </div>
            </Content>

            <Row
              style={{
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            >
              <Col offset={2} span={8}>
                <Button
                  block={true}
                  type="primary"
                  loading={isSubmitting}
                  htmlType="submit"
                >
                  Cadastrar
                </Button>
              </Col>
              <Col offset={4} span={8}>
                <Button
                  block={true}
                  type="default"
                  onClick={() => router.push("/")}
                >
                  Home
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export async function getStaticProps() {
  return { props: {} };
}

export default register;
