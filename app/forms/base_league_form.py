from flask_wtf import FlaskForm
from wtforms import StringField, RadioField
from wtforms.validators import DataRequired, ValidationError
from app.models import League

class BaseLeagueForm(FlaskForm):
    league_name = StringField('league name', validators=[DataRequired()])
    team_limit = RadioField('team limit', validators=[DataRequired()], choices=[2, 3, 4, 5, 6, 7, 8, 9, 10])
    team_player_limit = RadioField('team player limit', validators=[DataRequired()], choices=[2, 3, 4, 5, 6, 7, 8])
