"use client";
import { Form, Input, Button, Card } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const res = axios.post("api/signup", values, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    res
      .then((response) => {
        if (response.data.success) {
          router.push("/login");
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
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
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
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
