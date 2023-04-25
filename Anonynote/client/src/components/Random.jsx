import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'



const Random = () => {

    const [noteList, setNoteList] = useState([])
    const [loaded] = useState(false)


    useEffect(() => {
        axios.get('http://localhost:8000/api/notes/random')
            .then((bucket) => {
                console.log('This is my bucket: ', bucket.data)
                setNoteList(bucket.data)
            })
            .catch((error) => { console.log("This is an error", error) })
    }, [loaded])



    return (
        <div className="note-wall-container">
            <div className="custom-container">
                <div className="header-container">
                    <div>
                        <h1 className="title">Anonynote</h1>
                    </div>

                    <div className="write-note-btn-container">

                        <Link className="neu-link" to="/">Go back home</Link>

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
            </div>
        </div>
    )
}

export default Random