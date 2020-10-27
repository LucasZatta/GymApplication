import { Button, Col, Divider, Layout, Row } from "antd";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import * as Yup from "yup";
import { setAccessToken } from "../auth";
import { InputField } from "../components/inputField";
import { Wrapper } from "../components/wraper";
import { useLoginMutation } from "../generated/graphql";
const { Content } = Layout;

interface loginProps {}

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Login deve ter no minimo 3 caracteres")
    .required("Campo obrigatório"),
  password: Yup.string()
    .min(3, "Senha deve ter no minimo 3 caracteres")
    .required("Campo obrigatório"),
});

const login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Divider>Login</Divider>
      <Formik
        validationSchema={LoginSchema}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values) => {
          const res = await login({
            variables: {
              login: values,
            },
          });
          if (res && res.data) {
            if (res.data.login.accessToken)
              setAccessToken(res.data.login.accessToken);
            else console.log(res.data?.login.errorMessage);
          }

          router.push("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Content
              style={{
                marginTop: "1em",
                maxWidth: "80%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
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
                    disabled={isSubmitting}
                    htmlType="submit"
                  >
                    Login
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
            </Content>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

// export async function getStaticProps() {
//   return { props: {} };
// }

export default login;
