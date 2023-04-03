from flask import render_template,redirect,session,request, flash
from flask_app import app
from flask_app.models.show import Show
from flask_app.models.user import User



# VIEW
@app.route('/show/<int:id>')
def get_all_shows(id):
    if 'user_id' not in session:
        return redirect('/logout')
    data = {'id': id}
    return render_template("shows.html", show = Show.get_one(data))

# VIEW ONE
@app.route('/view/show/<int:id>')
def view_show(id):
    if 'user_id' not in session:
        return redirect('/logout')

    # Show.get_one(data={'id': id})
    return render_template('view.html', show = Show.get_one(data={'id': id}))
# CREATE PAGE
@app.route('/new/show')
def new_show():
    return render_template('new.html')

# CREATE?!?!?!?!?!?
@app.route('/create/show', methods=['POST'])
def create_show():
    if 'user_id' not in session:
        return redirect('/logout')
    if not Show.validate_show(request.form):
        return redirect('/new/show')
    Show.save_show(request.form)
    return redirect('/shows')


# EDIT PAGE
@app.route('/edit/show/<int:id>')
def edit_show(id):
    if 'user_id' not in session:
        return redirect('/logout')
    data = {
        "id":id
    }
    user_data = {
        "id":session['user_id']
    }
    return render_template("edit.html", show = Show.get_one(data))

#EDIT?!?!?!?!?
@app.route('/update/show', methods=['POST'])
def update_show():
    if not Show.validate_show(request.form):
        return redirect(f"/edit/show/{request.form['id']}")

    Show.edit_show(request.form)
    return redirect('/shows')


# DELETE
@app.route('/delete/show/<int:id>')
def delete_show(id):
    if 'user_id' not in session:
        return redirect('/logout')

    Show.delete_show(data={'id': id})
    return redirect('/shows')
