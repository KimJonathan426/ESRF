from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.player_form import PlayerForm
from app.forms.edit_player_form import EditPlayerForm
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

@player_routes.route('/edit/<int:playerId>', methods=['PUT'])
@login_required
def edit_player(playerId):
    form = EditPlayerForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editedPlayer = Player.query.get(playerId)

        editedPlayer.player_name = form.data['player_name']
        editedPlayer.position = form.data['position']
        editedPlayer.team = form.data['team']
        editedPlayer.bio = form.data['bio']

        db.session.commit()

        return editedPlayer.to_dict()
    return {'errors':validation_errors_to_error_messages(form.errors)}, 401

@player_routes.route('/delete', methods=['DELETE'])
@login_required
def delete_player():
    totalPlayers = int(request.form.get('totalPlayers'))

    if (totalPlayers <= 10):
        return {'errors': 'Cannot delete player, league must have a minimum of 10 players.'}, 400

    deleted_player = Player.query.get(request.form.get('playerId'))

    db.session.delete(deleted_player)
    db.session.commit()

    return request.form.get('playerId')
