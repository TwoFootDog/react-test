import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as RESTAPI from '../Common/RestApi';
import axios from 'axios';

// function MadeWithLove() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Built with love by the '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Material-UI
//       </Link>
//       {' team.'}
//     </Typography>
//   );
// }

const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class SignUp extends React.Component {
  state = {
    userId: null,
    userPasswd: null,
    userEmail: null,
    userFirstName: null,
    userLastName: null,
  }

  constructor(props) {
    super(props);
  }

  postSend = async () => {
    // const {userId, userPasswd, userEmail, userFirstName, userLastName} = this.state;
    const user = {
      userId: this.state.userId,
      userPasswd: this.state.userPasswd,
      userEmail: this.state.userEmail,
      userFirstName: this.state.userFirstName,
      userLastName: this.state.userLastName,
    }
    try {
      // await RESTAPI.registMember(user);
      axios.post('http://127.0.0.1:8080/member/register', {user}, {headers: {'Content-Type': 'application/json'}})
    } catch(err) {
      console.log(err);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault(); // 페이지 리로딩 방지
    // post function 호출
    // this.postSend();
    const user = {
      userId: this.state.userId,
      userPasswd: this.state.userPasswd,
      userEmail: this.state.userEmail,
      userFirstName: this.state.userFirstName,
      userLastName: this.state.userLastName,
    }
    try {
      console.log(user);
      // await RESTAPI.registMember(user);
      axios.post('http://127.0.0.1:8080/member/register', JSON.stringify(user), {headers: {'Content-Type': 'application/json'}})
    } catch(err) {
      console.log(err);
    }

    // this.setState({
    //   userId: null,
    //   userPasswd: null,
    //   userEmail: null,
    //   userFirstName: null,
    //   userLastName: null,
    // })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    const {classes} = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="userFirstName"
                  variant="filled"
                  required
                  fullWidth
                  id="userFirstName"
                  label="First Name"
                  value={this.userFirstName}
                  onChange={this.handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  id="userLastName"
                  label="Last Name"
                  name="userLastName"
                  autoComplete="lname"
                  value={this.userLastName}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  id="userEmail"
                  label="Email Address"
                  name="userEmail"
                  autoComplete="email"
                  value={this.userEmail}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  id="userId"
                  label="User ID"
                  name="userId"
                  value={this.userId}
                  onChange={this.handleChange}
                  // autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  name="userPasswd"
                  label="Password"
                  type="password"
                  id="userPasswd"
                  autoComplete="current-password"
                  value={this.userPasswd}
                  onChange={this.handleChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item xs>
                <Link href="/SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {/* <Box mt={5}>
          <MadeWithLove />
        </Box> */}
      </Container>
    );
  }
  
}
export default withStyles(useStyles)(SignUp);