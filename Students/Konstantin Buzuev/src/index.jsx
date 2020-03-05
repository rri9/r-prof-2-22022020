import React from 'react'
import ReactDom from 'react-dom'
import 'bootstrap'
import 'typeface-roboto'
/*REDUX*/
import { Provider } from 'react-redux'
import initStore from './store/store.js'

import {
	ThemeProvider,
	createMuiTheme,
	CssBaseline,
	Container,
	Grid,
	Fab,
} from '@material-ui/core'

import Messages from './components/MessagesField/MessagesField.jsx'
import Header from './components/Header/Header.jsx'
import ChatRooms from './components/ChatRooms/ChatRooms.jsx'

let user = 'Constantine'

const theme = createMuiTheme({
	typography: {
		fontFamily: ['Roboto', 'Arial'].join(','),
	},
})

//ReactDom.render(<Messages usr={user} />, document.getElementById("app"));
ReactDom.render(
	<Provider store={initStore()}>
		<ThemeProvider theme={theme}>
			<CssBaseline></CssBaseline>
			<Container maxWidth="lg">
				<Header></Header>
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
						<Messages user={user} />
					</Grid>
				</Grid>
			</Container>
		</ThemeProvider>
	</Provider>,
	document.getElementById('app')
)
