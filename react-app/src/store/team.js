// Read
const GET_TEAMS = 'teams/GET_TEAMS';
const GET_SINGLE_TEAM = 'teams/GET_SINGLE_TEAM';

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

const actionGetSingleTeam = (team) => ({
    type: GET_SINGLE_TEAM,
    team
})

export const actionAddTeam = (team) => ({
    type: ADD_TEAM,
    team
})

const actionDeleteTeam = (teamNumber) => ({
    type: DELETE_TEAM,
    teamNumber
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

export const getSingleTeam = (leagueId, teamNumber) => async (dispatch) => {
    const response = await fetch(`/api/leagues/${leagueId}/teams/${teamNumber}`);

    if (response.ok) {
        const team = await response.json();
        dispatch(actionGetSingleTeam(team));
        return team;
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

export const editTeamInfo = (leagueId, teamNumber, team_location, team_name, team_abre) => async (dispatch) => {
    const response = await fetch(`/api/leagues/${leagueId}/teams/${teamNumber}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
    else {
        const errors = await response.json();
        return errors
    }
}

export const deleteTeam = (leagueId, teamNumber) => async (dispatch) => {
    const response = await fetch(`/api/leagues/${leagueId}/teams/${teamNumber}/delete`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(actionDeleteTeam(teamNumber));
        return teamNumber;
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
        case GET_SINGLE_TEAM:
            const newState2 = {};
            newState2[action.team.team_number] = action.team;
            return newState2;
        case ADD_TEAM:
            const newState3 = { ...state };
            newState3[action.team.team_number] = action.team;
            return newState3;
        case DELETE_TEAM:
            const newState4 = { ...state };
            delete newState4[action.teamNumber];
            return newState4;
        case CLEAR_TEAMS:
            const clearState = {};
            return clearState;
        default:
            return state;
    }
}

export default TeamsReducer;
