import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function loadViewData(uid, viewKey) {
  const ref = doc(db, "users", uid, "views", viewKey);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function saveViewData(uid, viewKey, data) {
  const ref = doc(db, "users", uid, "views", viewKey);
  await setDoc(ref, { ...data, updatedAt: Date.now() }, { merge: true });
}
