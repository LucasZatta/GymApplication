import { useRouter } from "next/dist/client/router";

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
  const router = useRouter();

  return (
    <div>
      register <button onClick={() => router.push("/login")}>login</button>
    </div>
  );
};

export async function getStaticProps() {
  return { props: {} };
}

export default register;
