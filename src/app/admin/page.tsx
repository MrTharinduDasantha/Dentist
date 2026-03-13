import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

const Admin = async () => {
  const user = await currentUser();

  // User is not logged in
  if (!user) redirect("/");

  const adminEmail = process.env.ADMIN_EMAIL;
  const userEmail = user.emailAddresses[0]?.emailAddress;

  // User is not the admin
  if (!adminEmail || userEmail !== adminEmail) redirect("/dashboard");
  return <AdminDashboardClient />;
};

export default Admin;
