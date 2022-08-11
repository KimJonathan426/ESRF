from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Length, ValidationError

def position_checker(form, field):
    # Check if the position is one of the 5 options.
    position = field.data
    position_list = ['PG', 'SG', 'SF', 'PF', 'C']

    if (position not in position_list):
        raise ValidationError('Please select a position from one of the options.')

class EditPlayerForm(FlaskForm):
    player_name = StringField('player name', validators=[DataRequired(message='Player name field is required.'), Length(max=40, message='Player name cannot exceed 40 characters.')])
    position = SelectField('position', validators=[DataRequired(message="Please pick the player's primary position."), position_checker], choices=['PG', 'SG', 'SF', 'PF', 'C'])
    team = StringField('team', validators=[Length(max=40, message='Team name cannot exceed 40 characters.')])
    bio = StringField('bio', validators=[Length(max=1000, message='Biography cannot exceed 1000 characters.')])
