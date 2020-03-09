import React from "react";
import PropTypes from "prop-types";
import "typeface-roboto";
import { Provider } from "react-redux";
import {
  ThemeProvider,
  createMuiTheme,
  CssBaseline,
  Container,
  Grid,
  Fab
} from "@material-ui/core";
import "./style.css";

import Messages from "../MessagesField/MessagesField.jsx";
import Header from "../Header/Header.jsx";
import Rooms from "../Rooms/Rooms.jsx";
import initStore from "../../store/store.js";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Roboto", "Arial"].join(",")
  },
  overrides: {
    MuiContainer: {
      root: {
        height: "100vh",
        overflow: "hidden"
      }
    }
  }
});

export default class Layout extends React.Component {
  static propTypes = {
    chatID: PropTypes.number,
    user: PropTypes.string
  };
  static defaultProps = {
    chatId: 1,
    user: "Darth Vader"
  };
  render() {
    return (
      <Provider store={initStore()}>
        <ThemeProvider theme={theme}>
          <CssBaseline></CssBaseline>
          <Container maxWidth="lg">
            <Header chatId={this.props.chatId} />
            <Grid
              container
              direction="row"
              justify="space-around"
              align-items="flex-start"
              spacing={1}
              className="wrapperGrid"
            >
              <Grid item xs={3} className="panel">
                <Rooms />
              </Grid>
              <Grid item xs={9} className="panel"></Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </Provider>
    );
  }
}
//<ChatRooms />
/* <Grid
  container
  direction="row"
  justify="space-around"
  align-items="flex-start"
  spacing={1}
  className="wrapperGrid"
>
  <Grid item xs={3} className="panel">
    <ChatRooms />
  </Grid>
  <Grid item xs={9} className="panel">
    <Messages
      chatId={Number(this.props.chatId)}
      user={this.props.user}
    />
  </Grid>
</Grid> */
