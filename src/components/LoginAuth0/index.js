import LoginAuth0 from './LoginAuth0';
import { connect } from 'react-redux';
import { selectors, actions } from 'models/user';


const mapStateToProps = state => ({
  userID: selectors.userID(state)
});

const mapDispatchToProps = dispatch => ({
  setUserID: (id) => dispatch(actions.setUserID(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginAuth0);
