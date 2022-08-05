from flask import Blueprint
from flask_login import login_required
from app.models import League

league_routes = Blueprint('leagues', __name__)

@league_routes.route('/')
@login_required
def leagues():
    leagues = League.query.all()
    return {'leagues': [league.to_dict() for league in leagues]}
