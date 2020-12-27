    // Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyCTAmW4wRqhfAn4uk-wRH5ZXvFL9BVdAVg",
        authDomain: "magang-c4538.firebaseapp.com",
        databaseURL: "https://magang-c4538-default-rtdb.firebaseio.com",
        projectId: "magang-c4538",
        storageBucket: "magang-c4538.appspot.com",
        messagingSenderId: "1037844923194",
        appId: "1:1037844923194:web:d45ddba31f94eb180ac603",
        measurementId: "G-TNS8LQD8BS"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const auth = firebase.auth();
    var user = firebase.auth().currentUser;

    //index
    //get elements 
    const textEmail = document.getElementById("email_champ");
    const textPassword = document.getElementById("motdepasse_champ");
    const btnLogin = document.getElementById("btnLogin");
    const btnSignUp = document.getElementById("btnSignUp");
    const btnLogout = document.getElementById("btnLogout");

    //connexion d'un utilisateur déjà inscrit
    function signIn() {
        var userEmail = document.getElementById("email_champ").value;
        var userPass = document.getElementById("motdepasse_champ").value;

        firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
            .then((user) => {
                window.location.replace("./profile.html");
            })
            .catch(function(error) {
                var errorMessage = "Votre email ou mot de passe n'existe pas";
                window.alert("Error : " + errorMessage);
            });
    }
    //index
    //déconnection
    function logout() {
        auth.signOut();
        window.location.replace("./index.html");
    }
    // formulaire inscription
    function submitForm() {
        getChecksValuesActivities();
        getConfidRadio();
        // uploadImage();
        // Get values
        var email = getInputVal('email_champ');
        var motdepasse = getInputVal('motdepasse_champ');
        var nom = getInputVal('nom_champ');
        var prenom = getInputVal('prenom_champ');
        var adresse = getInputVal('adresse_champ');
        var ville = getInputVal('ville_champ');
        var cp = getInputVal('cp_champ');
        var cheminPhoto = getInputVal('cheminPhoto_champ');
        var checkedActivities = getChecksValuesActivities();
        var confidentialité = getConfidRadio();


        // function uploadImage() {

        //     const ref = firebase.storage().ref('users');
        //     const file = document.querySelector("#cheminPhoto_champ").files[0];
        //     const name = +new Date() + "-" + file.name;
        //     const metadata = {
        //         contentType: file.type
        //     };
        //     const task = ref.child(name).put(file, metadata);
        //     task
        //         .then(snapshot => snapshot.ref.getDownloadURL())
        //         .then(url => {
        //             var img = document.getElementById('img');
        //             img.src = url;
        //         })
        //         .catch(console.error);
        // }

        function getChecksValuesActivities() {
            var checks = document.getElementsByClassName('checks');
            var str = '';

            for (i = 0; i < 8; i++) {
                if (checks[i].checked === true) {
                    str += checks[i].value + " ";
                }
            }
            return str;
        }

        function getConfidRadio() {
            var radio = document.getElementsByClassName('radio');
            var str = '';

            for (i = 0; i < 2; i++) {
                if (radio[i].checked === true) {
                    str += radio[i].value + " ";
                }
            }
            return str;
        }

        // Clear form
        document.getElementById('contactForm').reset();

        firebase.auth().createUserWithEmailAndPassword(email, motdepasse).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var firebaseRef = firebase.database().ref('users');
            var userData = {
                email: email,
                motdepasse: motdepasse,
                nom: nom,
                prenom: prenom,
                adresse: adresse,
                ville: ville,
                cp: cp,
                cheminPhoto: cheminPhoto,
                checkedActivities: checkedActivities,
                confidentialité: confidentialité,
            }
            firebaseRef.child(uid).set(userData);
            document.querySelector('.alert').style.display = 'block';

            setTimeout(function() {
                window.location.replace("./profile.html");
            }, 1000)
        });
    }

    // Function to get get form values
    function getInputVal(id) {
        return document.getElementById(id).value;
    }


    //profil
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            //   User is signed in.
            let user = firebase.auth().currentUser;
            let uid

            if (user != null) {
                uid = user.uid;
            }

            // task
            //     .then(snapshot => snapshot.ref.getDownloadURL())
            //     .then(url => {
            //         alert(url);
            //         img.src = url;
            //     })
            //     .catch(console.error);

            let firebaseRefKey = firebase.database().ref('users').child(uid);
            firebaseRefKey.on('value', (dataSnapShot) => {
                document.getElementById("userNom").innerHTML = dataSnapShot.val().nom;
                document.getElementById("userPrenom").innerHTML = dataSnapShot.val().prenom;
                document.getElementById("userAdresse").innerHTML = dataSnapShot.val().adresse;
                document.getElementById("userCP").innerHTML = dataSnapShot.val().cp;;
                document.getElementById("userVille").innerHTML = dataSnapShot.val().ville;
            })
        }
    });


    // function getProfilPicture() {
    //     let img = document.getElementById("img");
    //     const ref = firebase.storage().ref('users');
    //     const file = document.querySelector("#cheminPhoto_champ").files[0];
    //     let name = +new Date() + "-" + file.name;
    //     const metadata = {
    //         contentType: file.type
    //     };
    //     const task = ref.child(name).put(file, metadata);
    //     task
    //         .then(snapshot => snapshot.ref.getDownloadURL())
    //         .then(url => {
    //             // alert(url);
    //             img.src = url;
    //         })
    //         .catch(console.error);
    // }