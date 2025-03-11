"use client";
import { Form, Input, Button, Card } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const onFinish = (values) => {
    console.log(values);
    const res = axios.post("api/login", values, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    res
      .then((response) => {
        if (response.data.success) {
          router.push("/");
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex h-screen justify-center items-center">
      <Card hoverable className="w-6/12 shadow-lg">
        <h1 className="text-2xl font-semifold mb-4">Sign In:</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
