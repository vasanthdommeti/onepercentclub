import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";

PushNotification.configure({
    onNotification: function (notification) {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    requestPermissions: Platform.OS === 'ios'
});

export const sendNotification = (title, message) => {
    PushNotification.localNotification({
        title: title,
        message: message,
    });
};
