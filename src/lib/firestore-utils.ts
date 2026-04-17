import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  getDocs,
  Timestamp,
  getDocFromServer,
  getDoc,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Notification } from '../types';

// ===============================================================
// Error Handling Pattern
// ===============================================================

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// ===============================================================
// Connection Test
// ===============================================================

export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. The client is offline.");
    }
  }
}

// ===============================================================
// Notification Operations
// ===============================================================

const NOTIFICATIONS_COLLECTION = 'notifications';

export const subscribeToNotifications = (callback: (notifications: Notification[]) => void) => {
  const q = query(collection(db, NOTIFICATIONS_COLLECTION), orderBy('created_at', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const notifications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: (doc.data().created_at as Timestamp).toDate().toISOString(),
      scheduled_for: doc.data().scheduled_for ? (doc.data().scheduled_for as Timestamp).toDate().toISOString() : undefined
    })) as Notification[];
    callback(notifications);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, NOTIFICATIONS_COLLECTION);
  });
};

export const createNotification = async (notification: Omit<Notification, 'id'>) => {
  try {
    const data = {
      ...notification,
      created_at: serverTimestamp(),
      scheduled_for: notification.scheduled_for ? Timestamp.fromDate(new Date(notification.scheduled_for)) : null
    };
    await addDoc(collection(db, NOTIFICATIONS_COLLECTION), data);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, NOTIFICATIONS_COLLECTION);
  }
};

export const updateNotification = async (id: string, notification: Partial<Notification>) => {
  try {
    const notifRef = doc(db, NOTIFICATIONS_COLLECTION, id);
    const data: any = { ...notification };
    if (notification.created_at) delete data.created_at; // Prevent updating creation date
    if (notification.scheduled_for) {
      data.scheduled_for = Timestamp.fromDate(new Date(notification.scheduled_for));
    }
    await updateDoc(notifRef, data);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${NOTIFICATIONS_COLLECTION}/${id}`);
  }
};

export const deleteNotification = async (id: string) => {
  try {
    await deleteDoc(doc(db, NOTIFICATIONS_COLLECTION, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${NOTIFICATIONS_COLLECTION}/${id}`);
  }
};

// ===============================================================
// User Profile Operations
// ===============================================================

const USERS_COLLECTION = 'users';

export const getUserProfile = async (uid: string) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${USERS_COLLECTION}/${uid}`);
  }
};

export const createUserProfile = async (uid: string, data: any) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await setDoc(userRef, { ...data, uid }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${USERS_COLLECTION}/${uid}`);
  }
};
