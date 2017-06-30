import React, { PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Link, browserHistory } from 'react-router';
import InlineSVG from 'react-inlinesvg';
import * as AssignmentActions from '../actions/assignment';
import * as ClassroomActions from '../actions/classroom';
import * as ProjectActions from '../actions/project';
import * as ToastActions from '../actions/toast';

const exitUrl = require('../../../images/exit.svg');
const trashCan = require('../../../images/trash-can.svg');

class AssignmentList extends React.Component {
  constructor(props) {
    super(props);
    this.closeAssignmentList = this.closeAssignmentList.bind(this);
    // this.props.getAssignments(this.props.classroomid);
    console.log(this.props.classroom);
    console.log(this.props);
  }

  componentDidMount() {
    document.getElementById('assignmentlist').focus();
  }

  closeAssignmentList() {
    browserHistory.push(this.props.previousPath);
  }

  render() {
    return (
      <section className="sketch-list" aria-label="classroom list" tabIndex="0" role="main" id="assignmentlist">
        <header className="sketch-list__header">
          <h2 className="sketch-list__header-title">Assignments in CLASSROOM_NAME_HERE</h2>
          <button className="sketch-list__exit-button" onClick={this.closeClassroomList}>
            <InlineSVG src={exitUrl} alt="Close Classroom List Overlay" />
          </button>
        </header>
        <div className="sketches-table-container">
          <table className="sketches-table" summary="table containing all classes you own or are a member of">
            <thead>
              <tr>
                <th className="sketch-list__trash-column" scope="col"></th>
                <th scope="col">Classroom Name</th>
                <th scope="col">Date created</th>
                <th scope="col">Date updated</th>
              </tr>
            </thead>
            <tbody>
              { /* {this.props.assignments.map(assignment =>
                // eslint-disable-next-line
                <tr
                  className="sketches-table__row visibility-toggle"
                  key={assignment._id}
                  onClick={() => browserHistory.push(`/assignment/${assignment._id}`)}
                >
                  <th scope="row"><Link to={`/assignment/${assignment._id}`}>{assignment.name}</Link></th>
                  <td>{moment(assignment.createdAt).format('MMM D, YYYY h:mm A')}</td>
                </tr>
              )} */}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

AssignmentList.propTypes = {
  // getAssignments: PropTypes.func.isRequired,
  /* assignments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  })).isRequired, */
  classroom: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  previousPath: PropTypes.string.isRequired,
};

AssignmentList.defaultProps = {
  // classroom: undefined
};

function mapStateToProps(state) {
  return {
    classroom: state.classroom,
    // assignments: state.assignments
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ClassroomActions, ProjectActions, ToastActions, AssignmentActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentList);
