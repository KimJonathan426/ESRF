from .db import db
from sqlalchemy.sql import func
from sqlalchemy import DateTime

class League(db.Model):
    __tablename__ = 'leagues'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    league_name = db.Column(db.String(50), nullable=False)
    league_image = db.Column(db.String(500), nullable=True, default='https://esrf.s3.amazonaws.com/Default-League-Logo.jpg')
    team_limit = db.Column(db.Integer, nullable=False)
    team_player_limit = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.String(10), nullable=False)
    start_time = db.Column(db.String(10), nullable=False)
    field_goal_made_weight = db.Column(db.Integer, nullable=True, default=2)
    field_goal_attempted_weight = db.Column(db.Integer, nullable=True, default=-1)
    free_throw_made_weight = db.Column(db.Integer, nullable=True, default=1)
    free_throw_attempted_weight = db.Column(db.Integer, nullable=True, default=-1)
    three_point_made_weight = db.Column(db.Integer, nullable=True, default=1)
    assists_weight = db.Column(db.Integer, nullable=True, default=2)
    rebounds_weight = db.Column(db.Integer, nullable=True, default=1)
    steals_weight = db.Column(db.Integer, nullable=True, default=4)
    blocks_weight = db.Column(db.Integer, nullable=True, default=4)
    turnovers_weight = db.Column(db.Integer, nullable=True, default=-2)
    points_weight = db.Column(db.Integer, nullable=True, default=1)
    createdAt = db.Column(DateTime(timezone=True), server_default=func.now())

    league_owner = db.relationship('User', back_populates='user_leagues')
    league_teams = db.relationship('Team', back_populates='team_league')
    league_players = db.relationship('Player', back_populates='player_league')
