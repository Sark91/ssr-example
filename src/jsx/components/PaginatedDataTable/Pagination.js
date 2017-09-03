import React from 'react';
import { connect } from 'react-redux';
import { setLimit, setPage } from 'stores/table-data/actions';
import PropTypes from 'prop-types';
import { Pagination as BootstrapPagination, PaginationItem, PaginationLink } from 'reactstrap';
import lodashRange from 'lodash/range';

const itemsOnPage = [12, 24, 48];

class Pagination extends React.PureComponent {
  static propTypes = {
    reducer: PropTypes.string.isRequired,
    prop: PropTypes.string.isRequired,
    query: PropTypes.shape({
      _limit: PropTypes.number.isRequired, // eslint-disable-line no-underscore-dangle
      _page: PropTypes.number.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    pages: PropTypes.number.isRequired,
  };

  setPage = setPage(this.props.reducer, this.props.prop);
  setLimit = setLimit(this.props.reducer, this.props.prop);

  dispatchSetPage = page => this.props.dispatch(this.setPage(page));
  dispatchSetLimit = limit => this.props.dispatch(this.setLimit(limit));


  render() {
    // eslint-disable-next-line no-underscore-dangle
    const { _limit: limit, _page: page } = this.props.query;
    const pages = this.props.pages;

    return (
      <div className="paginated-data-table__items-on-page">
        <BootstrapPagination>
          <PaginationItem className="paginated-data-table__prev" disabled={page <= 1}>
            <PaginationLink href="#" onClick={() => this.dispatchSetPage(page - 1)}>
              Prev
            </PaginationLink>
          </PaginationItem>

          <PaginationItem className="paginated-data-table__page-info" disabled>
            <PaginationLink href="#">
              Page: {page} / {pages}
            </PaginationLink>
          </PaginationItem>

          {lodashRange(1, pages + 1).map(generatedPage => (
            <PaginationItem
              key={`page_${generatedPage}`}
              active={page === generatedPage}
              className={`paginated-data-table__page paginated-data-table__page-${generatedPage}`}
            >
              <PaginationLink href="#" onClick={() => this.dispatchSetPage(generatedPage)}>
                {generatedPage}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem disabled>
            <PaginationLink href="#">
              Items on page:
            </PaginationLink>
          </PaginationItem>

          {itemsOnPage.map(iop => (
            <PaginationItem
              key={iop}
              active={limit === iop}
              className={`paginated-data-table__items-on-page paginated-data-table__items-on-page-${iop}`}
            >
              <PaginationLink href="#" onClick={() => this.dispatchSetLimit(iop)}>
                {iop}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem className="paginated-data-table__next" disabled={page >= pages}>
            <PaginationLink href="#" onClick={() => this.dispatchSetPage(page + 1)}>
              Next
            </PaginationLink>
          </PaginationItem>
        </BootstrapPagination>
      </div>
    );
  }
}

export {
  Pagination,
};

export default connect(
  (state, props) => state[props.reducer][props.prop],
)(Pagination);