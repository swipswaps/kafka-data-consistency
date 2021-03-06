Vue.component('tasks', {
    props: ['tasks'],
    template: `
        <div id="tasks" class="tile-group">
            Tasks<br>
            <div v-if="tasks.error" class="row">
                <q-banner type="warning" class="q-mb-sm" icon="priority_high">
                    {{tasks.error}}
                </q-banner>
            </div>
            <div v-else-if="tasks.loading" class="row"><q-spinner-hourglass size="32px"/></div>
            <div v-else-if="tasks.entities.length === 0" class="row"><i>No tasks</i></div>
            <div v-else class="row">
                <div v-for="task in tasks.entities">
                    <div class="tile">
                        <div class='tile-title'><i class='fas fa-tasks'></i>&nbsp;Task</div>
                        <div class='tile-body'>{{task}}</div>
                    </div>
                </div>
            </div>
        </div>
    `
});
