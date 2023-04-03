from flask_app import flash
from flask_app.config.mysqlconnection import connectToMySQL
from pprint import pprint


DATABASE = 'tv'

class Show:
    def __init__(self, data):
        self.id =data['id']
        self.title=data['title']
        self.network=data['network']
        self.release_date=data['release_date']
        self.description=data['description']
        self.first_name=data['first_name']
        self.last_name=data['last_name']
        self.created_at=data['created_at']
        self.updated_at=data['updated_at']
        self.user_id=data['user_id']

#JOIN
    # @classmethod
    # def join_em(cls, data):
    #     query = "SELECT first_name, last_name FROM users JOIN shows ON id = user_id;"

# CREATE
    @classmethod
    def save_show(cls, data):
            query = "INSERT INTO shows (title, network, release_date, description, user_id) VALUES (%(title)s, %(network)s, %(release_date)s, %(description)s, %(user_id)s);"
            return connectToMySQL(DATABASE).query_db(query, data)



# READ ALL!
    @classmethod
    def get_all_shows(cls):
        query = "SELECT * FROM shows JOIN users ON users.id = shows.user_id;"
        results = connectToMySQL(DATABASE).query_db(query) 
        pprint(results)
        shows = []
        for show in results:
            shows.append(Show(show))
        return shows

# GET ONE
    @classmethod
    def get_one(cls,data):
        query = "SELECT * FROM shows JOIN users ON users.id = shows.user_id WHERE shows.id = %(id)s;"
        results = connectToMySQL(DATABASE).query_db(query,data)
        return cls( results[0] )

# UPDATE!
    @classmethod
    def edit_show(cls, data):
        query = "UPDATE shows SET title = %(title)s,network = %(network)s, release_date = %(release_date)s, description = %(description)s,  WHERE user_id = %(user_id)s;"
        return connectToMySQL(DATABASE).query_db(query,data)


# DELETE!
    @classmethod
    def delete_show(cls, data):
        query = "DELETE FROM shows WHERE id = %(id)s;"
        return connectToMySQL(DATABASE).query_db(query,data)


# VALIDATE!
    @staticmethod
    def validate_show(show):
        is_valid = True
        if len(show['title']) < 3:
            flash("Title must be at least 3 characters", "title")
            is_valid = False

        if len(show['network']) < 2:
            flash("Network must be at least 2 characters", "network")
            is_valid = False

        if len(show['release_date']) < 3:
            flash("Must be a valid date", "date")
            is_valid = False
            
        if len(show['description']) < 3:
            flash("Description must be at least 3 characters", "desc")
            is_valid = False


        return is_valid