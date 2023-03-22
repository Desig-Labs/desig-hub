import { Steps } from "antd";

const ReconstructKey = () => {
  const description = "ReconstructKey";
  return (
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
  );
};

export default ReconstructKey;
