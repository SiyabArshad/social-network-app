import {doc,setDoc,getFirestore, addDoc, getDocs,collection,getDoc,serverTimestamp, deleteDoc,updateDoc,query,where,orderBy,limit, startAt} from "firebase/firestore"
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signInWithEmailAndPassword} from "firebase/auth"
import app from "../../firebase"
const db=getFirestore(app)
const auth=getAuth(app)
const reportuserfunction=async(reportid)=>{
    const docRef = doc(db, "reports", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    let blocks=[]
    blocks=docSnap.data().blockusers
    blocks.push(reportid)
    setTimeout(async() => {
        await updateDoc(doc(db,"reports",auth.currentUser.uid),{
            blockusers:blocks
        })
    }, 2000);
}

export default reportuserfunction