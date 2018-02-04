import UserPanel from './UserPanel';
import { connect } from 'react-redux';
import { selectors, actions } from 'models/user';

const mapStateToProps = state => ({
  user: selectors.getUser(state)
});

const mapDispatchToProps = dispatch => ({
  setUser: (user) => dispatch(actions.setUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
