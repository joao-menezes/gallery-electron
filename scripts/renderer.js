const NOTIFICATION_TITLE = 'Gallery'
const NOTIFICATION_BODY = `The ${NOTIFICATION_TITLE} is ready`
/**
 * const getOnlineStatus = () => {
    document.getElementById('status').innerText = navigator.onLine ? "online" : "offline"
}

window.addEventListener('online', getOnlineStatus)
window.addEventListener('offline', getOnlineStatus)

getOnlineStatus()
 */

new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })