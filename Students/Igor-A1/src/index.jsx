import React from 'react';
import ReactDom from 'react-dom';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';

import Layout from './components/Layout/Layout.jsx'

import './style.css'

const theme = createMuiTheme({
  themeName: 'Simple Theme',
  palette: {
    primary: indigo,
    hovered: blue["400"],
    selected: indigo,
    secondary: cyan,
    background: {
       paper: indigo['50'],
       default: indigo['A100']
    }
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'Helvetica', 'sans-serif'].join(','),
    fontWeight: 400,
    fontSize: 14,
  },
  spacing: 2
});

ReactDom.render (
    <ThemeProvider theme={theme}>
        <Layout />
    </ThemeProvider>
    , document.getElementById('app')
);