"use client";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ProgressProvider } from "@bprogress/next/app";

export default function Providers({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
			<Toaster richColors closeButton />
			<ProgressProvider
				height="3px"
				color="#facc15"
				options={{ showSpinner: false }}
				shallowRouting
			>
				{children}
			</ProgressProvider>
		</ThemeProvider>
	);
}
