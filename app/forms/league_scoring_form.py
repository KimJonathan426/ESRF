from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, NumberRange

class LeagueScoringForm(FlaskForm):
    field_goal_made_weight = IntegerField('field goal made weight', validators=[DataRequired(message='FGM field is required'), NumberRange(min=-1000, max=1000, message='FGM scoring value must be between -1000 and 1000')])
    field_goal_attempted_weight = IntegerField('field goal attempted weight', validators=[DataRequired(message='FGA field is required'), NumberRange(min=-1000, max=1000, message='FGA scoring value must be between -1000 and 1000')])
    free_throw_made_weight = IntegerField('free throw made weight', validators=[DataRequired(message='FTM field is required'), NumberRange(min=-1000, max=1000, message='FTM scoring value must be between -1000 and 1000')])
    free_throw_attempted_weight = IntegerField('free throw attempted weight', validators=[DataRequired(message='FTA field is required'), NumberRange(min=-1000, max=1000, message='FTA scoring value must be between -1000 and 1000')])
    three_point_made_weight = IntegerField('three point made weight', validators=[DataRequired(message='3PM field is required'), NumberRange(min=-1000, max=1000, message='3PM scoring value must be between -1000 and 1000')])
    assists_weight = IntegerField('assists weight', validators=[DataRequired(message='AST field is required'), NumberRange(min=-1000, max=1000, message='AST scoring value must be between -1000 and 1000')])
    rebounds_weight = IntegerField('rebounds weight', validators=[DataRequired(message='REB field is required'), NumberRange(min=-1000, max=1000, message='REB scoring value must be between -1000 and 1000')])
    steals_weight = IntegerField('steals weight', validators=[DataRequired(message='STL field is required'), NumberRange(min=-1000, max=1000, message='STL scoring value must be between -1000 and 1000')])
    blocks_weight = IntegerField('blocks weight', validators=[DataRequired(message='BLK field is required'), NumberRange(min=-1000, max=1000, message='BLK scoring value must be between -1000 and 1000')])
    turnovers_weight = IntegerField('turnovers weight', validators=[DataRequired(message='TO field is required'), NumberRange(min=-1000, max=1000, message='TO scoring value must be between -1000 and 1000')])
    points_weight = IntegerField('points weight', validators=[DataRequired(message='PTS field is required'), NumberRange(min=-1000, max=1000, message='PTS scoring value must be between -1000 and 1000')])
