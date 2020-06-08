import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Box } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

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
    }

}))



export default function Post(props) {
    const classes = useStyles()

    const months = ["Placeholder","January", "February", "March", "April", "May", "June", "July",
                        "August", "September", "October", "November", "December"]

    const getDate = () => {
        const date = props.createdAt.split("T")[0].split("-");
        const day = date[2]
        const month = months[parseInt(date[1])]
        const year = date[0]

        return `${month} ${day} ${year}`
    }
    return (
        <Card raised className={classes.cardBack} >
            <CardHeader 
                avatar={
                    <Box border={2} borderRadius="50%" className={classes.avatarBorder}>
                    <Avatar aria-label="profile-pic">{props.name[0]}</Avatar> 
                    </Box>
                }
                title={props.name}
                subheader= {getDate()}
            />

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                {props.content}
                </Typography>
            </CardContent>

            <CardActions>
            <IconButton aria-label="like">
          <ThumbUpIcon className={classes.iconsUnliked} />
        </IconButton>
        <IconButton aria-label="comment">
          <ChatBubbleOutlineIcon className={classes.iconsUnliked} />
        </IconButton>
            </CardActions>    
        </Card>
    )
}
