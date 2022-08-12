from flask import Blueprint, request
from flask_login import login_required, current_user
from flask_wtf.csrf import validate_csrf
from app.api.auth_routes import validation_errors_to_error_messages
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)
from app.forms.base_league_form import BaseLeagueForm
from app.forms.league_edit_form import LeagueEditForm
from app.forms.league_scoring_form import LeagueScoringForm
from app.forms.league_start_form import LeagueStartForm
from app.models import db, League

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

        editedLeague.field_goal_made_weight = form.data['field_goal_made_weight']
        editedLeague.field_goal_attempted_weight = form.data['field_goal_attempted_weight']
        editedLeague.free_throw_made_weight = form.data['free_throw_made_weight']
        editedLeague.free_throw_attempted_weight = form.data['free_throw_attempted_weight']
        editedLeague.three_point_made_weight = form.data['three_point_made_weight']
        editedLeague.assists_weight = form.data['assists_weight']
        editedLeague.rebounds_weight = form.data['rebounds_weight']
        editedLeague.steals_weight = form.data['steals_weight']
        editedLeague.blocks_weight = form.data['blocks_weight']
        editedLeague.turnovers_weight = form.data['turnovers_weight']
        editedLeague.points_weight = form.data['points_weight']

        db.session.commit()

        return editedLeague.to_dict()
    return {'errors:': validation_errors_to_error_messages(form.errors)}, 401

@league_routes.route('/edit/<int:leagueId>/start', methods=['PUT'])
@login_required
def edit_start(leagueId):
    form = LeagueStartForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        editedLeague = League.query.get(leagueId)

        editedLeague.start_date = form.data['start_date']
        editedLeague.start_time = form.data['start_time']

        db.session.commit()

        return editedLeague.to_dict()
    return {'errors:': validation_errors_to_error_messages(form.errors)}, 401

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
