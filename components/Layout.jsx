"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuList = [
  {
    name: "Home",
    href: "/",
    button: false,
  },
  {
    name: "Blog",
    href: "/blog",
    button: false,
  },
  {
    name: "Login",
    href: "/login",
    button: false,
  },
  {
    name: "Signup",
    href: "/signup",
    button: true,
  },
];

const blackListed = ["/login", "/signup", "/admin", "/admin/blog"];

const Layout = ({ children }) => {
  const pathName = usePathname();
  const isTrueBlackListed = blackListed.includes(pathName);
  console.log(pathName);
  return (
    <html lang="en">
      <head>
        <title>My App</title>
      </head>
      <body>
        {!isTrueBlackListed ? (
          <>
            <nav className="px-[10%] bg-white shadow-lg sticky top-0 left-0 w-full py-6 flex justify-between">
              <div>
                <Link href="/"> Nextjs Coder</Link>
              </div>
              <div className="flex gap-16">
                {menuList.map((item, index) => {
                  return (
                    <Link
                      className={item.href == pathName ? "text-blue-500" : ""}
                      key={index}
                      href={item.href}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                <Link
                  href="/signup"
                  className="bg-violet-600 text-white rounded px-8 py-1 hover:bg-violet-700 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            </nav>
            <section className="px-[10%] py-16">{children}</section>
            <footer className="bg-gray-600 flex justify-center h-[450px] text-white items-center">
              This is footer
            </footer>
          </>
        ) : (
          <section>{children}</section>
        )}
      </body>
    </html>
  );
};

export default Layout;
