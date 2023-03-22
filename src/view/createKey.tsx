import { Button, Card, Col, Image, Row, Space, Steps, Typography } from "antd";
import SignInSocials from "components/signInSocials";

import socials from "static/images/socials.svg";
import device from "static/images/device.svg";

const CreateKey = () => {
  const description = "CreateKey";
  return (
    <Row gutter={[48, 48]}>
      <Col span={24}>
        <Steps
          current={1}
          items={[
            {
              title: "Finished",
              description,
            },
            {
              title: "In Progress",
              description,
              subTitle: "Left 00:00:08",
            },
            {
              title: "Waiting",
              description,
            },
          ]}
        />
      </Col>
      <Col span={24}>
        <Row justify="center" gutter={[24, 24]} wrap>
          <Col>
            <Card style={{ width: 650, height: 150 }}>
              <Row>
                <Col span={6} style={{ textAlign: "center" }}>
                  <Image src={socials} preview={false} style={{ height: 100 }} />
                </Col>
                <Col flex={"auto"}>
                  <Space direction="vertical">
                    <Typography.Title level={2}>Login with your Socials</Typography.Title>
                    <SignInSocials />
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: 650, height: 150 }}>
              <Row>
                <Col span={6} style={{ textAlign: "center" }}>
                  <Image src={device} preview={false} style={{ height: 100 }} />
                </Col>

                <Col>
                  <Space direction="vertical">
                    <Typography.Title level={2}>Allow device storage</Typography.Title>
                    <Button size="large" type="primary">
                      ALLOW DEVICE
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CreateKey;
