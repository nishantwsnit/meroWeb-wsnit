"use client";
import { MenuItem } from "@/types/menuTypes";
// import { cn } from "@/utils";
import { Accordion, Flex, Text } from "@aws-amplify/ui-react";
import { ChartBarStacked, FolderCheck, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Sidebar() {
  const pathname = usePathname();

  const activePathname = pathname.split("/")[2] ?? "admin";

  const menu: MenuItem[] = [
    {
      title: "Dashboard",
      key: "admin",
      link: "/admin",
      icon: <LayoutDashboard />,
    },
    {
      title: "Directory",
      key: "directory",
      link: "/admin/directory",
      icon: <FolderCheck />,
    },
    {
      title: "Category",
      key: "category",
      link: "/admin/category",
      icon: <ChartBarStacked />,
    },
  ];

  return (
    <div className=" ">
      <Flex direction="column" gap="xs">
        {menu.map((item, index) => (
          <Flex key={index}>
            {item.children ? (
              <Accordion
                className=" admin-sidebar"
                items={item.children.map((child) => ({
                  trigger: (
                    <Text fontSize="large" fontWeight="">
                      {item?.title}
                    </Text>
                  ),
                  value: item.key,
                  content: (
                    <div className=" p-2  text-base font-medium rounded-lg !w-full hover:bg-gray-100 hover:text-blue-600">
                      <Link href={child.link}>{child.title}</Link>
                    </div>
                  ),
                }))}
              />
            ) : (
              <Flex
                columnGap={10}
                alignItems={"center"}
                justifyContent={"start"}
                paddingBlock={8}
                width={"100%"}
                className={
                  "  text-gray-900 rounded-lg hover:bg-gray-100 hover:text-blue-600"
                  // activePathname === item.key ? "bg-gray-100 text-blue-600" : ""
                }
              >
                {item?.icon}
                <Link
                  href={item.link}
                  // className={
                  //   "flex w-full items-center text-base font-medium p-2 text-gray-900 rounded-lg hover:bg-gray-100 hover:text-blue-600"
                  //   // activePathname === item.key ? "bg-gray-100 text-blue-600" : ""
                  // }
                >
                  <Text fontSize="medium" fontWeight="medium" >
                    {item.title}
                  </Text>
                </Link>
              </Flex>
            )}
          </Flex>
        ))}
      </Flex>
    </div>
  );
}
