import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import Navbar from "@/components/layouts/navbar";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Todo List",
	description: "A simple todo list application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr" suppressHydrationWarning>
			<body
				className={`${geistSans.className} ${geistMono.variable} antialiased`}
			>
				<Analytics />
				<Providers>
					<Navbar />
					<div className="max-w-[700px] mx-auto px-4 pt-20">
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
