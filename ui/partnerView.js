import {model} from './model.js';
import {Store} from './store.js';
import {Controller} from './controller.js';

const store = new Store(model);
const controller = new Controller(store, model);

function buildNavigations() {
    return [
        { title: 'home',   name: 'home',   params: {} },
        { title: 'search', name: 'search', params: {} },
    ];
};

export const PartnerView = {
    data: function(){ return {model: model, store: store} },
    watch: { '$route': 'init' }, // if e.g. user changes it, reload
    created: function() { // this is an example of data fetching aka an angular resolver
        this.$parent.$on("task-created-event", function() {
            controller.loadTasks();
        });
        this.$parent.$on("claim-created-event", function() {
            controller.loadClaims();
        });
        this.init();
    },
    methods: {
        showMenu() { return !this.$q.screen.xs && !this.$q.screen.sm; },
        clearData() {
            var xhr = new XMLHttpRequest();
            xhr.open('DELETE', 'http://localhost:8081/claims/rest/claims', true);
            xhr.send();

            xhr = new XMLHttpRequest();
            xhr.open('DELETE', 'http://localhost:8082/tasks/rest/tasks', true);
            xhr.send();
            console.log("data is being cleared");
        },
        init() {
            this.$q.loading.show();
            var id = this.$route.params.id;
            console.log("loading partner " + id + "...");
            controller.loadClaims();
            controller.loadTasks();
// TODO replace with call to backend services to load model
// TODO also handle errors
            const self = this;
            return new Promise(function (resolve, reject) {
                setTimeout(function() {
                    self.$q.loading.hide();
                    controller.setMenu(buildNavigations());
                    resolve();
                }, 1000);
            });
        }
    },
    // responsive design:
    //   lg:
    //      menu - claim - claim - tasks
    //   md:
    //      menu - claim - tasks
    //   sm:
    //      menu
    //      claim - tasks
    //   xs:
    //      menu
    //      claim
    //      task
    template:
    `
    <div>
        <!-- a ruler for checking responsiveness -->
        <div class="row">
            <ruler/>
        </div>
        <div class="row">
            <div class="col-10" style="padding-top: 20px; text-align: center;">
                <h2><img height="50px" src="skynet.svg" style="vertical-align: middle;">&nbsp;KAYS Insurance Ltd.</h2>
            </div>
            <div class="col-2" style="align: center; z-index=1; padding-top: 20px;">
                <small>
                    <a href='#' @click.prevent="clearData();">clear test data</a>
                    <br>
                    <a href='#' @click.prevent="store.timeTravelBack();">&lt;&lt;</a>
                    time travel
                    <a href='#' @click.prevent="store.timeTravelForward();">&gt;&gt;</a>
                    <br>
                    {{store.getCurrent().timestamp.toISOString()}}
                    <br>
                    Index {{store.getHistory().timeTravelIndex}} of {{store.getHistory().length - 1}}: {{store.getCurrent().message}}
                </small>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <hr>
            </div>
        </div>
        <div v-if="!showMenu()" class="row">
            <div class="col-2" style="">
                <q-btn round color="secondary">
                    <q-icon name="menu" />
                    <q-popover>
                        <navigations :navigations="model.navigations"></navigations>
                    </q-popover>
                </q-btn>
            </div>
        </div>
        <div class="row">
            <div v-if="showMenu()" class="col-3">
                <navigations :navigations="model.navigations"></navigations>
            </div>
            <div class="col-xs-12 col-sm-9 col-md-6">
                <partner :partner="model.partner"></partner>
                <contracts :contracts="model.contracts"></contracts>
                <claims :claims="model.claims"></claims>
            </div>
            <div class="col-xs-12 col-sm-3 col-md-3">
                <tasks :tasks="model.tasks"></tasks>
                <documents></documents>
            </div>
        </div>
    </div>
    `
};
