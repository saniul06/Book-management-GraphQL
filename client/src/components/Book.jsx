import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { rateBook } from '../actions/userActions'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

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


const Book = ({ book }) => {

    const dispatch = useDispatch()
    const classes = useStyles();

    const [avgRating, setAvgRating] = useState(0)
    const [numOfRating, setNumOfRating] = useState(0)
    const [bookId, setBookId] = useState()

    const [value, setValue] = React.useState(0);
    const [hover, setHover] = React.useState(-1);

    const labels = {
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
    };


    useEffect(() => {
        if (book.ratings && book.ratings.length > 0) {
            let avg = book.ratings.reduce((acc, item) => item.value + acc, 0)
            setAvgRating(avg / book.ratings.length)
            setNumOfRating(book.ratings.length)
        } else {
            setAvgRating(0)
            setNumOfRating(0)
        }
    }, [avgRating, book.ratings])

    const [openRating, setOpenRating] = React.useState(false);

    const handleRatingOpen = bookId => {
        setOpenRating(true);
        setBookId(bookId)
    };

    const handleRatingClose = () => {
        setOpenRating(false);
        setBookId()
    };

    const handleSubmit = () => {
        dispatch(rateBook(bookId, value, book, setAvgRating, setNumOfRating))
        handleRatingClose()
    }


    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
                <div className="card-body d-flex flex-column">
                    <p >Name - {book.bookName}</p>
                    <p >Author - {book.author}</p>
                    <p >Published Year - {book.publishedYear}</p>
                    <p >Category - {book.category}</p>
                    <div className="ratings mt-auto mb-2">
                        <span className="text-bold text-secondary mr-1">{avgRating && avgRating.toFixed(1)}</span>
                        <div className="rating-outer">
                            <div className="rating-inner"></div>
                        </div>
                        <span id="no_of_reviews">{numOfRating}</span>
                    </div>
                    <button id="view_btn" className="btn btn-block" onClick={() => handleRatingOpen(book._id)}>Rate Book</button>
                </div>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openRating}
                onClose={handleRatingClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openRating}>
                    <div style={{ backgroundColor: '#fff', padding: '80px' }}>
                        <Rating
                            name="hover-feedback"
                            value={value}
                            precision={1}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                        />
                        <div style={{ minHeight: '25px' }}>
                            {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                        </div>
                        <Button onClick={handleSubmit} className="mt-3" variant="contained" size="large" color="primary" >
                            Rate
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Book
