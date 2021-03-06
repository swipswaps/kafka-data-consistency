(function(){
//////////////////////////////////////////////////////////////////////////////////////////////
// test functionality allowing the user to select their identity
//////////////////////////////////////////////////////////////////////////////////////////////
const template =
`
        User: <p-dropdown :options="users"
                          v-model="user"
                          option-label="name"
                          @change="userChanged()">
              </p-dropdown>
` // end template


window.LOGGED_IN = "loggedIn"; // emitted by security after a login

let user = users[1];
security.login$(user.un, user.password);

window.mfUsers = {
    template,
    props: ['users'],
    data() {
        return {
            user
        }
    },
    methods: {
        userChanged() {
            security.login$(this.user.un, this.user.password);
        }
    },
    components: {
        'p-dropdown': dropdown
    }
};

})();
