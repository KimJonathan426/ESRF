from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Player

class EditPlayerForm(FlaskForm):
    player_name = StringField('player name', validators=[DataRequired()])
    position = SelectField('position', validators=[DataRequired()], choices=['PG', 'SG', 'SF', 'PF', 'C'])
    team = StringField('team')
    bio = StringField('bio')