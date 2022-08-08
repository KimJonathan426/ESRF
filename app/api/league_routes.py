from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.base_league_form import BaseLeagueForm
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
        print('FORMMMMMMMMMMMM', form.data)
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
