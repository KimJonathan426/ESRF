from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Team

team_routes = Blueprint('teams', __name__)

@team_routes.route('/<int:sessionUserId>/all')
@login_required
def all_my_teams(sessionUserId):
    teams = Team.query.filter_by(team_owner_id=sessionUserId).all()
    return {'teamsList': [team.to_dict_no_players() for team in teams]}
