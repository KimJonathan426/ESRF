from .db import db
from .player_team import player_teams

class Player(db.Model):
    __tablename__ = 'players'

    id = db.Column(db.Integer, primary_key=True)
    league_id = db.Column(db.Integer, db.ForeignKey('leagues.id'), nullable=False)
    player_name = db.Column(db.String(40), nullable=False)
    player_image = db.Column(db.String(500), nullable=True, default='https://esrf.s3.amazonaws.com/Empty-Player-Image.png')
    position = db.Column(db.String(20), nullable=False)
    team = db.Column(db.String(40), nullable=True, default='')
    bio = db.Column(db.String(1000), nullable=True, default='')
    recent_news = db.Column(db.String(1000), nullable=True, default='')
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


    def to_dict_no_team(self):
        return {
            'id': self.id,
            'league_id': self.league_id,
            'player_name': self.player_name,
            'player_image': self.player_image,
            'position': self.position,
            'team': self.team,
            'bio': self.bio,
            'recent_news': self.recent_news,
            'field_goal_made': self.field_goal_made,
            'field_goal_attempted': self.field_goal_attempted,
            'free_throw_made': self.free_throw_made,
            'free_throw_attempted': self.free_throw_attempted,
            'three_point_made': self.three_point_made,
            'assists': self.assists,
            'rebounds': self.rebounds,
            'steals': self.steals,
            'blocks': self.blocks,
            'turnovers': self.turnovers,
            'points': self.points,
            'fantasy_total': self.fantasy_total,
        }

    def to_dict(self):
        return {
            'id': self.id,
            'league_id': self.league_id,
            'player_name': self.player_name,
            'player_image': self.player_image,
            'position': self.position,
            'team': self.team,
            'bio': self.bio,
            'recent_news': self.recent_news,
            'field_goal_made': self.field_goal_made,
            'field_goal_attempted': self.field_goal_attempted,
            'free_throw_made': self.free_throw_made,
            'free_throw_attempted': self.free_throw_attempted,
            'three_point_made': self.three_point_made,
            'assists': self.assists,
            'rebounds': self.rebounds,
            'steals': self.steals,
            'blocks': self.blocks,
            'turnovers': self.turnovers,
            'points': self.points,
            'fantasy_total': self.fantasy_total,
            'team_list': [team.to_dict_for_player() for team in self.teams_with_player]
        }
