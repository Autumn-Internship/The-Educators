import startup from './capture-photo.js';
import getEmotions from './callApi.js';
import generateEquation from './gameApp.js';

let encodedImage = null;

let nbOfClick = 0;

const tryAgainAudio = document.getElementById('try_again_audio');
const resultFromEcuation = document.querySelector('.result');

let answer = generateEquation();

const takePicture = () => {
    startup().then((res) => {
        encodedImage = res;
        getEmotions(encodedImage).then((emo) => {
            saveEmotionDb(emo);
        });
    });
};

document.querySelectorAll('.option').forEach((option) => {
    option.addEventListener('click', (event) => {
        if (nbOfClick === 0) {
            takePicture();
        }
        nbOfClick++;

        if (event.target.textContent == answer) {
            document.getElementsByClassName('equation')[0].style.backgroundColor = '#38b000';

            document.getElementById('happyKidImage').classList.add('active');
            resultFromEcuation.innerHTML = answer;
            setTimeout(() => {
                answer = generateEquation();
            }, 4000);
        } else {
            document.getElementsByClassName('equation')[0].style.backgroundColor = '#e01e37';
            
            document.getElementById('sadKidImage').classList.add('active');
            setTimeout(() => {
                document.getElementsByClassName('equation')[0].style.backgroundColor = 'white';
                document
                    .getElementById('sadKidImage')
                    .classList.remove('active');
            }, 4000);
            tryAgainAudio.play();
        }
    });
});

const logoutButtonKid = document.getElementById('nav-logout');

logoutButtonKid.addEventListener('click', (e) => {
    firebase.auth().signOut();

    window.location.href = '/src/pages/login/login.html';
});

const localStorageApiKey =
    'firebase:authUser:AIzaSyBt8tU1vFP5Y68gkLd5_ODlIybTtE7Iqnc:[DEFAULT]';

const localStorageValue = JSON.parse(localStorage.getItem(localStorageApiKey));
const userID = localStorageValue.uid;

function saveEmotionDb(emotion) {
    db.collection('kidEmotions')
        .doc(userID)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return doc.data().emotions;
            } else {
                db.collection('kidEmotions')
                    .doc(userID)
                    .set({
                        emotions: []
                    })
                    .then(() => {
                        return doc.data().emotions;
                    });
            }
        })
        .then((emotionArray) => {
            emotionArray.push(emotion);
            db.collection('kidEmotions').doc(userID).set({
                emotions: emotionArray
            });
        });
}
