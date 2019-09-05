import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { changeFirstName, changeSecondName } from '../store/actions'

class TestComponent extends React.Component {
    render() {
        const { firstName, secondName, changeFirstName, changeSecondName } = this.props;

        return (
            <div>
                <div>
                    <input
                        type="text"
                        value={firstName}
                        placeholder="Firts Name"
                        onChange={(e) => {
                            changeFirstName(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={secondName}
                        placeholder="Second Name"
                        onChange={(e) => {
                            changeSecondName(e.target.value);
                        }}
                    />
                </div>
                <div>
                    {firstName} {secondName}
                </div>
            </div>
        )
    }
}

const putStateToProps = (state) => {
    console.log(state);
    return {
        firstName: state.firstName,
        secondName: state.secondName
    };
};

const putActionsToProps = (dispatch) => {
    return {
        changeFirstName: bindActionCreators(changeFirstName, dispatch),
        changeSecondName: bindActionCreators(changeSecondName, dispatch),
    };
}

export default connect(putStateToProps, putActionsToProps)(TestComponent);