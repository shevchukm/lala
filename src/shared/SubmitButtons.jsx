import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const SubmitButtons = props =>{
    return(
        <Button.Group>
            <Button onClick={props.onHandleReset}>Reset</Button>
            <Button.Or />
            <Button
                onClick={props.onHandleSubmit}
                positive
            >
                {props.submitName}
            </Button>
        </Button.Group>
    );
};

SubmitButtons.propTypes = {
    onHandleReset: PropTypes.func,
    onHandleSubmit: PropTypes.func,
    submitName: PropTypes.string
};

SubmitButtons.defaultProps = {
    submitName: 'Submit'
}

export default SubmitButtons;
