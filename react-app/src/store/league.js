// Read
const GET_LEAGUES = 'league/GET_LEAGUES';
const GET_SINGLE_LEAGUE = 'league/GET_SINGLE_LEAGUE';

// Create and Edit
const ADD_LEAGUE = 'league/ADD_LEAGUE';

// Delete
const DELETE_LEAGUE = 'league/DELETE_LEAGUE';

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

const actionDeleteLeague = (leagueId) => ({
    type: DELETE_LEAGUE,
    leagueId
})


// Thunks
export const getAllLeagues = () => async (dispatch) => {
    const response = await fetch('/api/leagues/');

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
    else {
        const errors = await response.json();
        return errors
    }
}

export const editLeagueBase = (leagueId, league_name) => async (dispatch) => {
    const response = await fetch(`/api/leagues/edit/${leagueId}/base}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            league_name
        })
    });

    if (response.ok) {
        const league = await response.json();
        dispatch(actionAddLeague(league));
        return league;
    }
}

export const editLeagueScoring = (payload) => async (dispatch) => {
    const leagueId = payload.leagueId;
    const field_goal_made_weight = payload.field_goal_made_weight;
    const field_goal_attempted_weight = payload.field_goal_attempted_weight;
    const free_throw_made_weight = payload.free_throw_made_weight;
    const free_throw_attempted_weight = payload.free_throw_attempted_weight;
    const three_point_made_weight = payload.three_point_made_weight;
    const assists_weight = payload.assists_weight;
    const rebounds_weight = payload.rebounds_weight;
    const steals_weight = payload.steals_weight;
    const blocks_weight = payload.blocks_weight;
    const turnovers_weight = payload.turnovers_weight;
    const points_weight = payload.points_weight;

    const response = await fetch(`/api/leagues/edit/${leagueId}/scoring`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            field_goal_made_weight,
            field_goal_attempted_weight,
            free_throw_made_weight,
            free_throw_attempted_weight,
            three_point_made_weight,
            assists_weight,
            rebounds_weight,
            steals_weight,
            blocks_weight,
            turnovers_weight,
            points_weight
        })
    });

    if (response.ok) {
        const league = await response.json();
        dispatch(actionAddLeague(league));
        return league;
    };
}

export const editLeagueStart = (leagueId, start_date, start_time) => async (dispatch) => {
    const response = await fetch(`/api/leagues/edit/${leagueId}/start`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            start_date,
            start_time
        })
    });

    if (response.ok) {
        const league = await response.json();
        dispatch(actionAddLeague(league));
        return league;
    }
}

export const deleteLeague = (leagueId) => async (dispatch) => {
    const response = await fetch(`/api/leagues/delete/${leagueId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(actionDeleteLeague(leagueId));
        return leagueId;
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
            return newState3;
        case DELETE_LEAGUE:
            const newState4 = { ...state };
            delete newState4[action.leagueId];
            return newState4;
        default:
            return state;
    }
}

export default LeaguesReducer
