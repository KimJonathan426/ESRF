from .db import db

class Player(db.Model):
    __tablename__ = 'players'

    id = db.Column(db.Integer, primary_key=True)
    league_id = db.Column(db.Integer, db.ForeignKey('leagues.id'), nullable=False)
    player_name = db.Column(db.String(50), nullable=False)
    player_image = db.Column(db.String(500), nullable=False) # Default player image needed
    position = db.Column(db.String(30), nullable=False)
    team = db.Column(db.String(40), nullable=True)
    bio = db.Column(db.String(500), nullable=True)
    recent_news = db.Column(db.String(500), nullable=True)
    field_goal_made = db.Column(db.Integer, nullable=False)
    field_goal_attempted = db.Column(db.Integer, nullable=False)
    three_point_made = db.Column(db.Integer, nullable=False)
    assists = db.Column(db.Integer, nullable=False)
    rebounds = db.Column(db.Integer, nullable=False)
    steals = db.Column(db.Integer, nullable=False)
    blocks = db.Column(db.Integer, nullable=False)
    turnovers = db.Column(db.Integer, nullable=False)
    points = db.Column(db.Integer, nullable=False)
