import { ssrTrpc } from "@/trpc/server";
import React from "react";

const DashboardPage = async () => {
  const users = await ssrTrpc.userList();

  return <div>{users ? JSON.stringify(users) : ""}</div>;
};

export default DashboardPage;
