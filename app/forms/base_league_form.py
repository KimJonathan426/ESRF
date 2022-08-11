from flask_wtf import FlaskForm
from wtforms import StringField, RadioField
from wtforms.validators import DataRequired, Length, ValidationError


def team_limit_range(form, field):
    # Checking if team limit is one of the choices. (Should always be but incase of SQL injections)
    team_limit = int(form.data['team_limit'])
    if (team_limit < 2 or team_limit > 10):
        raise ValidationError('Number of teams must be between 2 and 10.')

def player_limit_range(form, field):
    # Checking if player limit is one of the choices. (Should always be but incase of SQL injections)
    team_player_limit = int(form.data['team_player_limit'])
    if (team_player_limit < 2 or team_player_limit > 8):
        raise ValidationError('Number of players per team must be between 2 and 8 players.')

class BaseLeagueForm(FlaskForm):
    league_name = StringField('league name', validators=[DataRequired(message='League name is required.'), Length(max=30, message='League name cannot exceed 30 characters.')])
    team_limit = RadioField('team limit', validators=[DataRequired(message='Number of teams is required.'), team_limit_range], choices=[2, 3, 4, 5, 6, 7, 8, 9, 10])
    team_player_limit = RadioField('team player limit', validators=[DataRequired(message='Number of players per team is required.'), player_limit_range], choices=[2, 3, 4, 5, 6, 7, 8])
