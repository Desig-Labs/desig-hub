import { Space, Typography, Image } from "antd";

import logo from "static/images/logo128.png";

const Logo = () => {
  return (
    <Space align="center">
      <Image src={logo} style={{ height: 30 }} />
      <Typography.Title level={3} style={{ color: "white", margin: 0 }}>
        Desig
      </Typography.Title>
    </Space>
  );
};

export default Logo;
