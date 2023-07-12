declare module '@env' {
    const FIREBASE_API_KEY: string
    const FIREBASE_AUTH_DOMAIN: string
    const FIREBASE_PROJECT_ID: string
    const FIREBASE_STORAGE_BUCKET: string
    const FIREBASE_MESSAGING_SENDER_ID: number
    const FIREBASE_APP_ID: string
    const FIREBASE_MEASUREMEMT_ID: string

    const SERVICE_TRANSPORTER: string
    const EMAIL: string
    const PASSWORD: string

    export {
        FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID,
        FIREBASE_MEASUREMEMT_ID,
        SERVICE_TRANSPORTER,
        EMAIL,
        PASSWORD
    }
}
