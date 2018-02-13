import React from 'react';
import PropTypes from 'prop-types';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import IconButton from 'material-ui/IconButton';

import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

/**
 * Code copied from
 * https://github.com/franciskim722/materialui-pagination/blob/master/src/index.js
 *
 * The same source code is used for this npm package
 * https://www.npmjs.com/package/materialui-pagination
 *
 * But with React v.16, the following error was raised while using the npm package
 * ```Element ref was specified as a string (value0) but no owner was set.
 * You may have multiple copies of React loaded. ```
 *
 * So i preferred to copy the source code and use it separately
 */

const styles = {
    paginationContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: '.5em',
        fontSize: '.75em',
    },
    paginationSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationText: {
        margin: '0 1.25em',
    },
    paginationSelect: {
        width: 75,
        fontSize: '1em',
    },
    navigationLeft: {
        marginRight: '.5em',
        cursor: 'pointer',
    },
    navigationLeftFirstPage: {
        marginRight: '.5em',
        color: 'rgba(0,0,0,0.26)',
    },
    navigationRight: {
        margin: '0 .5em',
        cursor: 'pointer',
    },
    navigationRightLastPage: {
        margin: '0 .5em',
        color: 'rgba(0,0,0,0.26)',
    },
};

class Pagination extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.selectRowsPerPage = this.selectRowsPerPage.bind(this);
        this.selectPageNumber = this.selectPageNumber.bind(this);

        this.renderRowsPerPage = this.renderRowsPerPage.bind(this);
        this.renderRowRange = this.renderRowRange.bind(this);

        this.numberOfPages = this.numberOfPages.bind(this);

        this.incrementPage = this.incrementPage.bind(this);
        this.decrementPage = this.decrementPage.bind(this);
    }

    selectRowsPerPage(e) {
        const updatedState = Object.assign({}, this.props);
        updatedState.numberOfRows = parseInt(e.target.innerText, 10);
        if (updatedState.numberOfRows * this.props.page > this.props.total) {
            const updatedPage = Math.ceil(
                this.props.total / updatedState.numberOfRows,
                10,
            );
            updatedState.page = updatedPage;
            this.props.updateRows(updatedState);
        } else {
            this.props.updateRows(updatedState);
        }
    }

    selectPageNumber(e) {
        const updatedState = Object.assign({}, this.props);
        updatedState.page = parseInt(e.target.innerText, 10);
        this.props.updateRows(updatedState);
    }

    numberOfPages() {
        const numArray = [];
        for (
            let i = 0;
            i < Math.ceil(this.props.total / this.props.numberOfRows);
            i += 1
        ) {
            numArray.push(i + 1);
        }

        return numArray.map((pageValue, index) => (
            // eslint-disable-next-line
            <MenuItem key={index} value={pageValue} primaryText={pageValue} />
        ));
    }

    incrementPage() {
        const updatedState = Object.assign({}, this.props);
        updatedState.page += 1;
        this.props.updateRows(updatedState);
    }

    decrementPage() {
        const updatedState = Object.assign({}, this.props);
        updatedState.page -= 1;
        this.props.updateRows(updatedState);
    }

    renderRowsPerPage() {
        return this.props.rowsPerPage.map((rowValue, index) => (
            // eslint-disable-next-line
            <MenuItem key={index} value={rowValue} primaryText={rowValue} />
        ));
    }

    renderRowRange() {
        return (
            <span>
                {this.props.numberOfRows * this.props.page -
                    this.props.numberOfRows +
                    1}
                -
                {this.props.numberOfRows * this.props.page < this.props.total
                    ? this.props.numberOfRows * this.props.page
                    : this.props.total}
            </span>
        );
    }

    render() {
        const { pageTitle, rowsPerPageTitle, prepositionForRowRange } = this.props;

        return (
            <div style={styles.paginationContainer}>
                <div style={styles.paginationSection}>
                    <div style={styles.paginationText}>{pageTitle}</div>
                    <SelectField
                        style={styles.paginationSelect}
                        value={this.props.page}
                        onChange={this.selectPageNumber}
                    >
                        {this.props.total === 1 ? null : this.numberOfPages()}
                    </SelectField>
                </div>

                <div style={styles.paginationSection}>
                    <div style={styles.paginationText}>{rowsPerPageTitle}</div>
                    <SelectField
                        style={styles.paginationSelect}
                        value={this.props.numberOfRows}
                        onChange={this.selectRowsPerPage}
                    >
                        {this.renderRowsPerPage()}
                    </SelectField>
                </div>

                <div style={styles.paginationSection}>
                    <div style={styles.paginationText}>
                        {this.renderRowRange()} {prepositionForRowRange}{' '}
                        {this.props.total}
                    </div>
                </div>

                <div style={styles.paginationSection}>
                    <IconButton
                        iconStyle={
                            this.props.page <= 1
                                ? styles.navigationLeftFirstPage
                                : styles.navigationLeft
                        }
                        name="navigationLeft"
                        disabled={this.props.page <= 1}
                        onTouchTap={this.decrementPage}
                    >
                        <ChevronLeft />
                    </IconButton>
                    <IconButton
                        iconStyle={
                            this.props.page >=
                            this.props.total / this.props.numberOfRows
                                ? styles.navigationRightLastPage
                                : styles.navigationRight
                        }
                        name="navigationRight"
                        disabled={
                            this.props.page >=
                            this.props.total / this.props.numberOfRows
                        }
                        onTouchTap={this.incrementPage}
                    >
                        <ChevronRight />
                    </IconButton>
                </div>
            </div>
        );
    }
}

Pagination.defaultProps = {
    total: 0,
    page: 1,
    rowsPerPage: [10, 20, 30],
    numberOfRows: 10,
    pageTitle: 'Page:',
    rowsPerPageTitle: 'Rows Per Page:',
    prepositionForRowRange: 'of',
};

Pagination.propTypes = {
    total: PropTypes.number,
    page: PropTypes.number,
    numberOfRows: PropTypes.number,
    rowsPerPage: PropTypes.array,
    updateRows: PropTypes.func.isRequired,
    pageTitle: PropTypes.string,
    rowsPerPageTitle: PropTypes.string,
    prepositionForRowRange: PropTypes.string,
};

export default Pagination;
