from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from sqlalchemy import func
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(func.lower(User.email) == func.lower(email)).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(func.lower(User.username) == func.lower(username)).first()
    if user:
        raise ValidationError('Username is already in use.')


def password_checker(form, field):
    # Checking if confirmed password matches password field
    confirmed_password = field.data
    password = form.data['password']
    if (confirmed_password != password):
        raise ValidationError('Password and Confirmed Password field do not match.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    confirmedPassword = StringField('confirm password', validators=[DataRequired(), password_checker])
