from calendar import month
from flask_wtf import FlaskForm
from wtforms import DateField, TimeField, DateTimeField
from wtforms.validators import DataRequired, ValidationError
from datetime import date, time, datetime

def date_checker(form, field):
    date_today = date.today()
    start_date = field.data

    if (start_date < date_today):
        raise ValidationError('League start date cannot be set in the past.')

def time_checker(form, field):
    date_today = date.today()
    time_today = datetime.now().time()
    start_time = field.data
    start_date = form.data['start_date']

    if (start_date):
        if (start_date == date_today) and (start_time < time_today):
            raise ValidationError('League start time cannot be set in the past or on the current minute.')

class LeagueStartForm(FlaskForm):
    start_date = DateField('start date', validators=[DataRequired(message='League start date field is required.'),  date_checker])
    start_time = TimeField('start time', validators=[DataRequired(message='League start time field is required'), time_checker])
    start_standard = DateTimeField('start standard')
