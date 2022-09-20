from flask import Blueprint, request
from flask_login import login_required, current_user
from flask_wtf.csrf import validate_csrf
from app.api.auth_routes import validation_errors_to_error_messages
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)
from random import sample
from app.forms.base_league_form import BaseLeagueForm
from app.forms.league_edit_form import LeagueEditForm
from app.forms.league_scoring_form import LeagueScoringForm
from app.forms.league_start_form import LeagueStartForm
from app.forms.league_note_form import LeagueNoteForm
from app.models import db, League, Player

league_routes = Blueprint('leagues', __name__)

@league_routes.route('/')
@login_required
def leagues():
    leagues = League.query.all()
    return {'leagueList': [league.to_dict() for league in leagues]}

@league_routes.route('/<int:leagueId>')
@login_required
def single_league(leagueId):
    league = League.query.get(leagueId)
    return league.to_dict()

@league_routes.route('/owner/<int:ownerId>')
@login_required
def my_leagues(ownerId):
    leagues = League.query.filter_by(owner_id=ownerId).all()
    return {'leagueList': [league.to_dict() for league in leagues]}

@league_routes.route('/public/<int:userId>')
@login_required
def public_leagues(userId):
    leagues = League.query.filter(League.owner_id!=userId).all()

    random_leagues = []
    if (len(leagues) > 11):
        random = sample(range(0, len(leagues)), 10)

        for index in random:
            random_leagues.append(leagues[index])

    if (random_leagues):
        return {'leagueList': [league.to_dict() for league in random_leagues]}

    return {'leagueList': [league.to_dict() for league in leagues]}

@league_routes.route('/new', methods=['POST'])
@login_required
def create_league():
    form = BaseLeagueForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        league = League(
            owner_id = current_user.id,
            league_name = form.data['league_name'],
            team_limit = form.data['team_limit'],
            team_player_limit = form.data['team_player_limit']
        )

        db.session.add(league)
        db.session.commit()

        return league.to_dict()
    return {'errors':validation_errors_to_error_messages(form.errors)}, 401

@league_routes.route('/edit/<int:leagueId>/base', methods=['PUT'])
@login_required
def edit_base(leagueId):
    form = LeagueEditForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editedLeague = League.query.get(leagueId)

        editedLeague.league_name=form.data['league_name']
        db.session.commit()

        return editedLeague.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@league_routes.route('/edit/<int:leagueId>/scoring', methods=['PUT'])
@login_required
def edit_scoring(leagueId):
    form = LeagueScoringForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editedLeague = League.query.get(leagueId)
        editedPlayers = Player.query.filter_by(league_id=leagueId).all()

        fgm_w = form.data['field_goal_made_weight']
        fga_w = form.data['field_goal_attempted_weight']
        ftm_w = form.data['free_throw_made_weight']
        fta_w = form.data['free_throw_attempted_weight']
        three_w = form.data['three_point_made_weight']
        ast_w = form.data['assists_weight']
        reb_w = form.data['rebounds_weight']
        stl_w = form.data['steals_weight']
        blk_w = form.data['blocks_weight']
        to_w = form.data['turnovers_weight']
        pts_w = form.data['points_weight']

        editedLeague.field_goal_made_weight = fgm_w
        editedLeague.field_goal_attempted_weight = fga_w
        editedLeague.free_throw_made_weight = ftm_w
        editedLeague.free_throw_attempted_weight = fta_w
        editedLeague.three_point_made_weight = three_w
        editedLeague.assists_weight = ast_w
        editedLeague.rebounds_weight = reb_w
        editedLeague.steals_weight = stl_w
        editedLeague.blocks_weight = blk_w
        editedLeague.turnovers_weight = to_w
        editedLeague.points_weight = pts_w

        for player in editedPlayers:
            fgm_tot = fgm_w * player.field_goal_made
            fga_tot = fga_w * player.field_goal_attempted
            ftm_tot = ftm_w * player.free_throw_made
            fta_tot = fta_w * player.free_throw_attempted
            three_tot = three_w * player.three_point_made
            ast_tot = ast_w * player.assists
            reb_tot = reb_w * player.rebounds
            stl_tot = stl_w * player.steals
            blk_tot = blk_w * player.blocks
            to_tot = to_w * player.turnovers
            pts_tot = pts_w * player.points

            player.fantasy_total = fgm_tot + fga_tot + ftm_tot + fta_tot + three_tot + ast_tot + reb_tot \
                + stl_tot + blk_tot + to_tot + pts_tot

        db.session.commit()

        return editedLeague.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@league_routes.route('/edit/<int:leagueId>/start', methods=['PUT'])
@login_required
def edit_start(leagueId):
    form = LeagueStartForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editedLeague = League.query.get(leagueId)

        editedLeague.start_date = form.data['start_date']
        editedLeague.start_time = form.data['start_time']

        if (form.data['start_standard']):
            editedLeague.start_standard = form.data['start_standard']

        db.session.commit()

        return editedLeague.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@league_routes.route('/edit/<int:leagueId>/status', methods=['PUT'])
@login_required
def edit_status(leagueId):
    editedLeague = League.query.get(leagueId)

    editedLeague.is_active = True

    db.session.commit()

    return editedLeague.to_dict()

@league_routes.route('/delete/<int:leagueId>', methods=['DELETE'])
@login_required
def delete_league(leagueId):
    deleted_league = League.query.get(leagueId)

    db.session.delete(deleted_league)
    db.session.commit()

    return 'Deleted Successfully'

@league_routes.route('/image/<int:leagueId>', methods=['POST'])
@login_required
def upload_league_image(leagueId):
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

    editedLeague = League.query.get(leagueId)
    editedLeague.league_image=url
    db.session.commit()

    return editedLeague.to_dict()

@league_routes.route('/edit/<int:leagueId>/note', methods=['PUT'])
@login_required
def league_note(leagueId):
    form = LeagueNoteForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editedLeague = League.query.get(leagueId)

        editedLeague.league_note_title = form.data['league_note_title']
        editedLeague.league_note = form.data['league_note']

        db.session.commit()

        return editedLeague.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
