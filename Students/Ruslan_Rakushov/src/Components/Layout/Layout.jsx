import React from 'react';
import PropTypes from 'prop-types';
import Router from '../../Router/Router.jsx';
import Header from '../Header/Header.jsx';
//redux
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

class Layout extends React.Component {
  // Констуктор нужен для задания локального state или привязки обработчика событий
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  
  render() {
    return (
      <div>
        <Header />
        <div>Layout</div>
        <Router />
      </div>
    )
  }
}
  
// Проверка типов пропсов
// Layout.propTypes = {
//   prop1: PropTypes.string.isRequired,
// }

// Значения пропсов по умолчанию
// Layout.defaultProps = {
//   prop1: 'ppp',
// }
  
const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
