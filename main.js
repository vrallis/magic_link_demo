// Firebase config and initialization
const firebaseConfig = {
  apiKey: "AIzaSyBxQLbs1uxMX1hyxxbXqCo9m6M_QyVMy4I",
  authDomain: "magic-link-demo-c604c.firebaseapp.com",
  projectId: "magic-link-demo-c604c",
  storageBucket: "magic-link-demo-c604c.appspot.com",
  messagingSenderId: "864377817172",
  appId: "1:864377817172:web:36daf09f3d49fef03145c1"
};


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


async function isEmailInDatabase(email) {
  try {
    const usersRef = db.collection('users').where('email', '==', email);
    const snapshot = await usersRef.get();
    
    console.log(`Checking for email: ${email}`); 
    
    if (!snapshot.empty) {
      console.log('Email found in Firestore.');
      return true;
    } else {
      console.log('Email not found in Firestore.');
      return false;
    }
  } catch (error) {
    console.error('Error checking Firestore:', error);
    return false;
  }
}


async function sendMagicLink(email) {
  try {
    console.log(`Attempting to send magic link to: ${email}`);
    await auth.sendSignInLinkToEmail(email, {
      url: 'https://vrallis.github.io/magic_link_demo/',
      handleCodeInApp: true,
    });
    console.log('Magic link successfully sent.');
    window.localStorage.setItem('emailForSignIn', email); 
  } catch (error) {
    console.error('Error sending magic link:', error); 
    throw error;
  }
}


document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('emailInput').value;
  const messageElem = document.getElementById('message');

  try {
    const emailExists = await isEmailInDatabase(email);

    if (emailExists) {
      console.log('Email exists, proceeding to send magic link.');
      await sendMagicLink(email);
      messageElem.textContent = 'Magic link sent! Check your email.';
    } else {
      messageElem.textContent = 'Email not found in the database.';
    }
  } catch (error) {
    console.error('Error occurred during magic link process:', error);
    messageElem.textContent = `Error: ${error.message}`;
  }
});
