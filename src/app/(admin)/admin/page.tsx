"use client";
import React from "react";
import { useRouter } from "next/navigation";

const AdminHomePage = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.push("/admin/courses");
  }, []);
  return <div>Redirecting...</div>;
};

export default AdminHomePage;
