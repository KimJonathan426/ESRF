from .db import db
from .user import User
from sqlalchemy.sql import func
from sqlalchemy import DateTime

class League(db.Model):
    __tablename__ = 'leagues'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    league_name = db.Column(db.String(30), nullable=False)
    league_image = db.Column(db.String(500), nullable=True, default='https://esrf.s3.amazonaws.com/Default-League-Logo.jpg')
    league_note_title = db.Column(db.String(40), nullable=True, default='Fantasy Basketball!')
    league_note = db.Column(db.String(1000), nullable=True, default='Welcome to your ESRF basketball league. \
        Your League Manager will have the opportunity to post a League Manager Note to the entire league and that will appear in this area.')
    team_limit = db.Column(db.Integer, nullable=False)
    team_player_limit = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.String(11), nullable=True)
    start_time = db.Column(db.String(11), nullable=True)
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
    league_teams = db.relationship('Team', back_populates='team_league', cascade="all, delete")
    league_players = db.relationship('Player', back_populates='player_league', cascade="all, delete")


    def to_dict_league_info(self):
        return {
            'id': self.id,
            'league_name': self.league_name,
            'league_image': self.league_image,
            'start_date': self.start_date,
            'start_time': self.start_time
        }

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'league_name': self.league_name,
            'league_image': self.league_image,
            'league_note_title': self.league_note_title,
            'league_note': self.league_note,
            'team_limit': self.team_limit,
            'team_player_limit': self.team_player_limit,
            'start_date': self.start_date,
            'start_time': self.start_time,
            'field_goal_made_weight': self.field_goal_made_weight,
            'field_goal_attempted_weight': self.field_goal_attempted_weight,
            'free_throw_made_weight': self.free_throw_made_weight,
            'free_throw_attempted_weight': self.free_throw_attempted_weight,
            'three_point_made_weight': self.three_point_made_weight,
            'assists_weight': self.assists_weight,
            'rebounds_weight': self.rebounds_weight,
            'steals_weight': self.steals_weight,
            'blocks_weight': self.blocks_weight,
            'turnovers_weight': self.turnovers_weight,
            'points_weight': self.points_weight,
            'teams': [team.to_dict_no_players() for team in self.league_teams],
            'players': [player.to_dict() for player in self.league_players],
            'owner_username': User.query.get(self.owner_id).username
        }
