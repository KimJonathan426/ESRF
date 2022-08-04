from .db import db
from .player_team import player_teams

class Player(db.Model):
    __tablename__ = 'players'

    id = db.Column(db.Integer, primary_key=True)
    league_id = db.Column(db.Integer, db.ForeignKey('leagues.id'), nullable=False)
    player_name = db.Column(db.String(50), nullable=False)
    player_image = db.Column(db.String(500), nullable=True, default='https://esrf.s3.amazonaws.com/Empty-Player-Image.png')
    position = db.Column(db.String(30), nullable=False)
    team = db.Column(db.String(40), nullable=True)
    bio = db.Column(db.String(500), nullable=True)
    recent_news = db.Column(db.String(500), nullable=True)
    field_goal_made = db.Column(db.Integer, nullable=True, default=0)
    field_goal_attempted = db.Column(db.Integer, nullable=True, default=0)
    free_throw_made = db.Column(db.Integer, nullable=True, default=0)
    free_throw_attempted = db.Column(db.Integer, nullable=True, default=0)
    three_point_made = db.Column(db.Integer, nullable=True, default=0)
    assists = db.Column(db.Integer, nullable=True, default=0)
    rebounds = db.Column(db.Integer, nullable=True, default=0)
    steals = db.Column(db.Integer, nullable=True, default=0)
    blocks = db.Column(db.Integer, nullable=True, default=0)
    turnovers = db.Column(db.Integer, nullable=True, default=0)
    points = db.Column(db.Integer, nullable=True, default=0)
    fantasy_total = db.Column(db.Integer, nullable=True, default=0)

    player_league = db.relationship('League', back_populates='league_players')
    teams_with_player = db.relationship('Team',
    secondary=player_teams,
    back_populates='players_on_team'
    )
