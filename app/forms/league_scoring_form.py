from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import InputRequired, NumberRange

class LeagueScoringForm(FlaskForm):
    field_goal_made_weight = IntegerField('field goal made weight', validators=[InputRequired(message='FGM field is required'), NumberRange(min=-1000, max=1000, message='FGM scoring value must be between -1000 and 1000')])
    field_goal_attempted_weight = IntegerField('field goal attempted weight', validators=[InputRequired(message='FGA field is required'), NumberRange(min=-1000, max=1000, message='FGA scoring value must be between -1000 and 1000')])
    free_throw_made_weight = IntegerField('free throw made weight', validators=[InputRequired(message='FTM field is required'), NumberRange(min=-1000, max=1000, message='FTM scoring value must be between -1000 and 1000')])
    free_throw_attempted_weight = IntegerField('free throw attempted weight', validators=[InputRequired(message='FTA field is required'), NumberRange(min=-1000, max=1000, message='FTA scoring value must be between -1000 and 1000')])
    three_point_made_weight = IntegerField('three point made weight', validators=[InputRequired(message='3PM field is required'), NumberRange(min=-1000, max=1000, message='3PM scoring value must be between -1000 and 1000')])
    assists_weight = IntegerField('assists weight', validators=[InputRequired(message='AST field is required'), NumberRange(min=-1000, max=1000, message='AST scoring value must be between -1000 and 1000')])
    rebounds_weight = IntegerField('rebounds weight', validators=[InputRequired(message='REB field is required'), NumberRange(min=-1000, max=1000, message='REB scoring value must be between -1000 and 1000')])
    steals_weight = IntegerField('steals weight', validators=[InputRequired(message='STL field is required'), NumberRange(min=-1000, max=1000, message='STL scoring value must be between -1000 and 1000')])
    blocks_weight = IntegerField('blocks weight', validators=[InputRequired(message='BLK field is required'), NumberRange(min=-1000, max=1000, message='BLK scoring value must be between -1000 and 1000')])
    turnovers_weight = IntegerField('turnovers weight', validators=[InputRequired(message='TO field is required'), NumberRange(min=-1000, max=1000, message='TO scoring value must be between -1000 and 1000')])
    points_weight = IntegerField('points weight', validators=[InputRequired(message='PTS field is required'), NumberRange(min=-1000, max=1000, message='PTS scoring value must be between -1000 and 1000')])
