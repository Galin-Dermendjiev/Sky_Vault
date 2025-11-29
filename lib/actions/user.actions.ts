"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { avatarPlaceholderUrl } from "@/constants";

async function getUserByEmail(email: string) {
  const { tables } = await createAdminClient();

  const result = await tables.listRows({
    databaseId: appwriteConfig.databaseId,
    tableId: appwriteConfig.userTableId,
    queries: [Query.equal("email", [email])],
  });

  return result.total > 0 ? result.rows[0] : null;
}

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export async function sendEmailOTP({ email }: { email: string }) {
  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailToken({
      userId: ID.unique(),
      email: email,
    });
    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
}

export async function createAccount(fullName: string, email: string) {
  const existingUser = await getUserByEmail(email);

  const accountId = await sendEmailOTP({ email });
  if (!accountId) throw new Error("Failed to send email OTP");

  if (!existingUser) {
    const { tables } = await createAdminClient();
    await tables.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.userTableId,
      rowId: ID.unique(),
      data: {
        fullName,
        email,
        avatar: avatarPlaceholderUrl,
        accountId,
      },
    });
  }

  return parseStringify({ accountId });
}

export async function verifySecret({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) {
  try {
    const { account } = await createAdminClient();
    const session = await account.createSession({
      userId: accountId,
      secret: password,
    });

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify OTP");
  }
}

export async function getCurrentUser() {
  const { tables, account } = await createSessionClient();
  const result = await account.get();

  const user = await tables.listRows({
    databaseId: appwriteConfig.databaseId,
    tableId: appwriteConfig.userTableId,
    queries: [Query.equal("accountId", result.$id)],
  });

  if(user.total < 0) return null
  
  return parseStringify(user.rows[0])
}
