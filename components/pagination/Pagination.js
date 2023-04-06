import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
// import SelectDropdown from './../select-dropdown/SelectDropdown';
import styles from './Pagination.module.scss';

function Pagination({
  pageCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
  classNamePrefix = '',
  showPerPage = true
}) {
  const PREVIOUS_LABEL = 'Prev';
  const NEXT_LABEL = 'Next';
  const MARGIN_PAGES_DISPLAYED = 2;
  const PAGE_RANGE_DISPLAYED = 2;
  let doc = '';

  const [selectedOption, setSelectedOption] = useState({
    value: pageSize,
    label: pageSize + ' Records'
  });
  const options = [
    { value: 50, label: '50 Records' },
    { value: 20, label: '20 Records' },
    { value: 10, label: '10 Records' }
  ];
  const handlePageSizeChange = opt => {
    setSelectedOption(opt);
    onPageSizeChange(opt.value);
  };
  if (typeof document !== 'undefined') {
    doc = document;
  }
  return (
    <div className="flex items-center justify-center pagination-wrapper">
      <ReactPaginate
        previousLabel={PREVIOUS_LABEL}
        nextLabel={NEXT_LABEL}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={MARGIN_PAGES_DISPLAYED}
        pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
        onPageChange={onPageChange}
        containerClassName={styles.paginationContainer}
        pageClassName={styles.paginationItem}
        previousClassName={styles.paginationItem}
        nextClassName={styles.paginationItem}
        pageLinkClassName={styles.paginationItemLink}
        previousLinkClassName={styles.paginationItemLink}
        nextLinkClassName={styles.paginationItemLink}
        activeClassName={styles.selected}
        // activeLinkClassName={styles.selected}
      />
      {showPerPage && (
        <Select
          instanceId="pagination_Id"
          classNames={{
            control: state =>
              'pagination-test w-42 h-4 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500',
            option: state =>
              'pagination-test-2 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500'
          }}
          defaultValue={selectedOption}
          onChange={handlePageSizeChange}
          options={options}
          placeholder="No option selected"
          menuPlacement="bottom"
          menuPortalTarget={doc?.body}
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        />
      )}
    </div>
  );
}

export default Pagination;
