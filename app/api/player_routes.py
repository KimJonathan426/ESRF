from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.player_form import PlayerForm
from app.models import db, Player

player_routes = Blueprint('players', __name__)

@player_routes.route('/league/<int:leagueId>')
@login_required
def league_players(leagueId):
    players = Player.query.filter_by(league_id=leagueId).all()
    print('players', players)
    return {'playerList': [player.to_dict() for player in players]}

@player_routes.route('/new', methods=['POST'])
@login_required
def add_player():
    form = PlayerForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        player = Player(
            league_id = form.data['league_id'],
            player_name = form.data['player_name'],
            position = form.data['position'],
            team = form.data['team'],
            bio = form.data['bio']
        )

        db.session.add(player)
        db.session.commit()

        return player.to_dict()
    return {'errors':validation_errors_to_error_messages(form.errors)}, 401
