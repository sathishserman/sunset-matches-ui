import {doc, setDoc } from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from "../firebase/firebase";

/**
 * Uploads an image to Firebase Storage and returns the file's URL.
 * @param file The file to upload.
 * @param path The path within Firebase Storage where the file should be stored.
 * @returns The URL of the uploaded file.
 */
export const uploadImage = async (file: File, path: string): Promise<string> => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
};

/**
 * Stores the given URL in Firestore under the specified collection and document ID.
 * @param collection The path to the collection.
 * @param docId The document ID.
 * @param picUrls Array of Pic Urls to store.
 */
export const storeImageUrl = async (collection: string, docId: string, picUrls: Array<string>): Promise<void> => {
    const docRef = doc(db, collection, docId);
    await setDoc(docRef, { pics: picUrls }, { merge: true });
};