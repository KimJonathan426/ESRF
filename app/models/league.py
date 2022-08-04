from .db import db
from sqlalchemy.sql import func
from sqlalchemy import DateTime

class League(db.Model):
    __tablename__ = 'leagues'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    league_name = db.Column(db.String(50), nullable=False)
    league_image = db.Column(db.String(500), nullable=True) # Default image needed
    team_limit = db.Column(db.Integer, nullable=False)
    team_player_limit = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.String(10), nullable=False)
    start_time = db.Column(db.String(10), nullable=False)
    field_goal_made_weight = db.Column(db.Integer, nullable=False)
    field_goal_attempted_weight = db.Column(db.Integer, nullable=False)
    three_point_made_weight = db.Column(db.Integer, nullable=False)
    assists_weight = db.Column(db.Integer, nullable=False)
    rebounds_weight = db.Column(db.Integer, nullable=False)
    steals_weight = db.Column(db.Integer, nullable=False)
    blocks_weight = db.Column(db.Integer, nullable=False)
    turnovers_weight = db.Column(db.Integer, nullable=False)
    points_weight = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(DateTime(timezone=True), server_default=func.now())
