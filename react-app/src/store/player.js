// Read
const GET_PLAYERS = 'players/GET_PLAYERS';

// Create and Edit
const ADD_PLAYER = 'players/ADD_PLAYER';

// Delete
const DELETE_PLAYER = 'players/DELETE_PLAYER';

// Clear
const CLEAR_PLAYERS = 'players/CLEAR_PLAYERS';


// Thunk Action Creators
const actionGetPlayers = (players) => ({
    type: GET_PLAYERS,
    players
})

const actionAddPlayer = (player) => ({
    type: ADD_PLAYER,
    player
})

const actionDeletePlayer = (playerId) => ({
    type: DELETE_PLAYER,
    playerId
})

export const clearPlayers = () => ({
    type: CLEAR_PLAYERS
})


// Thunks
export const getAllPlayers = (leagueId) => async (dispatch) => {
    const response = await fetch(`/api/players/league/${leagueId}`);

    if (response.ok) {
        const players = await response.json();
        dispatch(actionGetPlayers(players));
        return players;
    }
}

export const addPlayer = (league_id, player_name, position, team, bio) => async (dispatch) => {
    const response = await fetch('/api/players/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            league_id,
            player_name,
            position,
            team,
            bio
        })
    });

    if (response.ok) {
        const player = await response.json();
        dispatch(actionAddPlayer(player));
        return player;
    }
}

export const editPlayerInfo = (playerId, player_name, position, team, bio) => async (dispatch) => {
    const response = await fetch(`/api/players/edit/${playerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            player_name,
            position,
            team,
            bio
        })
    });

    if (response.ok) {
        const player = await response.json();
        dispatch(actionAddPlayer(player));
        return player;
    }
}

export const deletePlayer = (formData) => async (dispatch) => {
    const response = await fetch(`/api/players/delete`, {
        method: 'DELETE',
        body: formData
    });

    if (response.ok) {
        const playerId = await response.json();
        dispatch(actionDeletePlayer(playerId));
    } else {
        const error = await response.json();
        return error;
    }
}


// Player Reducer
const PlayersReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PLAYERS:
            const newState1 = {};
            action.players.playerList.forEach(player => {
                newState1[player.id] = player;
            });
            return newState1;
        case ADD_PLAYER:
            const newState2 = { ...state };
            newState2[action.player.id] = action.player;
            return newState2;
        case DELETE_PLAYER:
            const newState3 = { ...state };
            delete newState3[action.playerId];
            return newState3;
        case CLEAR_PLAYERS:
            const clearState = {};
            return clearState;
        default:
            return state;
    }
}

export default PlayersReducer;
