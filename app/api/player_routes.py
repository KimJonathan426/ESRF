from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Player

team_routes = Blueprint('players', __name__)

@team_routes.route('/league/<int:leagueId>')
@login_required
def league_players(leagueId):
    players = Player.query.filter_by(league_id=leagueId).all()
    return {'playerList': [player.to_dict() for player in players]}

@team_routes.route('/<int:playerId>')
@login_required
def player(playerId):
    player = Player.query.get(playerId)
    return player.to_dict()
