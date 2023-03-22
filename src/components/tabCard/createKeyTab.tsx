import { Col, Image, Row } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

import img from "static/images/create-key.png";
import "./index.less";

const CreateKeyTab = () => {
  const path = "/create-key";
  const location = useLocation();
  const navigate = useNavigate();

  const className = location.pathname === path ? "tab-link tab-link-tab-1-current" : "tab-link tab-link-tab-1";
  return (
    <Row onClick={() => navigate(path)}>
      <Col span={24} className={className}>
        <Image src={img} preview={false} />
      </Col>
    </Row>
  );
};

export default CreateKeyTab;
