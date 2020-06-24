import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Box } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
//import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    cardBack: {
        backgroundColor: theme.palette.primary.main,
        margin: 8
    },
    iconsUnliked: {
        color: '#c5c6c7'
    },

    iconsLiked: {
        color: '#66fcf1'
    },
    avatarBorder: {
        borderColor: '#66fcf1'
    },
    likeMargin: {
        marginRight: 20
    }
}))



export default function Post(props) {
    const classes = useStyles()

    const [name,  setname] = useState("")
    useEffect(() => {
        axios.get(`${props.api}/users/getname/${props.username}`)
                .then(name => setname(name.data))
                .catch(err => console.log(err))
    },[props.username,props.api])

    const [likeColor, setlikeColor] = useState(false)
    useEffect(() => {
        checkLike()        

    })
    const [disabled, setdisabled] = useState(false)

    const checkLike = async() => {
        let res =  await axios.put(`${props.api}/post/checklike`, { username: props.currentUsername, postId: props.id })
        setlikeColor(res.data)
    }

    const months = ["Placeholder","January", "February", "March", "April", "May", "June", "July",
                        "August", "September", "October", "November", "December"]

    const getDate = () => {
        const date = props.createdAt.split("T")[0].split("-");
        const day = date[2]
        const month = months[parseInt(date[1])]
        const year = date[0]

        return `${month} ${day} ${year}`
    }

    const replaceYou = () => {
        if (name === props.currentName){
            return 'YOU'
        }
        else return name
    }

    const likePost = async () => {
        setdisabled(true)
        let res =  await axios.put(`${props.api}/post/like`, { username: props.currentUsername, postId: props.id })
        setdisabled(false)
        //console.log(res.data)
        props.setLiked(!props.liked)
    }

    return (
        <Card raised className={classes.cardBack} >
            <CardHeader 
                avatar={
                    <Box border={2} borderRadius="50%" className={classes.avatarBorder}>
                    <Avatar aria-label="profile-pic">{props.username[0].toUpperCase()}</Avatar> 
                    </Box>
                }
                title={props.username}
                subheader= {`${getDate()} by ${replaceYou()}`}
            />

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                {props.content}
                </Typography>
            </CardContent>

            <CardActions>
            <IconButton aria-label="like" onClick={likePost} disabled={disabled}>
          <ThumbUpIcon className={likeColor?classes.iconsLiked:classes.iconsUnliked} />
        </IconButton>
        <Typography variant="caption" color="textSecondary" className={classes.likeMargin}>{props.like}</Typography>
        {/* <IconButton aria-label="comment" disabled >
          <ChatBubbleOutlineIcon className={classes.iconsUnliked} />
        </IconButton> */}
            </CardActions>    
        </Card>
    )
}
