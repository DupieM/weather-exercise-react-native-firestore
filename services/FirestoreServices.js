import { addDoc, collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";


export const addReading = async (dayId, readingData) => {
    // Add reading to specific day

    try{
        //1. specify where we want the data to be added
        const dayRef = doc(db, "days", dayId) //specific doc's ID

        //2. specify the subcollection in this document
        const readingRef = collection(dayRef, "readings")

        //3. add document into this subcollection we have
        const docRef = await addDoc(readingRef, readingData)

        console.log("Success adding doc with id:" + docRef.id)

        return true //success
    } catch (e) {
        console.log("Something went wrong adding reading document:" + e)

        return false //failed
    }

   
} 

export const getAllDays = async () => {
    // return the days that we want to read

    //1. specify where we want to get the data
    const collectionRef =collection(db, "days");

    const q = query(collectionRef, orderBy("dayOfWeek", "asc"))

    //2. specify what it is that we want to do with this collection
    const querySnapshot = await getDocs(q);
    
    //3. process my data to be managable
    var daysData = [] //<- what I want to return

    //4. loop through each document
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    var theDay = {...doc.data(), id: doc.id}
    daysData.push(theDay)
    });

    return daysData
}