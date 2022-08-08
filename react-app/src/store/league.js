// Read
const GET_LEAGUES = 'league/GET_LEAGUES';
const GET_SINGLE_LEAGUE = 'league/GET_SINGLE_LEAGUE';

// Create
const ADD_LEAGUE = 'league/ADD_LEAGUE'


// Thunk Action Creators
const actionGetLeagues = (leagues) => ({
    type: GET_LEAGUES,
    leagues
})

const actionGetSingleLeague = (league) => ({
    type: GET_SINGLE_LEAGUE,
    league
})

const actionAddLeague = (league) => ({
    type: ADD_LEAGUE,
    league
})


// Thunks
export const getAllLeagues = () => async (dispatch) => {
    const response = await fetch('api/leagues/');

    if (response.ok) {
        const leagues = await response.json();
        dispatch(actionGetLeagues(leagues));
        return leagues;
    }
}

export const getSingleLeague = (leagueId) => async (dispatch) => {
    const response = await fetch(`/api/leagues/${leagueId}`);

    if (response.ok) {
        const league = await response.json();
        dispatch(actionGetSingleLeague(league));
        return league;
    }
}

export const addLeague = (league_name, team_limit, team_player_limit) => async (dispatch) => {
    const response = await fetch('/api/leagues/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            league_name,
            team_limit,
            team_player_limit
        })
    });

    if (response.ok) {
        const league = await response.json();
        dispatch(actionAddLeague(league));
        return league;
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
        case GET_SINGLE_LEAGUE:
            const newState2 = {};
            newState2[action.league.id] = action.league;
            return newState2;
        case ADD_LEAGUE:
            const newState3 = { ...state };
            newState3[action.league.id] = action.league;
            return newState3
        default:
            return state;
    }
}

export default LeaguesReducer
