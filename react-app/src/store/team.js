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

// export const editPlayerInfo = (playerId, player_name, position, team, bio) => async (dispatch) => {
//     const response = await fetch(`/api/players/edit/${playerId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             player_name,
//             position,
//             team,
//             bio
//         })
//     });

//     if (response.ok) {
//         const player = await response.json();
//         dispatch(actionAddPlayer(player));
//         return player;
//     }
//     else {
//         const errors = await response.json();
//         return errors
//     }
// }

// export const editPlayerStats = (payload) => async (dispatch) => {
//     const playerId = payload.playerId;
//     const recent_news = payload.recent_news;
//     const field_goal_made = payload.field_goal_made;
//     const field_goal_attempted = payload.field_goal_attempted;
//     const free_throw_made = payload.free_throw_made;
//     const free_throw_attempted = payload.free_throw_attempted;
//     const three_point_made = payload.three_point_made;
//     const assists = payload.assists;
//     const rebounds = payload.rebounds;
//     const steals = payload.steals;
//     const blocks = payload.blocks;
//     const turnovers = payload.turnovers;
//     const points = payload.points;

//     const response = await fetch(`/api/players/edit/${playerId}/stats`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             recent_news,
//             field_goal_made,
//             field_goal_attempted,
//             free_throw_made,
//             free_throw_attempted,
//             three_point_made,
//             assists,
//             rebounds,
//             steals,
//             blocks,
//             turnovers,
//             points
//         })
//     });

//     if (response.ok) {
//         const player = await response.json();
//         dispatch(actionAddPlayer(player));
//         return null;
//     } else if (response.status < 500) {
//         const data = await response.json();
//         if (data.errors) {
//             return data.errors;
//         }
//     } else {
//         return ['An error occurred. Please try again.']
//     }
// }

// export const deletePlayer = (formData) => async (dispatch) => {
//     const response = await fetch(`/api/players/delete`, {
//         method: 'DELETE',
//         body: formData
//     });

//     if (response.ok) {
//         const playerId = await response.json();
//         dispatch(actionDeletePlayer(playerId));
//     } else {
//         const errors = await response.json();
//         return errors;
//     }
// }


// Team Reducer
const TeamsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TEAMS:
            const newState1 = {};
            action.teams.forEach(team => {
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
