import { db } from "../../../firebasedb.config";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc} from "firebase/firestore";

// Fetch all documents from a collection
export async function _fetch(doc_name) {
  try {
    const querySnapshot = await getDocs(collection(db, doc_name));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
}

// Add a new document to a collection
export async function _add(doc_name, data) {
  try {
    if (!data || Object.keys(data).length === 0) return;
    const ref = await addDoc(collection(db, doc_name), data);
    return ref
  } catch (error) {
    console.error("Error adding document:", error);
  }
}

// Delete a document from a collection
export async function _delete(doc_name, data_id) {
  try {
    if (!data_id) return;
    await deleteDoc(doc(db, doc_name, data_id));
  } catch (error) {
    console.error("Error deleting document:", error);
  }
}

// Edit (update) an existing document
export async function _edit(doc_name, data_id, updatedData) {
  try {
    if (!updatedData || Object.keys(updatedData).length === 0) return;
    const docRef = doc(db, doc_name, data_id);
    const ref = await updateDoc(docRef, updatedData);
    console.log(' setNewTodo("");',ref)
    return docRef
  } catch (error) {
    console.error("Error updating document:", error);
  }
}

export async function _getById(doc_name, data_id) {
    try {
      if (!data_id) return null;
      const docRef = doc(db, doc_name, data_id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.error("No document found with ID:", data_id);
        return null;
      }
    } catch (error) {
      console.error("Error fetching document by ID:", error);
      return null;
    }
  }