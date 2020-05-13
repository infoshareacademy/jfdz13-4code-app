import React, { Component } from "react";
import {
  Paper,
  Grid,
  Avatar,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Input,
  IconButton,
} from "@material-ui/core";
import styles from "./UserPanel.module.css";
import placeholder from "../ee11528c2192ed4402d96c564d38d05f.svg";
import firebase from "firebase";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { connect } from "react-redux";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

class ProfilePanel extends Component {
  state = {
    file: null,
    url: "",
    ref: null,
    user: null,
    open: false,
    avatarType: " ",
    openFileWindow: false,
  };

  componentDidMount() {
    const ref = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
      this.fetchAvatarUrl();
    });

    this.setState({ ref });
  }

  componentWillUnmount() {
    this.state.ref();
  }

  handleOnChange = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  };

  handleOnClick = () => {
    firebase
      .storage()
      .ref(`avatars/${this.state.user.uid}`)
      .put(this.state.file)
      .then(() => {
        this.fetchAvatarUrl();
      });
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleOnImageClick = (event) => {
    this.setState({
      avatarType: event.target.src.slice(-27),
    });
  };

  handleOnImageAdd = () => {
    if (this.state.avatarType) {
      localStorage.setItem("avatar", this.state.avatarType);
      firebase
        .storage()
        .ref(`avatars/${this.state.user.uid}`)
        .delete()
        .finally(() => {
          this.fetchAvatarUrl();
        });
    }
  };

  fetchAvatarUrl = () => {
    firebase
      .storage()
      .ref(`avatars/${this.state.user.uid}`)
      .getDownloadURL()
      .then((url) => {
        this.setState({
          url,
        });
      })
      .catch(() => {
        const avatar = localStorage.getItem("avatar");
        if (avatar) {
          this.setState({
            url: avatar,
          });
        } else {
          this.setState({
            url: "",
          });
        }
      });
  };

  removeAvatar = () => {
    firebase
      .storage()
      .ref(`avatars/${this.state.user.uid}`)
      .delete()
      .finally(() => {
        this.fetchAvatarUrl();
        localStorage.removeItem("avatar");
      });
  };

  showFileWindow = () => {
    this.setState({
      openFileWindow: true,
    });
  };

  closeFileWindow = () => {
    this.setState({
      openFileWindow: false,
    });
  };

  getTimeWithUs = (creationDate) => {
    const daysDifference = differenceInCalendarDays(
      new Date(creationDate),
      new Date(Date.now())
    );
    switch (daysDifference) {
      case 0:
        return "Witaj w naszym gronie";
      case 1:
        return `Jesteś z nami ${daysDifference} dzień`;
      default:
        return `Jesteś z nami już ${daysDifference} dni`;
    }
  };

  render() {
    const { userData } = this.props;
    {
      console.log(userData);
    }
    console.log(new Date(userData[0].creationDate));
    console.log(new Date(Date.now()));
    console.log(typeof userData[0].creationDate);
    console.log(typeof new Date(Date.now()));
    return (
      this.state.user && (
        <Paper elevation={3} className={styles.paper}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <div className={styles.avatarContainer}>
              <div className={styles.button}>
                {this.state.url ? (
                  <Button onClick={this.handleOpen}> Zmień zdjęcie</Button>
                ) : (
                  <Button onClick={this.handleOpen}> Dodaj zdjęcie</Button>
                )}
                <Dialog
                  fullWidth="true"
                  open={this.state.open}
                  keepMounted
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <div className={styles.dialogTop}>
                    <DialogTitle>
                      Dodaj zdjęcie
                      <IconButton onClick={this.showFileWindow}>
                        <AddCircleOutlineIcon
                          color="primary"
                          style={{ width: "40", height: "40" }}
                        ></AddCircleOutlineIcon>
                      </IconButton>
                    </DialogTitle>
                  </div>
                  <Dialog
                    open={this.state.openFileWindow}
                    keepMounted
                    onClose={this.handleClose}
                  >
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
                      <Input type="file" onChange={this.handleOnChange} />

                      <Button onClick={this.handleOnClick}>Dodaj</Button>
                    </DialogContent>
                    <IconButton onClick={this.closeFileWindow}>
                      <CloseIcon />
                    </IconButton>
                  </Dialog>
                  <DialogTitle>Wybierz avatar</DialogTitle>
                  <DialogContent className={styles.avatarsContainer}>
                    <img
                      alt="avatar"
                      onClick={this.handleOnImageClick}
                      src="images/avatars/avatar5.png"
                      className={styles.avatars}
                    />
                    <img
                      alt="avatar"
                      onClick={this.handleOnImageClick}
                      src="images/avatars/avatar6.png"
                      className={styles.avatars}
                    />
                    <img
                      alt="avatar"
                      onClick={this.handleOnImageClick}
                      src="images/avatars/avatar7.png"
                      className={styles.avatars}
                    />
                    <img
                      alt="avatar"
                      onClick={this.handleOnImageClick}
                      src="images/avatars/avatar8.png"
                      className={styles.avatars}
                    />
                    <img
                      alt="avatar"
                      onClick={this.handleOnImageClick}
                      src="images/avatars/avatar9.png"
                      className={styles.avatars}
                    />
                    <img
                      alt="avatar"
                      onClick={this.handleOnImageClick}
                      src="images/avatars/avatar10.png"
                      className={styles.avatars}
                    />
                    <Button onClick={this.handleOnImageAdd}>Dodaj</Button>
                  </DialogContent>
                  <div>
                    <DialogActions style={{ marginTop: "20px" }}>
                      <Button
                        onClick={this.removeAvatar}
                        style={{ color: "red" }}
                      >
                        Usuń zdjęcie
                      </Button>

                      <Button
                        onClick={this.handleClose}
                        style={{ color: "black" }}
                      >
                        Wyjdź
                      </Button>
                    </DialogActions>
                  </div>
                </Dialog>
              </div>
              <Avatar
                alt="avatar"
                src={this.state.url || placeholder}
                className={styles.avatar}
                style={{ height: "150px", width: "150px" }}
              />
            </div>
            <Typography
              variant="body1"
              style={{ textAlign: "center", margin: "20px 0" }}
            >
              <div>Witaj</div>
              {userData[0].name}
            </Typography>
            <Typography variant="body1" style={{ textAlign: "center" }}>
              {this.getTimeWithUs(userData[0].creationDate)}
            </Typography>
          </Grid>
        </Paper>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.users.userData,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePanel);
