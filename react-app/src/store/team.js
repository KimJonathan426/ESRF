// Read
const GET_TEAMS = 'teams/GET_TEAMS';

// Create and Edit
const ADD_TEAM = 'teams/ADD_TEAM';

// Delete
const DELETE_TEAM = 'teams/DELETE_TEAM';

// Clear
const CLEAR_TEAMS = 'teams/CLEAR_TEAMS';


// Thunk Action Creators
const actionGetTeams = (teams) => ({
    type: GET_TEAMS,
    teams
})

export const actionAddTeam = (team) => ({
    type: ADD_TEAM,
    team
})

const actionDeleteTeam = (teamId) => ({
    type: DELETE_TEAM,
    teamId
})

export const clearTeams = () => ({
    type: CLEAR_TEAMS
})


// Thunks
export const getAllTeams = (leagueId) => async (dispatch) => {
    const response = await fetch(`/api/leagues/${leagueId}/teams`);

    if (response.ok) {
        const teams = await response.json();
        dispatch(actionGetTeams(teams));
        return teams;
    }
}

export const addTeam = (leagueId, team_owner_id, team_location, team_name, team_abre) => async (dispatch) => {
    const response = await fetch(`/api/leagues/${leagueId}/teams/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            leagueId,
            team_owner_id,
            team_location,
            team_name,
            team_abre
        })
    });

    if (response.ok) {
        const team = await response.json();
        dispatch(actionAddTeam(team));
        return team;
    }
}


// Team Reducer
const TeamsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TEAMS:
            const newState1 = {};
            action.teams.teamsList.forEach(team => {
                newState1[team.team_number] = team;
            });
            return newState1;
        case ADD_TEAM:
            const newState2 = { ...state };
            newState2[action.team.team_number] = action.team;
            return newState2;
        case DELETE_TEAM:
            const newState3 = { ...state };
            delete newState3[action.teamId];
            return newState3;
        case CLEAR_TEAMS:
            const clearState = {};
            return clearState;
        default:
            return state;
    }
}

export default TeamsReducer;
