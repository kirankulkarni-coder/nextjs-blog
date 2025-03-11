"use client";
import Card from "antd/es/card/Card";
import Link from "next/link";

const Blog = ({ data }) => {
  return (
    <div className="flex w-full flex-col gap-8">
      {data &&
        data.map((item, index) => (
          <Link key={index} href={`/blog/` + item.title.split(" ").join("-")}>
            <Card key={index} hoverable>
              <h1> {item.title} </h1>
            </Card>
          </Link>
        ))}
    </div>
  );
};

export default Blog;
