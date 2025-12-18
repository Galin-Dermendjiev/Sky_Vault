# Sky Vault
## Cloud File Storage Application

A cloud-based file storage application for uploading, managing, and sharing files securely. Built with **Next.js 16**, **Appwrite**, **Tailwind CSS**, **TypeScript**, and **ShadCN**.

---

## Features

- **File Upload & Download**: Upload and download files of various formats (images, PDFs, MP3, MP4).
- **File Visualization**: View images, PDFs, MP3, and MP4 files directly in the browser.
- **File Management**: Rename, delete, and organize your files.
- **File Sharing**: Share files with other users securely.
- **OTP Authentication**: Secure login with one-time password (OTP) via Appwrite.
- **Global Search**: Search files across all categories.
- **Sorting**: Sort files by name, date, type, and other metadata.
- **Responsive UI**: Fully responsive design optimized for desktop and mobile.

---

## Tech Stack

- **Next.js 16**: React framework for SSR and static apps.
- **Appwrite**: Backend-as-a-service for authentication and file storage.
- **Tailwind CSS**: Utility-first CSS framework for modern styling.
- **TypeScript**: Static typing for JavaScript.
- **ShadCN**: UI component library for building modern interfaces.
- **OTP Authentication**: One-time password authentication for secure logins.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/sky-vault.git
cd sky-vault
```

2. Install Dependencies

```bash
npm install
```

## Environment Variables

Create a `.env.local` file in the root of your project and add the following variables:

```env
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
NEXT_PUBLIC_APPWRITE_PROJECT_NAME=
NEXT_PUBLIC_APPWRITE_ENDPOINT=

NEXT_PUBLIC_APPWRITE_DATABASE=
NEXT_PUBLIC_APPWRITE_BUCKET=
NEXT_APPWRITE_KEY=
```

# Appwrite Setup

To make the application fully functional, you need to create two tables in Appwrite: **users** and **files**.

---

## Users Table

| Column      | Type      | Notes                          |
|------------|-----------|--------------------------------|
| fullName   | string    | Required, size 255             |
| email      | email     | Required                       |
| avatar     | string    | Size 2000, optional            |
| accountId  | string    | Required, size 255             |
| $id        | string    | Auto-generated                 |
| files      | relation  | Many-to-one relationship       |
| $createdAt | datetime  | Auto-generated                 |
| $updatedAt | datetime  | Auto-generated                 |

---

## Files Table

| Column       | Type      | Notes                          |
|-------------|-----------|--------------------------------|
| users[]     | string    | Optional, size 10000           |
| $id         | string    | Auto-generated                 |
| name        | string    | Required, size 255             |
| url         | url       | Required                       |
| type        | enum      | Required                       |
| accountId   | string    | Required, size 255             |
| bucketFileId| string    | Required, size 255             |
| owner       | relation  | Many-to-one relationship       |
| extension   | string    | Optional, size 255             |
| size        | integer   | Optional                       |
| ownerName   | string    | Required, size 255             |
| $createdAt  | datetime  | Auto-generated                 |
| $updatedAt  | datetime  | Auto-generated                 |

> **Note:** Users input their name and email to receive an OTP code for authentication.

---

## Run the Development Server
- npm run dev

## Usage

1. Open the application in your browser.  
2. Sign in with your name and email to receive an OTP code.  
3. Upload files using the upload button and organize them into categories if needed.  
4. View files directly in the browser (images, PDFs, MP3, MP4).  
5. Rename, delete, or share files with other users.  
6. Use global search and sorting features to quickly find your files.
