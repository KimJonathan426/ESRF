from flask import Blueprint, request
from flask_login import login_required, current_user
from flask_wtf.csrf import validate_csrf
from app.api.auth_routes import validation_errors_to_error_messages
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)
from app.forms.player_form import PlayerForm
from app.forms.edit_player_form import EditPlayerForm
from app.forms.edit_player_stat_form import EditPlayerStatForm
from app.models import db, Player, League

player_routes = Blueprint('players', __name__)

@player_routes.route('/league/<int:leagueId>')
@login_required
def league_players(leagueId):
    players = Player.query.filter_by(league_id=leagueId).all()
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

@player_routes.route('/edit/<int:playerId>/stats', methods=['PUT'])
@login_required
def edit_player_stats(playerId):
    form = EditPlayerStatForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editedPlayer = Player.query.get(playerId)
        playersLeague = League.query.get(editedPlayer.league_id)

        fgm = form.data['field_goal_made']
        fga = form.data['field_goal_attempted']
        ftm = form.data['free_throw_made']
        fta = form.data['free_throw_attempted']
        three = form.data['three_point_made']
        ast = form.data['assists']
        reb = form.data['rebounds']
        stl = form.data['steals']
        blk = form.data['blocks']
        to = form.data['turnovers']
        pts = form.data['points']

        fgm_tot = fgm * playersLeague.field_goal_made_weight
        fga_tot = fga * playersLeague.field_goal_attempted_weight
        ftm_tot = ftm * playersLeague.free_throw_made_weight
        fta_tot = fta * playersLeague.free_throw_attempted_weight
        three_tot = three * playersLeague.three_point_made_weight
        ast_tot = ast * playersLeague.assists_weight
        reb_tot = reb * playersLeague.rebounds_weight
        stl_tot = stl * playersLeague.steals_weight
        blk_tot = blk * playersLeague.blocks_weight
        to_tot = to * playersLeague.turnovers_weight
        pts_tot = pts * playersLeague.points_weight

        fantasy_total = fgm_tot + fga_tot + ftm_tot + fta_tot + three_tot + ast_tot + reb_tot + stl_tot + blk_tot + to_tot + pts_tot

        editedPlayer.recent_news = form.data['recent_news']
        editedPlayer.field_goal_made = fgm
        editedPlayer.field_goal_attempted = fga
        editedPlayer.free_throw_made = ftm
        editedPlayer.free_throw_attempted = fta
        editedPlayer.three_point_made = three
        editedPlayer.assists = ast
        editedPlayer.rebounds = reb
        editedPlayer.steals = stl
        editedPlayer.blocks = blk
        editedPlayer.turnovers = to
        editedPlayer.points = pts
        editedPlayer.fantasy_total = fantasy_total

        db.session.commit()

        return editedPlayer.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

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

@player_routes.route('/image/<int:playerId>', methods=['POST'])
@login_required
def upload_player_image(playerId):
    try:
        validate_csrf(request.cookies['csrf_token'])
    except:
        return {'errors': 'Invalid csrf token'}, 400

    if "image" not in request.files:
        return {"errors": "Image Required."}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "Invalid filetype, jpg, jpeg, png, gif only."}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request

    editedPlayer = Player.query.get(playerId)
    editedPlayer.player_image=url
    db.session.commit()

    return editedPlayer.to_dict()
