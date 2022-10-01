from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class BaseTeamForm(FlaskForm):
    team_location = StringField('team_location', validators=[DataRequired(message='Team location is required.'), Length(max=15, message='Team location must be 0 to 15 characters long.')])
    team_name = StringField('team_name', validators=[DataRequired(message='Team name is required.'), Length(max=20, message='Team name must be 0 to 20 characters long.')])
    team_abre = StringField('team_abre', validators=[DataRequired(message='Team abbreviation/acronym is required.'), Length(max=4, message='Team abbreviation/acronym must be 1 to 4 characters long.')])
