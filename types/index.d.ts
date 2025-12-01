
export interface UploadFileProps{
    file: File,
    ownerId: string,
    accountId: string,
    path: string
}

export interface SearchParamProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}