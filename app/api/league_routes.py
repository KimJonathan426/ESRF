from flask import Blueprint, request
from flask_login import login_required, current_user
from sqlalchemy.sql import func
from flask_wtf.csrf import validate_csrf
from app.api.auth_routes import validation_errors_to_error_messages
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)
from random import sample
from app.forms.base_league_form import BaseLeagueForm
from app.forms.base_team_form import BaseTeamForm
from app.forms.league_edit_form import LeagueEditForm
from app.forms.edit_team_form import EditTeamForm
from app.forms.league_scoring_form import LeagueScoringForm
from app.forms.league_start_form import LeagueStartForm
from app.forms.league_note_form import LeagueNoteForm
from app.models import db, League, Player, Team

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

    valid_random_leagues = []

    leagues = League.query.order_by(func.random()).filter(League.owner_id != userId).filter(League.is_active == False).limit(1000).all()

    for league in leagues:
        filters = league.to_dict_query_filters()

        if len(valid_random_leagues) >= 10:
            break

        if userId not in filters['team_owner_ids'] and len(filters['team_owner_ids']) < filters['team_limit'] and filters['players_count'] >= 10:
            valid_random_leagues.append(league)

    return {'leagueList': [league.to_dict() for league in valid_random_leagues]}

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


# Teams routes per league

@league_routes.route('/<int:leagueId>/teams')
@login_required
def all_team(leagueId):
    teams = Team.query.filter_by(league_id=leagueId).all()
    return {'teamsList': [team.to_dict() for team in teams]}

@league_routes.route('/<int:leagueId>/teams/<int:teamNumber>')
@login_required
def my_team(leagueId, teamNumber):
    team = Team.query.filter_by(league_id=leagueId, team_number=teamNumber).first()

    if team:
        return team.to_dict()
    return {'errors': 'Team not found'}, 404

@league_routes.route('/<int:leagueId>/teams/new', methods=['POST'])
@login_required
def create_team(leagueId):
    form = BaseTeamForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        league = League.query.get(leagueId)
        league_info = league.to_dict()

        team = Team(
            league_id = leagueId,
            team_owner_id = current_user.id,
            team_number = len(league_info['teams']) + 1,
            team_location = form.data['team_location'],
            team_name = form.data['team_name'],
            team_abre = form.data['team_abre']
        )

        db.session.add(team)
        db.session.commit()

        return team.to_dict()
    return {'errors':validation_errors_to_error_messages(form.errors)}, 401

@league_routes.route('/<int:leagueId>/teams/<int:teamNumber>/edit', methods=['PUT'])
@login_required
def edit_team(leagueId, teamNumber):
    form = EditTeamForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editedTeam = Team.query.filter_by(league_id=leagueId, team_number=teamNumber).first()

        editedTeam.team_location = form.data['team_location']
        editedTeam.team_name = form.data['team_name']
        editedTeam.team_abre = form.data['team_abre']

        db.session.commit()

        return editedTeam.to_dict()
    return {'errors':validation_errors_to_error_messages(form.errors)}, 401

@league_routes.route('/<int:leagueId>/teams/<int:teamNumber>/delete', methods=['DELETE'])
@login_required
def delete_team(leagueId, teamNumber):
    deleted_team = Team.query.filter_by(league_id=leagueId, team_number=teamNumber).first()

    db.session.delete(deleted_team)
    db.session.commit()

    return 'Deleted Successfully'

@league_routes.route('/<int:leagueId>/teams/<int:teamNumber>/image', methods=['POST'])
@login_required
def upload_team_image(leagueId, teamNumber):
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

    editedTeam = Team.query.filter_by(league_id=leagueId, team_number=teamNumber).first()
    editedTeam.team_image=url
    db.session.commit()

    return editedTeam.to_dict()

@league_routes.route('/<int:leagueId>/teams/<int:teamNumber>/addPlayer', methods=['PUT'])
@login_required
def add_player_to_team(leagueId, teamNumber):
    playerId = int(request.form.get('playerId'))
    playerLimit = int(request.form.get('playerLimit'))

    team = Team.query.filter_by(league_id=leagueId, team_number=teamNumber).first()
    teamCount = len(team.to_dict()['players'])

    if (teamCount < playerLimit):
        player = Player.query.get(playerId)
        team.add_player(player)
        team.fantasy_total += player.fantasy_total

        db.session.commit()

        return team.to_dict()
    return {'errors': 'Failed to add player. Make sure you have enough roster space on your team'}, 401

@league_routes.route('/<int:leagueId>/teams/<int:teamNumber>/dropPlayer', methods=['PUT'])
@login_required
def drop_player(leagueId, teamNumber):
    playerId = int(request.form.get('playerId'))

    team = Team.query.filter_by(league_id=leagueId, team_number=teamNumber).first()

    player = Player.query.get(playerId)
    dropped = team.drop_player(player)

    if dropped:
        team.fantasy_total -= player.fantasy_total

        db.session.commit()

        return team.to_dict()
    return {'errors': 'Failed to drop player... please try again'}, 401

@league_routes.route('/<int:leagueId>/teams/update-fantasy', methods=['PUT'])
@login_required
def update_fantasy_total(leagueId):
    teams = Team.query.filter_by(league_id=leagueId).all()

    for team in teams:
        team.fantasy_total = sum(team.to_dict_player_fantasy()['player_fantasy_totals'])

    db.session.commit()

    return {'teamsList': [team.to_dict() for team in teams]}
