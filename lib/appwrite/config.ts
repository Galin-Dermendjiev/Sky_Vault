export const appwriteConfig = {
    endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
    projectName: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME!,

    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    userTableId: "users",
    filesTableId: "files",
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,

    secretKey: process.env.NEXT_APPWRITE_KEY!
}