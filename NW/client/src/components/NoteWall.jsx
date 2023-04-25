import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const NoteWall = () => {


    const [noteList, setNoteList] = useState([])
    const [loaded] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8000/api/notes')
            .then((res) => {
                console.log('This is my bucket: ', res.data)

                // sort alphabetically
                res.data.sort(function (a, b) {
                    let titleA = a.title.toLowerCase()
                    let titleB = b.title.toLowerCase()

                    if (titleA > titleB) {
                        return 1
                    } else {
                        return -1
                    }
                })


                setNoteList(res.data)
            })
            .catch((error) => { console.log("This is an error", error) })
    }, [loaded])


    return (
        <div className="note-wall-container">
            <div className="custom-container">
                <div className="header-container">
                    <div>
                        <h1 className="title">Anonynote</h1>
                        <h4 className="leave-note-text">Leave an anonymous note!</h4>
                    </div>

                    <div className="write-note-btn-container">

                        <Link className="neu-link" to={'/write'}>Write Note</Link>

                    </div>
                </div>


                <div className="notes-container">
                    {
                        noteList.map((note, i) => {
                            const randomColor = `hsl(${Math.random() * 360}, 100%, 90%)`;

                            return (
                                <div key={i} className="note" style={{ backgroundColor: randomColor }}>
                                    <div className="note-content">
                                        <h1>{note.title}</h1>
                                        <p>{note.body}</p>
                                        <div className="group">

                                            <Link className="neu-link" to={`/edit/${note._id}`}>Edit</Link>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="random-note-btn-container">

                    <Link className="neu-link" to={`/random`}>Random Note</Link>

                </div>
            </div>
        </div>
    )
}

export default NoteWall
