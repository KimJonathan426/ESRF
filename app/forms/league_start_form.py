from flask_wtf import FlaskForm
from wtforms import DateField, TimeField, DateTimeField
from wtforms.validators import DataRequired


class LeagueStartForm(FlaskForm):
    start_date = DateField('start date', validators=[DataRequired(message='Game start date field is required.')])
    start_time = TimeField('start time', validators=[DataRequired(message='Game start time field is required')])
    start_standard = DateTimeField('start standard')
