class LoadableData {
    constructor() {
        this.loading = false;
        this.error = null;
    }
}

// ///////////////////////////////////////////////////////////
// initialise structure, because vue needs it to be all
// present so that it can set up observers.
// ///////////////////////////////////////////////////////////
export const model = {
    loading: false,
    partner: new LoadableData(),
    contracts: new LoadableData(),
    claims: new LoadableData(),
    tasks: new LoadableData(),
    navigations: []
};

// ///////////////////////////////////////////////////////////
// initialise data
// ///////////////////////////////////////////////////////////
model.partner.entity = {
        id: 'P-4837-4536',
        name: 'Ant Kutschera',
        address: {
            street: 'Ch. des chiens',
            number: '69',
            zip: '1000',
            city: 'Marbach',
        },
        phone: '+41 77 888 99 00'
    };

model.contracts.entities = [{
       id: 'V-9087-4321',
       title: 'House contents insurance',
       subtitle: 'incl. fire and theft'
    },{
       id: 'V-8046-2304',
       title: 'Main property building insurance',
       subtitle: 'incl. garden'
    }];

model.tasks.entities = [];

// add an rx observable to demonstrate how it can be used in a template
// use BehaviourSubject, so that we can call getValue - see createClaim
model.claims.entities$ = new rxjs.BehaviorSubject();