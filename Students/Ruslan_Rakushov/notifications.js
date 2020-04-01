// Кнопка подписки/отписки для push-уведомлений
var pushElement = document.querySelector('.push');
var pushImgElement = document.querySelector('.push__image');
var pushIcon = document.querySelector('.push-icon');

// Проверяем, поддерживаются ли push-уведомления
function isPushSupported() {
  // Разрешил ли пользователь отправлять push-уведомления
  if (Notification.permission === 'denied') {
    alert('Вы заблокировали push-уведомления');
    return;
  }
 
  // Поддерживаются ли push-уведомления браузером пользователя
  if (!('PushManager' in window)) {
    alert('Извините, push-уведомления не поддерживаются вашим браузером.');
    return;
  }
 
  // Если service-worker зарегистрирован,
  // проверяем, подписан ли пользователь на push-уведомления,
  // и выставляем соответствующий status
  navigator.serviceWorker.ready
    .then(function (registration) {
      registration.pushManager.getSubscription()
      .then(function (subscription) {
        if (subscription) {
          changePushStatus(true);
        }
        else {
          changePushStatus(false);
        }
      })
      .catch(function (error) {
        console.error('Возникла ошибка', error);
      });
    });
 }
 
 // Предлагаем пользователю подписаться на push-уведомления
function subscribePush() {
  navigator.serviceWorker.ready.then(function(registration) {
    if (!registration.pushManager) {
      alert('push-уведомления не поддерживаются вашим браузером.');
      return false;
    }
 
    // Подписываемся
    registration.pushManager.subscribe({
      userVisibleOnly: true, // Всегда показывать уведомления
      applicationServerKey:
        // btoa(
        // 'BH7c-cmi9Fc-DNy4F-X889svS3OFkg27TLsMyb60dDfeOospGoa6NuSfECd5bVoMgw1VL-YkvDTxpjR-enKfs-g' //https://web-push-codelab.glitch.me
        'BKDoaxn7soO1KPSJUFvb9Xrs4HEbjIj7n7RdsU3NHIXTNEm5ef9gKDbyjfLVO2_2fDlCpq35jZH9U7Ziefjw4P0' // firebase.google.com
      // ),
    })
    .then(function (subscription) {
      alert('Успешно подписаны.');
      console.info('Подписаны на push-уведомления.');
      console.log(subscription);
      console.log('endpoint', subscription.endpoint);
      changePushStatus(true);
    })
    .catch(function (error) {
      changePushStatus(false);
      console.error('Ошибка подписки на push-уведомления: ', error);
    });
  })
 }
 
 // Отписка от push-уведомлений
function unsubscribePush() {
  navigator.serviceWorker.ready
  .then(function(registration) {
    registration.pushManager.getSubscription()
    .then(function (subscription) {
      // Если подписки нет, то выходим
      if(!subscription) {
        alert('Невозможно отписаться от push-уведомлений.');
        return;
      }
 
      // Непосредственно отписка
      subscription.unsubscribe()
        .then(function () {
          alert('Успешно отписаны.');
          console.info('push-уведомлений отменены.');
          console.log(subscription);
          changePushStatus(false);
        })
        .catch(function (error) {
          console.error(error);
        });
    })
    .catch(function (error) {
      console.error('Не получилось отписаться от push-уведомлений.');
    });
  })
 }

 // Изменение статуса (подписан/не подписан)
function changePushStatus(status) {
  pushElement.dataset.checked = status;
  pushElement.checked = status;
  if (status) {
    pushElement.classList.add('active');
    // pushImgElement.src = './assets/PushToggle/notifications_active-24px.svg';
  }
  else {
   pushElement.classList.remove('active');
  //  pushImgElement.src = './assets/PushToggle/notifications_none-24px.svg';
  }
 }
 
 // Обработка нажатия на кнопку подписки/отписки
pushElement.addEventListener('click', function () {
  var isSubscribed = (pushElement.dataset.checked === 'true');
  if (isSubscribed) {
    unsubscribePush();
  }
  else {
    subscribePush();
  }
});
 