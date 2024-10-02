// Firebase config (if not initialized already)
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
  
  auth.onAuthStateChanged((user) => {
    if (user) {
      document.getElementById('userEmail').textContent = `Logged in as: ${user.email}`;
    } else {
      window.location.href = 'index.html';
    }
  });
  
  document.getElementById('logoutButton').addEventListener('click', () => {
    auth.signOut()
      .then(() => {
        window.location.href = 'index.html';
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  });
  