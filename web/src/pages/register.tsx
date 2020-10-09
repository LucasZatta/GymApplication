import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import * as Yup from "yup";
import { InputField } from "../components/inputField";
import { useRegisterMutation, UserType } from "../generated/graphql";

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
    <div>
      <div>register</div>
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

              <select onChange={(ev) => setUserType(ev.target.value)}>
                <option value={UserType.Costumer}>Cliente</option>
                <option value={UserType.Doctor}>Médico</option>
                <option value={UserType.Secretary}>Secretária</option>
                <option value={UserType.Teacher}>Instrutor</option>
              </select>
            </div>
            <button disabled={isSubmitting} type="submit">
              cadastrar
            </button>
            <button onClick={() => router.push("/")}>home</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export async function getStaticProps() {
  return { props: {} };
}

export default register;
