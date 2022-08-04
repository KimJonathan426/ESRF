from .db import db
from sqlalchemy.sql import func
from sqlalchemy import DateTime

class Team(db.Model):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    league_id = db.Column(db.Integer, db.ForeignKey('leagues.id'), nullable=False)
    team_owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    team_name = db.Column(db.String(40), nullable=False)
    team_image = db.Column(db.String(500), nullable=True) # Default image needed
    fantasy_total = db.Column(db.Integer, nullable=True) # Default should start at 0
    createdAt = db.Column(DateTime(timezone=True), server_default=func.now())
