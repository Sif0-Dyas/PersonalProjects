from flask_app import app, render_template, redirect, request, bcrypt, session, flash
from flask_app.models.user import User
from flask_app.models.show import Show

DATABASE = 'art'

@app.route('/')
def index():
    return render_template('index.html')

# CREATE AKA REGISTER

@app.route("/register", methods = ['post'])
def register():
    print(request.form)

    if not User.validate_user(request.form):
        return redirect('/')

    hashed_pw = bcrypt.generate_password_hash(request.form['password'])
    print(hashed_pw)

    data = {
        'first_name' : request.form['first_name'],
        'last_name' : request.form['last_name'],
        'email' : request.form['email'],
        'password': hashed_pw
    }
    user_id = User.save(data)
    
    session['user_id'] = user_id
    session['first_name'] = request.form['first_name']
    session['last_name'] = request.form['last_name']

    return redirect('/shows')

# READ and VERIFY AKA LOGIN

@app.route('/login', methods=['post'])
def login():
    print(request.form)

    user = User.get_by_email(request.form)
    if not user:
        flash("invalid credentials", "login")
        return redirect("/")

    password_valid = bcrypt.check_password_hash(user.password, request.form['password'])
    print(password_valid)
    if not password_valid:
        flash("invalid credentials", "login")
        return redirect('/')

    
    session['user_id'] = user.id
    session['first_name'] = user.first_name
    session['last_name'] = user.last_name
    
    
    return redirect('/shows')

#???
@app.route('/shows')
def user_show():
    if 'user_id' not in session:
        return redirect('/logout')
    data ={
        'id': session['user_id']
    }
    return render_template("shows.html",user=User.get_one(data),shows=Show.get_all_shows())


#! LOGOUT

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

