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

import Messages from "../MessagesField/MessagesField.jsx";
import Header from "../Header/Header.jsx";
import ChatRooms from "../ChatRooms/ChatRooms.jsx";
import initStore from "../../store/store.js";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Roboto", "Arial"].join(",")
  }
});

export default class Layout extends React.Component {
  static propTypes = {
    chatId: PropTypes.number
  };
  static defaultProps = {
    chatId: 1
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
            >
              <Grid item xs={3}>
                <ChatRooms />
              </Grid>
              <Grid item xs={9}>
                <Messages user={this.props.user} />
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </Provider>
    );
  }
}
