import { NativeModules, Alert, Platform, PermissionsAndroid } from 'react-native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// const { PushNotificationManager, NotificationPermissionManager } = NativeModules;

export const requestPushNotification = () => {

  if (Platform.OS == 'ios') {
    const { PushNotificationManager } = NativeModules;
    if (PushNotificationManager && typeof PushNotificationManager.showMessage === 'function') {
      PushNotificationManager?.showMessage("Hi");
    } else {

       Toast.show({
              type: ALERT_TYPE.DANGER,
              title: "Error",
              textBody:"PushNotificationManager is not available",
            })
    }
  } else {

    // android
    requestNotificationPermission()
  }

};



const requestNotificationPermission = async () => {
  const { NotificationPermissionManager } = NativeModules;
  try {
    const granted = await NotificationPermissionManager.requestNotificationPermission();
    let title = "", message="",type=ALERT_TYPE.INFO
    if (granted) {
      title ="Success";
      message =  "Push notifications permission granted!",
      type = ALERT_TYPE.SUCCESS
     
    } else {
      title ="Info";
      message = "Notification permission denied, Please allow notifications in Settings.",
      type = ALERT_TYPE.INFO
   
    }

     Toast.show({
            type,
            title,
            textBody: message,
          })
  } catch (error) {

     Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: "Permission request failed, Failed to request permissions.",
          })
  }
 };


