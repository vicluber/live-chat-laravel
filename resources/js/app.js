require('./bootstrap');
window.Vue = require('vue');
Vue.component('chat-messages', require('./components/ChatMessages.vue').default);
Vue.component('chat-form', require('./components/ChatForm.vue').default);
import Vue from 'vue';
const app = new Vue({
    el: '#app',

    data: {
        messages: []
    },

    created() {
        this.fetchMessages();
        Echo.private('chat').listen('MessageSent', (e) => {
            this.messages.push({
              message: e.message.message,
              user: e.user
            });
        });
    },

    methods: {
        fetchMessages() {
            axios.get('/messages').then(response => {
                this.messages = response.data;
            });
        },

        addMessage(message) {
            this.messages.push(message);
            axios.post('/messages', message).then(response => {
              console.log(response.data);
            });
            var container = this.$el.querySelector("#chat-panel");
            container.scrollTop = container.scrollHeight;
        }
    }
});
