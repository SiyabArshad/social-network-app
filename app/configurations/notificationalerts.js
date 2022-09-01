
async function sendPushNotification(expoPushToken,data) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'FIYR Notification',
      body: data,
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

  }
  
  //end

  export default sendPushNotification