const conf = {
  appwriteUrl: String(import.meta.env.VITE_APP_WRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APP_WRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APP_WRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APP_WRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APP_WRITE_BUCKET_ID),
};

export default conf;
