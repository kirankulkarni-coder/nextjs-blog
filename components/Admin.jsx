"use client";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR, { mutate } from "swr";

const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const Admin = () => {
  const router = useRouter();
  const [editClicked, setEditClicked] = useState(null);
  const [form] = useForm();
  const { data } = useSWR("admin/api/blog", fetcher);
  const blogHandler = (values) => {
    const res = axios.post("admin/api/blog", values, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    res
      .then((response) => {
        if (response.data.success) {
          mutate("admin/api/blog");
          axios.post("api/cache/clear", { paths: ["/blog"] });
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onEditHandler = (item) => {
    form.setFieldsValue(item);
    setEditClicked(item._id);
  };

  const updateHandler = (values) => {
    const res = axios.put(`admin/api/blog/${editClicked}`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    res
      .then((response) => {
        if (response.data.success) {
          mutate("admin/api/blog");
          axios.post("api/cache/clear", { paths: ["/blog"] });
          form.resetFields();
          setEditClicked(null);
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDeleteHandler = (id) => {
    console.log(id);
    const res = axios.delete(`admin/api/blog/${id}`);
    res
      .then((response) => {
        if (response.data.success) {
          mutate("admin/api/blog");
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="grid grid-cols-12 gap-12">
      <div className="col-span-7">
        <h1 className="text-4xl font-bold mb-8"> New Blog:</h1>
        <Form
          layout="vertical"
          onFinish={editClicked ? updateHandler : blogHandler}
          form={form}
        >
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input size="large" placeholder="Enter the Blog Title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea size="large" placeholder="Enter the blog content" />
          </Form.Item>

          {!editClicked ? (
            <Button type="primary" htmlType="submit" size="large">
              Create Blog
            </Button>
          ) : (
            <Button type="primary" htmlType="submit" size="large">
              Save Blog
            </Button>
          )}
        </Form>
      </div>
      <div className="col-span-5 flex flex-col gap-6">
        {data &&
          data.data.map((item, index) => (
            <Card
              key={index}
              hoverable
              actions={[
                <Button
                  icon={<EditOutlined />}
                  onClick={() => onEditHandler(item)}
                  key="edit"
                />,
                <Button
                  icon={<DeleteOutlined />}
                  key="delete"
                  onClick={() => onDeleteHandler(item._id)}
                />,
              ]}
              className="space-y-6"
            >
              <h1 className="text-xl captilize font-semibold">{item.title}</h1>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Admin;
