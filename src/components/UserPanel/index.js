import UserPanel from './UserPanel';
import { connect } from 'react-redux';
import { selectors } from 'models/user';

const mapStateToProps = state => ({
  userID: selectors.userID(state)
});

export default connect(mapStateToProps)(UserPanel);
