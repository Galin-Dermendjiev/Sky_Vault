import Image from "next/image";
import Search from "./Search";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";


export default function Header({
  userId,
  ownerName,
  accountId,
}: {userId: string, ownerName: string, accountId: string}) {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader ownerId={userId} ownerName={ownerName} accountId={accountId} />
        <form
          action={async () => {
            "use server";
            await signOutUser();
          }}
        >
          <button type="submit" className="sign-out-button">
            <Image
              src="/assets/icons/logout.svg"
              alt="logout"
              width={24}
              height={24}
              className="w-6"
            />
          </button>
        </form>
      </div>
    </header>
  );
}
