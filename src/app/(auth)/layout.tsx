
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo List - login",
  description: "A simple todo list application - login",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
        {children}
    </div>
  );
}