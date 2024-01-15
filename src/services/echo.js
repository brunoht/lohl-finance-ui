import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

const echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_ECHO_KEY,
    wsHost: import.meta.env.VITE_ECHO_WS_HOST,
    wsPort: import.meta.env.VITE_ECHO_WS_PORT,
    cluster: import.meta.env.VITE_ECHO_CLUSTER,
    forceTLS: import.meta.env.VITE_ECHO_TLS === 'true',
    disableStats: import.meta.env.VITE_ECHO_DISABLE_STATS === 'true',
});

export default echo