import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

// const echo = new Echo({
//     broadcaster: 'pusher',
//     key: '2c59acd064e79eed07f3',
//     cluster: 'us2',
//     forceTLS: true
// });

const echo = new Echo({
    broadcaster: 'pusher',
    key: '2c59acd064e79eed07f3',
    wsHost: 'localhost',
    wsPort: '6001',
    cluster: 'us2',
    forceTLS: false,
    disableStats: true,
});

export default echo