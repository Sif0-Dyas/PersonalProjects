from flask_app import app, render_template, redirect, request, bcrypt, session, flash
from flask_app.config.mysqlconnection import connectToMySQL
from pprint import pprint
import re	# the regex module
# create a regular expression object that we'll use later   
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$') 

DATABASE = 'TV'


class User:

    def __init__(self, data) -> None:
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

# CREATE
    @classmethod
    def save(cls, data):
            query = "INSERT INTO users (first_name, last_name, email, password) VALUES (%(first_name)s, %(last_name)s, %(email)s, %(password)s);"
            return connectToMySQL(DATABASE).query_db(query, data)

# READ ONE!
    @classmethod
    def get_one(cls,data):
        query = "SELECT * FROM users WHERE id = %(id)s;"
        result = connectToMySQL(DATABASE).query_db(query,data)
        pprint(result[0])
        user = User(result[0])
        print(user)
        return user        

# LOGIN
    @classmethod
    def get_by_email(cls, data):
        query = "SELECT * FROM users WHERE email = %(email)s"
        result = connectToMySQL(DATABASE).query_db(query, data)
        print(result)
        if len(result) > 0:
            return User(result[0])
        else:
            return False


# VALIDATE
    @staticmethod
    def validate_user(user: dict) -> bool:
        is_valid = True
        query = "SELECT * FROM users WHERE email = %(email)s;"
        results = connectToMySQL(DATABASE).query_db(query,user)

        if len(results) >= 1:
            flash("Email already taken.","register")
            is_valid=False

        if len(user['first_name']) < 2:
            is_valid = False
            flash("first name must be at least 2 characters", "first_name")

        if len(user['last_name']) < 2:
            is_valid = False
            flash("last name must be at least 2 characters", "last_name")


        if user['password'] != user['confirm_password']:
            is_valid = False
            flash("passwords do not match", "confirm_password")

        if not EMAIL_REGEX.match(user['email']): 
            flash("Invalid email address!", "email")
            is_valid = False

        if len(user['password']) < 8:
            is_valid = False
            flash("password must be at least 8 characters", "password")

        
        return is_valid