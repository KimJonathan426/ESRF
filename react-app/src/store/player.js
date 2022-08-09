// Read
const GET_PLAYERS = 'player/GET_PLAYERS';

// Create and Edit
const ADD_PLAYER = 'player/ADD_PLAYER';

// Delete
const DELETE_PLAYER = 'player/DELETE_PLAYER';


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

export const deletePlayer = (playerId) => async (dispatch) => {
    const response = await fetch(`/api/players/${playerId}/delete`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(actionDeletePlayer(playerId));
        return playerId;
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
        default:
            return state;
    }
}

export default PlayersReducer;
