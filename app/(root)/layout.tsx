import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("appwrite-session");
  if (!session) return redirect("/sign-in");

  const currentUser = await getCurrentUser()
  if(!currentUser) return redirect('/sign-in')

  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser} />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...currentUser}/> 
        <Header userId={currentUser.$id} accountId={currentUser.accountId}/>
        <div className="main-content">{children}</div>
      </section>
      <Toaster />
    </main>
  );
}
