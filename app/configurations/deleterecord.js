import {doc,setDoc,getFirestore, addDoc, getDocs,collection,getDoc,serverTimestamp, deleteDoc,updateDoc,query,where,orderBy,limit, startAt} from "firebase/firestore"
import app from "../../firebase"
const db=getFirestore(app)

const deleterecordfunction=async(collectionname,docid)=>{
    await deleteDoc(doc(db,collectionname,docid))
}

export default deleterecordfunction