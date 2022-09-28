from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class BaseTeamForm(FlaskForm):
    league_id = IntegerField('league_id', validators=[DataRequired()])
    team_owner_id = IntegerField('team_owner_id', validators=[DataRequired()])
    team_name = StringField('team_name', validators=[DataRequired(message='Player name is required.'), Length(min=0, max=30, message="The player's name must be between 0 and 30 characters (included).")])
    team_abre = StringField('team_abre', validators=[DataRequired(message='Team abbreviation/acronym is required.'), Length(max=4, message='Team abbreviation/acronym must be 1 to 4 characters long.')])
