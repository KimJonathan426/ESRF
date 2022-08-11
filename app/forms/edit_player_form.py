from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Player

class EditPlayerForm(FlaskForm):
    player_name = StringField('player name', validators=[DataRequired(message='Player name field is required.')])
    position = SelectField('position', validators=[DataRequired(message='Please pick the players primary position.')], choices=['PG', 'SG', 'SF', 'PF', 'C'])
    team = StringField('team')
    bio = StringField('bio')
