"use client";
import { Divider, Menu, MenuItem, Text } from "@aws-amplify/ui-react";
import Logout from "../../../component/logout";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full  ">
      <div className="text-xl font-bold">
        <a href="/" className="">
          <Text variation={"primary"}>MeroNEP</Text>
        </a>
      </div>

      {/* User Menu */}
      <div className="relative">
        <div className="flex items-center space-x-4">
          <Menu
            menuAlign="end"
            size="small"
            trigger={
              <div className=" p-2 rounded-full cursor-pointer">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://via.placeholder.com/150" // Placeholder, you can use user's profile picture here
                  alt="User"
                />
              </div>
            }
          >
            <MenuItem onClick={() => alert("Download")}>
              {/* {user.signInDetails?.loginId} */}
            </MenuItem>
            <MenuItem onClick={() => alert("Create a Copy")}>Profile</MenuItem>
            <MenuItem onClick={() => alert("Mark as Draft")}>
              Mark as Draft
            </MenuItem>
            <Divider />
            <MenuItem isDisabled onClick={() => alert("Delete")}>
              Delete
            </MenuItem>
            <MenuItem>
              <Logout />
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
}
