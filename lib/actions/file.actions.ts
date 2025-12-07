"use server";

import {
  DeleteFileProps,
  FileRow,
  GetFilesProps,
  RenameFileProps,
  UpdateFileUsersProps,
  UploadFileProps,
} from "@/types";
import { createAdminClient } from "../appwrite";
import { InputFile } from "node-appwrite/file";
import { appwriteConfig } from "../appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export async function uploadFile({
  file,
  ownerId,
  ownerName,
  accountId,
  path,
}: UploadFileProps) {
  const { storage, tables } = await createAdminClient();

  try {
    const inputFile = InputFile.fromBuffer(file, file.name);

    const bucketFile = await storage.createFile({
      bucketId: appwriteConfig.bucketId,
      fileId: ID.unique(),
      file: inputFile,
    });

    const fileDocument = {
      type: getFileType(bucketFile.name).type,
      name: bucketFile.name,
      url: constructFileUrl(bucketFile.$id),
      extension: getFileType(bucketFile.name).extension,
      size: bucketFile.sizeOriginal,
      owner: ownerId,
      ownerName,
      accountId,
      users: [],
      bucketFileId: bucketFile.$id,
    };

    const newFile = await tables
      .createRow({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.filesTableId,
        rowId: ID.unique(),
        data: fileDocument,
      })
      .catch(async (error: unknown) => {
        await storage.deleteFile({
          bucketId: appwriteConfig.bucketId,
          fileId: bucketFile.$id,
        });
        handleError(error, "Failed to create file document");
      });

    revalidatePath(path);
    return parseStringify(newFile);
  } catch (error) {
    handleError(error, "Failed to upload files");
  }
}

function CreateQueries(currentUser: Models.User, types: string[]) {
  const queries = [
    Query.or([
      Query.equal("owner", currentUser.$id),
      Query.contains("users", currentUser.email),
    ]),
  ];

  if (types.length > 0) {
    queries.push(Query.equal("type", types));
  }

  return queries;
}

export async function getFiles({ types = [] }: GetFilesProps) {
  const { tables } = await createAdminClient();
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User not found");

    const queries = CreateQueries(currentUser, types);
    const files = await tables.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.filesTableId,
      queries,
    });

    console.log(files);
    return parseStringify(files);
  } catch (error) {
    handleError(error, "Failed to get files");
  }
}

export async function renameFile({
  fileId,
  name,
  extension,
  path,
}: RenameFileProps) {
  const { tables } = await createAdminClient();

  try {
    const newName = `${name}.${extension}`;
    const updatedFile = await tables.updateRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.filesTableId,
      rowId: fileId,
      data: { name: newName },
    });

    revalidatePath(path);
    return parseStringify(updatedFile);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
}

export async function updateFileUsers({
  fileId,
  emails,
  path,
}: UpdateFileUsersProps) {
  const { tables } = await createAdminClient();

  try {
    const updatedFile = await tables.updateRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.filesTableId,
      rowId: fileId,
      data: { users: emails },
    });

    revalidatePath(path);
    return parseStringify(updatedFile);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
}

export async function deleteFile({
  fileId,
  bucketFileId,
  path,
}: DeleteFileProps) {
  const { tables, storage } = await createAdminClient();

  try {
    const deletedFile = await tables.deleteRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.filesTableId,
      rowId: fileId,
    });

    if (deletedFile) {
      await storage.deleteFile({
        bucketId: appwriteConfig.bucketId,
        fileId: bucketFileId,
      });
    }

    revalidatePath(path);
    return parseStringify({ status: "success" });
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
}
