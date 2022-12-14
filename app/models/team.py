from .db import db
from .player_team import player_teams
from sqlalchemy.sql import func
from sqlalchemy import DateTime

class Team(db.Model):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    league_id = db.Column(db.Integer, db.ForeignKey('leagues.id'), nullable=False)
    team_owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    team_number = db.Column(db.Integer, nullable=False)
    team_location = db.Column(db.String(15), nullable=False)
    team_name = db.Column(db.String(20), nullable=False)
    team_abre = db.Column(db.String(4), nullable=False)
    team_image = db.Column(db.String(500), nullable=True, default='https://esrf.s3.amazonaws.com/Default-Team-Logo.png')
    fantasy_total = db.Column(db.Integer, nullable=True, default=0)
    createdAt = db.Column(DateTime(timezone=True), server_default=func.now())

    team_owner = db.relationship('User', back_populates='user_teams')
    team_league = db.relationship('League', back_populates='league_teams')
    players_on_team = db.relationship('Player',
    secondary=player_teams,
    back_populates='teams_with_player'
    )

    def drop_player(self, player):
        if player in self.players_on_team:
            self.players_on_team.remove(player)
            return True

    def add_player(self, player):
        self.players_on_team.append(player)

    def to_dict_player_fantasy(self):
        return {
            'player_fantasy_totals': [player.to_dict_no_team()['fantasy_total'] for player in self.players_on_team]
        }

    def to_dict_team_owner(self):
        return {
            'team_owner_id': self.team_owner_id
        }

    def to_dict_for_player(self):
        return {
            'id': self.id,
            'team_location': self.team_location,
            'team_name': self.team_name,
            'team_abre': self.team_abre,
        }


    def to_dict_no_players(self):
        return {
            'id': self.id,
            'league_id': self.league_id,
            'team_owner_id': self.team_owner_id,
            'team_number': self.team_number,
            'team_location': self.team_location,
            'team_name': self.team_name,
            'team_abre': self.team_abre,
            'team_image': self.team_image,
            'fantasy_total': self.fantasy_total
        }


    def to_dict(self):
        return {
        'id': self.id,
        'league_id': self.league_id,
        'team_owner_id': self.team_owner_id,
        'team_number': self.team_number,
        'team_location': self.team_location,
        'team_name': self.team_name,
        'team_abre': self.team_abre,
        'team_image': self.team_image,
        'fantasy_total': self.fantasy_total,
        'players': [player.to_dict_no_team() for player in self.players_on_team],
        'team_owner': self.team_owner.to_dict()
        }
