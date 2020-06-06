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



export default function Post() {
    const classes = useStyles()
    return (
        <Card raised className={classes.cardBack} >
            <CardHeader 
                avatar={
                    <Box border={2} borderRadius="50%" className={classes.avatarBorder}>
                    <Avatar aria-label="profile-pic">A</Avatar> 
                    </Box>
                }
                title="User Name"
                subheader= "May 20 2020"
            />

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                This impressive paella is a perfect party dish and a fun meal to cook together with your
                guests. Add 1 cup of frozen peas along with the mussels, if you like.
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
