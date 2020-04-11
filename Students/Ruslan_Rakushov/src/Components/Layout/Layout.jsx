import React from 'react';
import PropTypes from 'prop-types';
import Router from '../../Router/Router.jsx';
import Header from '../Header/Header.jsx';
//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { loadChats } from '../../store/actions/chatActions.js';

import './Layout.css';

class Layout extends React.Component {
  // Констуктор нужен для задания локального state или привязки обработчика событий
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  componentDidMount() {
    this.props.loadChats();
  }

  render() {
    return (
      <div className='layout'>
        <Header />
        <Router />
      </div>
    )
  }
}
  
// Проверка типов пропсов
Layout.propTypes = {
  // loadChats: PropTypes.func.isRequired,
}

// Значения пропсов по умолчанию
// Layout.defaultProps = {
//   prop1: 'ppp',
// }
  
const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadChats,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
