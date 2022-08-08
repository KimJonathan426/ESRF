from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import League

class LeagueScoringForm(FlaskForm):
    field_goal_made_weight = IntegerField('field goal made weight', validators=[DataRequired()])
    field_goal_attempted_weight = IntegerField('field goal attempted weight', validators=[DataRequired()])
    free_throw_made_weight = IntegerField('free throw made weight', validators=[DataRequired()])
    free_throw_attempted_weight = IntegerField('free throw attempted weight', validators=[DataRequired()])
    three_point_made_weight = IntegerField('three point made weight', validators=[DataRequired()])
    assists_weight = IntegerField('assists weight', validators=[DataRequired()])
    rebounds_weight = IntegerField('rebounds weight', validators=[DataRequired()])
    steals_weight = IntegerField('steals weight', validators=[DataRequired()])
    blocks_weight = IntegerField('blocks weight', validators=[DataRequired()])
    turnovers_weight = IntegerField('turnovers weight', validators=[DataRequired()])
    points_weight = IntegerField('points weight', validators=[DataRequired()])
