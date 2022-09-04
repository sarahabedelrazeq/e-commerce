import React from "react";
import { Container } from "react-bootstrap";
import { MainSection, Gallery, GallerySkeleton } from "components";
import { useFetch, usePagination } from "hooks";
import { useSelector } from "react-redux";

const CategoryTypes = () => {
  const { categoryTypes } = useSelector((state) => state.app);
  const [currentTab, setCurrentTab] = React.useState(null);
  const { page, handleSetPage } = usePagination();
  const [categoriesResponse, categoriesRequest] =
    useFetch("agent/get-category");

  const handleSetTab = (val) => {
    handleSetPage(1);
    setCurrentTab(val);
  };

  React.useEffect(() => {
    if (!currentTab && categoryTypes.length > 0) {
      setCurrentTab(categoryTypes[0].id);
    }
  }, [categoryTypes, currentTab]);

  React.useEffect(() => {
    if (currentTab) {
      categoriesRequest(null, `?type_id=${currentTab}&page=${page}`);
    }
  }, [categoriesRequest, page, currentTab]);

  return (
    <div id="Category-types-page" className="pt-5 page-container">
      <section>
        <Container>
          <MainSection
            tabs={categoryTypes}
            currentTab={currentTab}
            setCurrentTab={handleSetTab}
          />
        </Container>
      </section>
      <section>
        <Container>
          {categoriesResponse.loading || currentTab == null ? (
            <GallerySkeleton/>
          ) : (
            <Gallery
              data={categoriesResponse.result.data}
              meta={categoriesResponse.result.meta}
              category
            />
          )}
        </Container>
      </section>
    </div>
  );
};

export default CategoryTypes;
