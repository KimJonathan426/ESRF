from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, League

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# @user_routes.route('/<int:leagueId>/all')
# @login_required
# def all_users(leagueId):
#     league = League.query.get(leagueId)
#     teams = league.to_dict()['teams']

#     user_ids = [team['team_owner_id'] for team in teams]

#     users = User.query.filter(User.id.in_(user_ids)).all()

#     user_dict = {}

#     for user in users:
#         user_info = user.to_dict()
#         user_dict[user_info['id']] = user_info

#     return user_dict
