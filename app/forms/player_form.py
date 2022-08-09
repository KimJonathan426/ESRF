from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Player

class PlayerForm(FlaskForm):
    league_id = IntegerField('league id', validators=[DataRequired()])
    player_name = StringField('player name', validators=[DataRequired()])
    position = SelectField('position', validators=[DataRequired()], choices=['PG', 'SG', 'SF', 'PF', 'C'])
    team = StringField('team', validators=[DataRequired()])
    bio = StringField('bio', validators=[DataRequired()])
