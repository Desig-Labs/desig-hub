import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Fragment, useState } from "react";
import { Avatar, Button, Modal, Space, Typography } from "antd";
import { supabase } from "configs";

const SignInSocials = () => {
  const [open, setOpen] = useState(false);
  const { user } = Auth.useUser();

  const onBackupKey = async () => {
    if (!user) return;

    const updates = {
      id: user.id,
      share_key: "my_share_key",
    };
    await supabase.from("profiles").upsert(updates);
    console.log("OK");
  };

  return (
    <Fragment>
      {!user ? (
        <Button onClick={() => setOpen(true)} size="large">
          Login with socials
        </Button>
      ) : (
        <Space>
          <Avatar src={user.user_metadata.picture}></Avatar>
          <Typography.Text>{user.email}</Typography.Text>
          <Button onClick={() => onBackupKey()}>Backup Key</Button>
          <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
        </Space>
      )}

      <Modal open={open} footer={null} title="Login Desig" onCancel={() => setOpen(false)}>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={["google", "discord", "facebook", "twitter"]}>
          hello
        </Auth>
      </Modal>
    </Fragment>
  );
};

export default SignInSocials;
