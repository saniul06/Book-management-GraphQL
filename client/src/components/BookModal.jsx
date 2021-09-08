import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addBook } from '../actions/userActions'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const initialState = {
    bookName: '',
    author: '',
    publishedYear: '',
    category: '',
    text: ''
}

export default function BookModal({ open, handleOpen, handleClose, setAllBooks, allBooks }) {
    const classes = useStyles();

    const dispatch = useDispatch()

    const [data, setData] = useState(initialState)

    const [error, setError] = useState({
        bookName: false,
        author: false,
        publishedYear: false,
        category: false
    })


    const handleChange = e => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        if (e.target.value) {
            setError(prev => ({ ...prev, [e.target.name]: false }))
        } else {
            setError(prev => ({ ...prev, [e.target.name]: true }))
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!data.bookName || !data.author || !data.publishedYear || !data.category) {
            setError(prev => ({ ...prev, text: "Please fill all fields" }))
            return
        } else {
            setError(prev => ({ ...prev, text: "" }))
            dispatch(addBook(data.bookName, data.author, data.publishedYear, data.category, handleClose, setAllBooks, allBooks))
            setData(initialState)
        }

    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h3>Add new book</h3>
                        {error.text && <p style={{ color: 'red', fontSize: '14px' }}>Please fill all the fields</p>}
                        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <TextField id="standard-basic" className="mb-4" label="BookName" name="bookName" value={data.bookName} onChange={handleChange} />{error.bookName && <p style={{ color: 'red', fontSize: '14px' }}>This field is required</p>} <br />
                            <TextField id="standard-basic" className="mb-4" label="Author" name="author" value={data.author} onChange={handleChange} />{error.author && <p style={{ color: 'red', fontSize: '14px' }}>This field is required</p>}<br />
                            <TextField id="standard-basic" className="mb-4" label="Published Year" name="publishedYear" value={data.publishedYear} onChange={handleChange} />{error.publishedYear && <p style={{ color: 'red', fontSize: '14px' }}>This field is required</p>}<br />
                            <TextField id="standard-basic" className="mb-4" label="Category" name="category" value={data.category} onChange={handleChange} />{error.category && <p style={{ color: 'red', fontSize: '14px' }}>This field is required</p>} <br />
                            <Button type="submit" variant="contained" className="">Add</Button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
