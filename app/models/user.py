from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    user_leagues = db.relationship('League', back_populates='league_owner')
    user_teams = db.relationship('Team', back_populates='team_owner')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict_leagues_and_teams(self):
        return {
            'user_leagues': [league.to_dict_league_info() for league in self.user_leagues],
            'user_teams': [team.to_dict_no_players() for team in self.user_teams]
        }

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
