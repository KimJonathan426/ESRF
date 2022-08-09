// Read
const GET_PLAYERS = 'player/GET_PLAYERS';


// Thunk Action Creators
const actionGetPlayers = (players) => ({
    type: GET_PLAYERS,
    players
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



// Player Reducer
const PlayersReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PLAYERS:
            const newState1 = {};
            action.players.playerList.forEach(player => {
                newState1[player.id] = player;
            });
            return newState1;
        default:
            return state;
    }
}

export default PlayersReducer;
