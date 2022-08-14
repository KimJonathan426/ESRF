from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, Length


class PlayerForm(FlaskForm):
    league_id = IntegerField('league id', validators=[DataRequired()])
    player_name = StringField('player name', validators=[DataRequired(message='Player name is required.'), Length(min=0, max=40, message="The player's name must be between 0 and 40 characters (included).")])
    position = SelectField('position', validators=[DataRequired(message="Please select the player's position from one of the options.")], choices=['PG', 'SG', 'SF', 'PF', 'C'])
    team = StringField('team', validators=[Length(min=0, max=40, message="The player's team name must be between 0 and 40 characters (included).")])
    bio = StringField('bio', validators=[Length(min=0, max=1000, message="The player's biography must be between 0 and 1000 characters (included).")])
