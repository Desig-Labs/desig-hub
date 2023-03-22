import { Col, Layout, Row, Divider } from "antd";

import { Content, Header } from "antd/lib/layout/layout";
import Banner from "components/banner";
import Logo from "components/logo";
import ReconstructKeyTab from "components/tabCard/reconstructKeyTab";
import CreateKeyTab from "components/tabCard/createKeyTab";
import CreateKey from "./createKey";

import "./index.less";

export type ProcessConfig = {
  time: number;
  startIndex: number;
  amount: string;
};
function View() {
  return (
    <Layout>
      <Header className="header">
        <Logo />
      </Header>
      <Layout>
        <Banner />
        <Content>
          <Row>
            <Col span={12}>
              <CreateKeyTab />
            </Col>
            <Col span={12}>
              <ReconstructKeyTab />
            </Col>
          </Row>
        </Content>
        <Row align="middle" justify="center">
          <Col style={{ width: "50%" }}>
            <Divider />
          </Col>
        </Row>
        <Content>
          <Row align="middle" justify="center">
            <Col style={{ maxWidth: 1220, width: "100%" }}>
              <CreateKey />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default View;
