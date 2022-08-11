from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import Length, NumberRange


class EditPlayerStatForm(FlaskForm):
    recent_news = StringField('recent news', validators=[Length(max=1000, message='Recent news cannot exceed 1000 characters.')])
    field_goal_made = IntegerField('field goal made', validators=[NumberRange(min=0, max=300, message='FGM value cannot be less than 0 or greater than 300.')])
    field_goal_attempted = IntegerField('field goal attempted', validators=[NumberRange(min=0, max=300, message='FGA value cannot be less than 0 or greater than 300.')])
    free_throw_made = IntegerField('free throw made', validators=[NumberRange(min=0, max=300, message='FTM value cannot be less than 0 or greater than 300.')])
    free_throw_attempted = IntegerField('free throw attempted', validators=[NumberRange(min=0, max=300, message='FTA value cannot be less than 0 or greater than 300.')])
    three_point_made = IntegerField('three point made', validators=[NumberRange(min=0, max=300, message='3PM value cannot be less than 0 or greater than 300.')])
    assists = IntegerField('assists', validators=[NumberRange(min=0, max=300, message='AST value cannot be less than 0 or greater than 300.')])
    rebounds = IntegerField('rebounds', validators=[NumberRange(min=0, max=300, message='REB value cannot be less than 0 or greater than 300.')])
    steals = IntegerField('steals', validators=[NumberRange(min=0, max=300, message='STL value cannot be less than 0 or greater than 300.')])
    blocks = IntegerField('blocks', validators=[NumberRange(min=0, max=300, message='BLK value cannot be less than 0 or greater than 300.')])
    turnovers = IntegerField('turnovers', validators=[NumberRange(min=0, max=300, message='TO value cannot be less than 0 or greater than 300.')])
    points = IntegerField('points', validators=[NumberRange(min=0, max=300, message='PTS value cannot be less than 0 or greater than 300.')])
