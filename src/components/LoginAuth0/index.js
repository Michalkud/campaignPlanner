import LoginAuth0 from './LoginAuth0';
import { connect } from 'react-redux';
import { actions } from 'models/user';



const mapDispatchToProps = dispatch => ({
  setUser: (user) => dispatch(actions.setUser(user))
});

export default connect(() => {}, mapDispatchToProps)(LoginAuth0);
