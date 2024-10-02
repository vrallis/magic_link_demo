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

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    console.log('Persistence set to LOCAL');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

const actionCodeSettings = {
  url: 'https://vrallis.github.io/magic_link_demo/',
  handleCodeInApp: true,
};

function sendMagicLink(email) {
  auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      console.log('Magic link successfully sent.');
      window.localStorage.setItem('emailForSignIn', email);
      alert('Magic link sent! Check your email.');
    })
    .catch((error) => {
      console.error('Error sending magic link:', error);
      alert(`Error: ${error.message}`);
    });
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('emailInput').value;
  const messageElem = document.getElementById('message');

  try {
    console.log(`Sending magic link to: ${email}`);
    sendMagicLink(email);
  } catch (error) {
    console.error('Error occurred during the magic link process:', error);
    messageElem.textContent = `Error: ${error.message}`;
  }
});

if (auth.isSignInWithEmailLink(window.location.href)) {
  let email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    email = window.prompt('Please provide your email for confirmation');
  }

  auth.signInWithEmailLink(email, window.location.href)
    .then((result) => {
      window.localStorage.removeItem('emailForSignIn');

      window.location.href = 'success.html';
    })
    .catch((error) => {
      console.error('Error signing in with email link:', error);
      document.getElementById('message').textContent = `Error: ${error.message}`;
    });
}