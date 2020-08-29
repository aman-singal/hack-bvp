import React from 'react'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root:{
        border: '1px solid black',
        marginTop: '2rem',
        marginBottom: '10px'
    },
    rootCard: {
        minWidth: 275,
        maxWidth: 700,
        marginTop: '2rem',
        marginBottom: '2rem',
        borderRadius: '25px'
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
  }));

function Profile() {

    const classes = useStyles();
    const [spacing, setSpacing] = React.useState(2);
    
    return (
        <div>
            <Container maxWidth="lg" className={classes.root} border={1}>
                <Typography variant="h1" component="h2" gutterBottom>Profile</Typography>
                <Grid container className={classes.root} spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" component="h2" >Name</Typography>
                  <Typography  gutterBottom>Shyam Singh</Typography>
                  <Typography variant="h6" component="h2" >Age</Typography>
                  <Typography  gutterBottom>23</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" component="h2" gutterBottom>Last Visit to Hospital</Typography>
                  <Typography  gutterBottom>13th August 2019</Typography>
                  <Typography variant="h6" component="h2" gutterBottom>Blood Group</Typography>
                  <Typography  gutterBottom>O+</Typography>
                </Grid>
                </Grid>
                <ProfileCards />
                <ProfileCards />
            </Container>
        </div>
    )
}

function ProfileCards(){

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.rootCard} elevation={6}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Maharaja Agarsen Hospital
        </Typography>
        <Typography variant="h5" component="h2">
          Stomach Pain
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          14th March 2020
        </Typography>
        <Typography variant="body2" component="p">
          Medication: - ShellCall 250 mg
        </Typography>
      </CardContent>
    </Card>
  );
}


export default Profile
