const SET_RUNNING_STATE = 'scratch-gui/vm-status/SET_RUNNING_STATE';
const SET_PAUSED_STATE = 'scratch-gui/vm-status/SET_PAUSED_STATE';
const SET_TURBO_STATE = 'scratch-gui/vm-status/SET_TURBO_STATE';
const SET_STARTED_STATE = 'scratch-gui/vm-status/SET_STARTED_STATE';

const initialState = {
    running: false,
    paused: false,
    started: false,
    turbo: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_STARTED_STATE:
        return Object.assign({}, state, {
            started: action.started
        });
    case SET_RUNNING_STATE:
        return Object.assign({}, state, {
            running: action.running
        });
    case SET_PAUSED_STATE:
        return Object.assign({}, state, {
            paused: action.paused
        });
    case SET_TURBO_STATE:
        return Object.assign({}, state, {
            turbo: action.turbo
        });
    default:
        return state;
    }
};

const setStartedState = function (started) {
    return {
        type: SET_STARTED_STATE,
        started: started
    };
};

const setPausedState = function (paused) {
    return {
        type: SET_PAUSED_STATE,
        paused: paused
    };
};


const setRunningState = function (running) {
    return {
        type: SET_RUNNING_STATE,
        running: running
    };
};

const setTurboState = function (turbo) {
    return {
        type: SET_TURBO_STATE,
        turbo: turbo
    };
};

export {
    reducer as default,
    initialState as vmStatusInitialState,
    setRunningState,
    setPausedState,
    setStartedState,
    setTurboState
};
