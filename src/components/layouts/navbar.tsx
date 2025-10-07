"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { DoorOpenIcon, Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { authClient, useSession } from "@/lib/auth-client";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import UserAvatar from "../auth/user-avatar";

export default function Navbar() {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();
    const logOut = async () => {
        await authClient.signOut();
        router.push("/")
    }
    const router = useRouter();
    return (
        <nav className="bg-background/90 backdrop-blur-md border-b border-foreground/10 fixed w-full top-0 z-50">
            <div className="max-w-[700px] mx-auto px-4">
                <div className="flex items-center gap-3 justify-between h-[60px]">
                    <Link href="/" className="font-bold text-lg">todo<span className="text-primary">list</span></Link>
                    <div className="flex gap-3 items-center">
                    <Button variant={"ghost"} size={"icon"} className="relative" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        <Sun className="dark:scale-0 scale-100 rotate-0 dark:rotate-6" />
                        <Moon className="dark:scale-100 scale-0 rotate-6 dark:rotate-0 absolute" />
                    </Button>
                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="cursor-pointer" variant={"ghost"} size={"icon"}>
                                    <UserAvatar user={session.user} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => {router.push("/settings")}}>
                                    <Settings className="mr-2" />
                                    Paramètres
                                </DropdownMenuItem>
                                <DropdownMenuItem variant={"destructive"} onClick={logOut}>
                                    <DoorOpenIcon className="mr-2" />
                                    Déconnexion
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href={"/login"}>
                            <Button className="cursor-pointer" variant={"outline"}>Se connecter</Button>
                        </Link>
                    )}
                </div>
                </div>
            </div>
        </nav>
    )
}