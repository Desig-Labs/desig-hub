import { Col, Image, Row } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

import img from "static/images/reconstruct-key.png";

import "./index.less";

const ReconstructKeyTab = () => {
  const path = "/reconstruct-key";
  const location = useLocation();
  const navigate = useNavigate();

  console.log("location", location);
  const className = location.pathname === path ? "tab-link tab-link-tab-2-current" : "tab-link tab-link-tab-2";
  return (
    <Row onClick={() => navigate(path)}>
      <Col span={24} className={className}>
        <Image src={img} preview={false} />
      </Col>
    </Row>
  );
};

export default ReconstructKeyTab;
