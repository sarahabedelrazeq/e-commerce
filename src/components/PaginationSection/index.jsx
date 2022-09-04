import React from "react";
import { Pagination as BPagination } from "react-bootstrap";
import { usePagination } from "hooks";

export default function Pagination({ count, perPage }) {
  const { page, handleSetPage, onPrev, onNext } = usePagination();
  const siblingCount = 2;
  const totalCount = Math.ceil(count / perPage);

  const calculateRange = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const range = React.useMemo(() => {
    const totalPageNumbers = siblingCount + 3;
    if (totalPageNumbers >= totalCount) {
      return calculateRange(1, totalCount);
    }

    /*
          Calculate left and right sibling index and make sure they are within range 1 and totalCount
        */
    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalCount);

    const firstPageIndex = 1;
    const lastPageIndex = totalCount;

    let middleRange = calculateRange(leftSiblingIndex, rightSiblingIndex);

    if (page - siblingCount <= firstPageIndex)
      return [...middleRange, lastPageIndex];
    else if (page + siblingCount >= totalCount)
      return [firstPageIndex, ...middleRange];
    return [firstPageIndex, ...middleRange, lastPageIndex];
  }, [totalCount, siblingCount, page]);

  if (page === 0 || range.length < 2) {
    return null;
  }

  return (
    <>
      {totalCount !== 1 && (
        <div id="PaginationSection">
          <BPagination>
            {page > 1 && <BPagination.Prev onClick={onPrev} />}
            {range.map((pageNumber, index) => (
              <BPagination.Item
                key={index}
                active={pageNumber === page}
                onClick={() => handleSetPage(pageNumber)}
              >
                <div>{pageNumber}</div>
              </BPagination.Item>
            ))}
            {page < totalCount && <BPagination.Next onClick={onNext} />}
          </BPagination>
        </div>
      )}
    </>
  );
}
