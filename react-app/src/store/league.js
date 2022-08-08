// Read
const GET_LEAGUES = 'league/GET_LEAGUES';


// Thunk Action Creators
const actionGetLeagues = (leagues) => ({
    type: GET_LEAGUES,
    leagues
})


// Thunks
export const getAllLeagues = () => async (dispatch) => {
    const response = await fetch(`api/leagues/`);

    if (response.ok) {
        const leagues = await response.json();
        dispatch(actionGetLeagues(leagues));
        return leagues
    }
}


// League Reducer
const LeaguesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_LEAGUES:
            const newState1 = {};
            action.leagues.leagueList.forEach(league => {
                newState1[league.id] = league;
            })
            return newState1
        default:
            return state;
    }
}

export default LeaguesReducer
