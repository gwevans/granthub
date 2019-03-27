import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFileData } from '../../foundational/reducers/app';
import Typography from '@material-ui/core/Typography';

class File extends Component {

    static propTypes = {
        fileData: PropTypes.object,
        active: PropTypes.bool,
    }

    static defaultProps = {
        fileData: {},
        active: false,
    }

    getFilename() {
        const { fileData } = this.props;
        return fileData.filename;
    }

    getStyle() {
        const { active } = this.props;

        let style = {
            cursor: 'pointer',
            padding: '2px 10px',
        }

        if (active) {
            style = {
                ...style,
                backgroundColor: '#D7D9D9',
                borderRadius: '3px',
            }
        }

        return style;
    }

    getColor() {
        const { fileData } = this.props;
        switch (fileData.status) {
            case 'modified':
                return 'default';
            case 'added':
                return 'primary';
            case 'deleted':
                return 'error';
        }
    }

    handleOnClick(fileData) {
        const { dispatch } = this.props;
        dispatch(setFileData(fileData));
    }

    render() {
        const { fileData } = this.props;

        return (
            <div style={this.getStyle()} onClick={() => this.handleOnClick(fileData)}>
                <Typography color={this.getColor()} component="h6" variant="h6">
                    {this.getFilename()}
                </Typography>
            </div>
        );
    }
}

export default connect()(File);