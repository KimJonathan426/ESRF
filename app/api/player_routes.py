from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Player

player_routes = Blueprint('players', __name__)

@player_routes.route('/league/<int:leagueId>')
@login_required
def league_players(leagueId):
    players = Player.query.filter_by(league_id=leagueId).all()
    print('players', players)
    return {'playerList': [player.to_dict() for player in players]}

# @player_routes.route('/new', methods=['POST'])
# @login_required
# def add_player():
#     leagueId = request.form.get('leagueId')
#     print('leagueId', leagueId)
