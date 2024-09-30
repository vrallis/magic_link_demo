// Your Firebase config
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
    const usersRef = db.collection('users').where('email', '==', email);
    const snapshot = await usersRef.get();
    return !snapshot.empty;  
  }
  
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    const messageElem = document.getElementById('message');
  
    try {
      // Check if email exists in Firestore
      const emailExists = await isEmailInDatabase(email);
  
      if (emailExists) {

        await auth.sendSignInLinkToEmail(email, {
          url: 'https://your-github-pages-url/', 
          handleCodeInApp: true,
        });
        messageElem.textContent = 'Magic link sent! Check your email.';
        window.localStorage.setItem('emailForSignIn', email);
      } else {
        messageElem.textContent = 'Email not found in the database.';
      }
    } catch (error) {
      messageElem.textContent = `Error: ${error.message}`;
    }
  });
  
  if (auth.isSignInWithEmailLink(window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }
  
    auth.signInWithEmailLink(email, window.location.href)
      .then(result => {
        window.localStorage.removeItem('emailForSignIn');
        document.getElementById('message').textContent = 'Successfully signed in!';
      })
      .catch(error => {
        document.getElementById('message').textContent = `Error: ${error.message}`;
      });
  }
  