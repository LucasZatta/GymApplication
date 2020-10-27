import { Layout } from "antd";
import CSS from "csstype";
import React from "react";

interface WrapperProps {
  variant?: "small" | "regular";
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  const style: CSS.Properties = {
    marginTop: "2rem",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: variant === "regular" ? "80%" : "40%",
  };
  return <Layout style={style}>{children}</Layout>;
};
