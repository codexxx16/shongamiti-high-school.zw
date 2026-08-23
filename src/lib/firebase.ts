import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBWdqwthInzHqgvgSHiTCVqKFL2sXK-6WE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "shongamiti-high-school.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "shongamiti-high-school",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "shongamiti-high-school.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "186649711667",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:186649711667:web:5ed0c3d0e28c4772c43f46",
};

export const firebaseApp = getApps()[0] ?? initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

export type TrackingStatus = "submitted" | "under_review" | "approved" | "rejected";

export type TrackingRecord = {
  referenceNumber: string;
  status: TrackingStatus;
  submittedAt: string;
  updatedAt: string;
};

function createTrackingCode() {
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (value) => value.toString(36).padStart(2, "0")).join("").slice(0, 16).toUpperCase();
}

export async function createTrackingRecord(referenceNumber: string): Promise<string | null> {
  const trackingCode = createTrackingCode();
  const timestamp = new Date().toISOString();
  try {
    await setDoc(doc(firestore, "applicationTracking", trackingCode), {
      trackingCode,
      referenceNumber,
      status: "submitted",
      submittedAt: timestamp,
      updatedAt: timestamp,
    });
    return trackingCode;
  } catch {
    return null;
  }
}

export async function updateTrackingRecord(trackingCode: string, status: TrackingStatus): Promise<boolean> {
  if (!trackingCode) return false;
  try {
    await updateDoc(doc(firestore, "applicationTracking", trackingCode.trim().toUpperCase()), { status, updatedAt: new Date().toISOString() });
    return true;
  } catch {
    return false;
  }
}

export async function lookupTrackingRecord(referenceNumber: string, trackingCode: string): Promise<TrackingRecord | null> {
  try {
    const snapshot = await getDoc(doc(firestore, "applicationTracking", trackingCode.trim().toUpperCase()));
    if (!snapshot.exists()) return null;
    const data = snapshot.data() as TrackingRecord & { trackingCode?: string };
    if (data.referenceNumber !== referenceNumber.trim().toUpperCase() || data.trackingCode !== trackingCode.trim().toUpperCase()) return null;
    return { referenceNumber: data.referenceNumber, status: data.status, submittedAt: data.submittedAt, updatedAt: data.updatedAt };
  } catch {
    return null;
  }
}
