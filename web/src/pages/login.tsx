import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import * as Yup from "yup";
import { setAccessToken } from "../auth";
import { InputField } from "../components/inputField";
import { useLoginMutation } from "../generated/graphql";

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
    <div>
      <div>login</div>
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

            <button disabled={isSubmitting} type="submit">
              login
            </button>
            <button onClick={() => router.push("/")}>home</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

// export async function getStaticProps() {
//   return { props: {} };
// }

export default login;
