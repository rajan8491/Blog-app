const conf = {
    appwrite_url: String(import.meta.env.VITE_APPWRITE_URL),
    appwrite_project_id: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwrite_database_id: String(import.meta.env.VITE_DATABASE_ID),
    appwrite_collection_id: String(import.meta.env.VITE_COLLECTION_ID),
    appwrite_bucket_id: String(import.meta.env.VITE_BUCKET_ID),
}

export default conf