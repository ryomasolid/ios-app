import { CalendarDto } from '@/types/api';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// 日付に対するステータスを書き込む関数
export const setStatusForDate = async (data: CalendarDto) => {
  try {
    await setDoc(doc(db, 'data', data.date), {
      status: data.status,
    });
    console.log('Document successfully written!');
  } catch (e) {
    console.error('Error writing document: ', e);
  }
};

// 全ての日付とステータスを取得する関数
export const getAllData = async () => {
  const querySnapshot = await getDocs(collection(db, 'data'));
  const fetchedData: { date: string; status: string }[] = [];
  querySnapshot.forEach((doc) => {
    fetchedData.push({
      date: doc.id,
      status: doc.data().status as string,
    });
  });
  return fetchedData;
};

export const getStatusByDate = async (date: string): Promise<string | null> => {
  try {
    const docRef = doc(db, 'data', date);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log('No such document!');
      return null;
    }

    return docSnap.data().status as string;

  } catch (e) {
    console.error('Error getting document: ', e);
    return null;
  }
};