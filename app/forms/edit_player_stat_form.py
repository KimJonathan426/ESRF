from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import ValidationError
from app.models import Player

class EditPlayerStatForm(FlaskForm):
    field_goal_made = IntegerField('field goal made')
    field_goal_attempted = IntegerField('field goal attempted')
    free_throw_made = IntegerField('free throw made')
    free_throw_attempted = IntegerField('free throw attempted')
    three_point_made = IntegerField('three point made')
    assists = IntegerField('assists')
    rebounds = IntegerField('rebounds')
    steals = IntegerField('steals')
    blocks = IntegerField('blocks')
    turnovers = IntegerField('turnovers')
    points = IntegerField('points')
