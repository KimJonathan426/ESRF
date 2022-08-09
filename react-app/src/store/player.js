// Read
const GET_PLAYERS = 'player/GET_PLAYERS';
const GET_SINGLE_PLAYER = 'player/GET_SINGLE_PLAYER';


// Thunk Action Creators
const actionGetPlayers = (players) => ({
    type: GET_PLAYERS,
    players
})

const actionGetSinglePlayer = (player) => ({
    type: GET_SINGLE_PLAYER,
    player
})


// Thunks
export const getAllPlayers = (leagueId) => async (dispatch) => {
    const response = await fetch(`/api/players/league/${leagueId}`)

    if (response.ok) {
        const players = await response.json();
        dispatch(actionGetPlayers(players));
        return players;
    }
}

export const getSinglePlayer = (playerId) => async (dispatch) => {
    const response = await fetch(`/api/players/${playerId}`)

    if (response.ok) {
        const player = await response.json();
        dispatch(actionGetSinglePlayer(player));
        return player;
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
        case GET_SINGLE_PLAYER:
            const newState2 = {};
            newState2[action.player.id] = action.player;
            return newState2;
        default:
            return state;
    }
}

export default PlayersReducer;
