from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Team

team_routes = Blueprint('teams', __name__)

@team_routes.route('/<int:teamId>')
@login_required
def user_teams(teamId):
    team = Team.query.get(teamId)
    return team.to_dict()

@team_routes.route('/league/<int:leagueId>')
@login_required
def league_teams(leagueId):
    teams = Team.query.filter_by(id=leagueId).all()
    return {'teamList': [team.to_dict() for team in teams]}

@team_routes.route('/user')
@login_required
def user_teams():
    teams = Team.query.filter_by(team_owner_id=current_user.id).all()
    return {'teamList': [team.to_dict() for team in teams]}
