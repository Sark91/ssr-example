import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { refreshData } from 'stores/table-data/actions';
import DataTable from 'jsx/components/DataTable';
import Pagination from 'jsx/components/PaginatedDataTable/Pagination';

class PaginatedDataTable extends React.PureComponent {
  static propTypes = {
    model: DataTable.propTypes.model, // eslint-disable-line react/require-default-props
    data: DataTable.propTypes.data, // eslint-disable-line react/require-default-props
    reducer: PropTypes.string.isRequired,
    prop: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    status: PropTypes.oneOf(['fetch', 'success', 'error']).isRequired,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  };

  static defaultProps = {
    error: null,
  };

  componentDidMount() {
    this.dispatchRefreshData();
  }

  refreshData = refreshData(this.props.reducer, this.props.prop);
  dispatchRefreshData = () => this.props.dispatch(this.refreshData());

  render() {
    if (this.props.status === 'fetch') {
      return (
        <div className="paginated-data-table__info-block">
          Data is loading
        </div>
      );
    }

    if (this.props.status === 'error') {
      return (
        <div
          className="paginated-data-table__info-block paginated-data-table__info-block--error"
        >
          Cannot fetch data, reason: {this.props.error.toString()}
        </div>
      );
    }

    if (!this.props.data.length) {
      return (
        <div className="paginated-data-table__info-block">
          No data to show
        </div>
      );
    }

    return (
      <div className="paginated-data-table">
        <Pagination reducer={this.props.reducer} prop={this.props.prop} />
        <DataTable
          model={this.props.model}
          data={this.props.data}
        />
        <Pagination reducer={this.props.reducer} prop={this.props.prop} />
      </div>
    );
  }
}

export {
  PaginatedDataTable,
};

export default connect(
  (state, props) => state[props.reducer][props.prop],
)(PaginatedDataTable);