import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { Profile } from '../model'
import { setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

//auth.settings.appVerificationDisabledForTesting = true

export const signIn = async (phoneNumber: string) => {
  try {
    const applicationVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
    )

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      applicationVerifier,
    )

    return { success: true, confirmationResult: confirmationResult }
  } catch (err) {
    return { success: false, error: err?.toString(), confirmationResult: null }
  }
}

export const confirmCode = async (
  confirmationResult: any,
  verificationCode: string,
) => {
  try {
    const credential = await confirmationResult.confirm(verificationCode)

    return { success: true, credential: credential }
  } catch (err) {
    return { success: false, error: err?.toString(), credential: null }
  }
}

export const signOut = async () => {
  try {
    await auth.signOut()
    return { success: true }
  } catch (err) {
    return { success: false, error: err.toString() }
  }
}

export const addProfile = async (profile: Profile) => {
  try {
    const payload = { ...profile }
    delete payload['id']
    await setDoc(doc(db, 'users', profile.id), { ...payload })
    return { success: true, profile: profile }
  } catch (e) {
    return { success: false, error: e?.toString() }
  }
}

export const loadProfile = async (id: string) => {
  try {
    const docRef = doc(db, 'users', `${id}`)
    const profileDoc = await getDoc(docRef)
    if (profileDoc.exists()) {
      let profile: Profile = { id: profileDoc.id, ...profileDoc.data() }
      return { success: true, profile: profile }
    } else {
      return { success: true, profile: null, error: 'Profile does not exist' }
    }
  } catch (e) {
    return { success: false, error: e?.toString() }
  }
}
