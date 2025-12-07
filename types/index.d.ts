import { Models } from "node-appwrite";

export interface UploadFileProps{
    file: File,
    ownerId: string,
    ownerName: string,
    accountId: string,
    path: string
}

export interface SearchParamProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface FileRow extends Models.Row {
  name: string;
  url: string;
  type: string;
  extension: string;
  size: number;
  accountId: string;
  bucketFileId: string;
  users: string[];
  owner: string;
  ownerName: string;
}

export interface ActionType {
  label: string;
  icon: string;
  value: string;
}

export interface RenameFileProps {
  fileId: string;
  name: string;
  extension: string;
  path: string;
}

export interface UpdateFileUsersProps {
  fileId: string;
  emails: string[];
  path: string;
}