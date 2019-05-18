import firebase from 'react-native-firebase';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILD, REGISTER_FAILD, REGISTER_START, REGISTER_SUCCESS } from './types';

export const login = (email, password) => {
    return (dispatch) => {
        if (email !== '' && password !== '') {
            dispatch({ type: LOGIN_START });
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => {
                    console.log("Başarılı: ", user);
                    Actions.main({ type: 'reset' });
                    dispatch({ type: LOGIN_SUCCESS });
                }).catch(error => {
                    console.log("Hatalı: ", error);
                    Alert.alert("Giriş başarısız!");
                    dispatch({ type: LOGIN_FAILD });
                });
        } else {
            Alert.alert('Lütfen bütün alanları doldurunuz!');
        }
    }
}

export const register = (username, email, password) => {
    return (dispatch) => {
        if (email !== '' && password !== '' && username !== '') {
            if (password.length >= 6) {
                dispatch({ type: REGISTER_START });
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => {
                        console.log("Başarılı: ", user);
                        dispatch({ type: REGISTER_SUCCESS });

                        //DB 'ye veri yazma
                        const uid = user.user._user.uid;
                        firebase.firestore().collection("users")
                        .doc(uid)
                        .set({ username, email, password })
                        .then(success => {
                            console.log('Kayıt başarılı!');
                        })
                        .catch(error => {
                            console.log('Kayıt başarısız: ', error);
                        });
                        Actions.main({ type: 'reset' });
                    }).catch(error => {
                        console.log("Hatalı: ", error);
                        dispatch({ type: REGISTER_FAILD });
                    });
            }else{
                Alert.alert("En az 6 karakterli parola giriniz!");
            }
        } else {
            Alert.alert('Lütfen bütün alanları doldurunuz!');
        }
    }
}