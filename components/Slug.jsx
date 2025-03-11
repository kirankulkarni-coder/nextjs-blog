"use client";
import React from "react";

const Slug = ({ title, data }) => {
  console.log(data);
  return (
    <div>
      <div>{title}</div>
      <div>{data.data.description}</div>
    </div>
  );
};

export default Slug;
