import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useMeLazyQuery } from "../generated/graphql";

const Index = () => {
  const router = useRouter();
  const [me, { data, loading, error }] = useMeLazyQuery({
    //testing refresh token (working epicly)
    fetchPolicy: "network-only",
  });
  const [loadPage, setPageLoading] = useState(false);
  useEffect(() => {
    me();
    setPageLoading(false);
  }, []);

  if (loadPage) return <div>loading</div>;
  if (error)
    return (
      <div>
        {error.message}{" "}
        <button onClick={() => router.push("/login")}>login</button>
      </div>
    );
  return (
    <div>
      <div>home</div>
      <button onClick={() => router.push("/register")}>register</button>
      {data && !loading ? <div> {data.me?.name}</div> : null}
    </div>
  );
};

export default Index;
