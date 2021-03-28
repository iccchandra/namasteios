import Contacts from 'react-native-contacts';
import {Platform, PermissionsAndroid} from 'react-native';
import {regex} from "./regex";

function requestContactAccess() {
  return new Promise((resolve, reject) => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Allow Contact Access',
        'message': 'Pray App wants access to your contact for invite to pray.'
      }
    ).then(granted => {
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        resolve(true)
      } else {
        reject(false)
      }
    }).catch(err => {
      reject(false)
    })
  })
}

function checkPermissionInIOS() {
  return new Promise((resolve, reject) => {
    Contacts.checkPermission((err, permission) => {
      if (err) throw err;

      // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
      if (permission === 'undefined') {
        Contacts.requestPermission((err1, permission) => {
          if (err1) throw err1;

          if (permission === 'authorized') {
            resolve(true)
          } else if (permission === 'denied') {
            reject(false)
          }
        })
      } else if (permission === 'authorized') {
        resolve(true)
      } else if (permission === 'denied') {
        reject(false)
      }
    })
  });
}

export function getContacts() {
  return new Promise((resolve, reject) => {
    let permission = Promise.resolve(true);
    if (Platform.OS === 'ios') {
      permission = checkPermissionInIOS()
    }else {
      permission = requestContactAccess()
    }
    return permission.then(() => {
      // regex.showLoader();
      Contacts.getAll((err, contacts) => {
        if (err) throw reject(false);

        resolve(contacts)
      })
    }).catch(error => {
      reject(false);
    })
  });
}
