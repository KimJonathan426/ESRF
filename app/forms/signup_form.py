from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, Email, ValidationError
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
    confirmed_password = form.data['confirmedPassword']
    password = form.data['password']
    if (confirmed_password != password):
        raise ValidationError('Password and Confirmed Password field do not match.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message='Username is required.'), Length(max=20, message='Username cannot exceed 20 characters.'), username_exists])
    email = StringField('email', validators=[DataRequired(message='Email is required.'), Email(message='Please enter a valid email.'), Length(max=255, message='Email cannot exceed 255 characters.'), user_exists])
    password = StringField('password', validators=[DataRequired(message='Password is required.'), Length(max=255, message='Password cannot exceed 255 characters.')])
    confirmedPassword = StringField('confirm password', validators=[DataRequired(message='Confirmed password is required.'), Length(max=255, message='Confirmed Password cannot exceed 255 characters'),password_checker])
