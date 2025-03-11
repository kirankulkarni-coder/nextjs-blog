import Slug from "../../../components/Slug";
import React from "react";

export const generateMetadata = async ({ params }) => {
  const { slug } = await params; // Direct destructuring without await
  return {
    title: `Blog - ${slug}`,
  };
};

const SlugRoute = async ({ params }) => {
  const { slug } = await params; // Correct destructuring
  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/blog/` + slug);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Assuming the response is JSON
    console.log(data);
    return <Slug title={slug} data={data} />;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    // You might want to return an error message or a fallback component here
    return <div>Error loading data.</div>;
  }
};

// export async function generateStaticParams() {
//   // Use let instead of const for mutable assignment
//   let data = [];

//   try {
//     const response = await fetch(`${process.env.SERVER_URL}/api/slug-list`);
//     if (response.ok) {
//       data = await response.json();
//     }
//   } catch (error) {
//     console.error("Failed to fetch slugs:", error);
//   }

//   return data.map((slug) => ({ slug }));
// }

export default SlugRoute;
