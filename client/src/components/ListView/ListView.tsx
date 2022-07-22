import React, { useContext, useEffect, useState } from 'react';
import { QueryStatus, useQuery } from 'react-query';
import ElementCard from './ElementCard';
import CaptionBanner from '../CaptionBanner';
import {
  getAllCategories,
  getElements,
  getElementsAsAdmin,
} from '../../util/apiHelper';
import capFirst from '../../util/stringHelper';
import SkeletonArticle from '../../skeletons/SkeletonArticle';
import CategorySelect from './CategorySelect';
import {
  SelectProps,
  OnSelectChangeValue,
} from '../../Interfaces/categorySelect.interface';
import { IElement } from '../../Interfaces/element.interface';
import { AuthContext } from '../../contexts/AuthContext';

const queryOption = {
  staleTime: 60000,
  cacheTime: 3600000,
};

type ListViewProps = {
  elementType: string;
  header: string;
};

const ListView: React.FC<ListViewProps> = ({ elementType, header }) => {
  const [selectedCats, setSelectedCats] = useState<SelectProps[]>([]);
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    setSelectedCats([]);
    document.title = `${capFirst(elementType)} | ${
      process.env.REACT_APP_SHOWN_NAME
    }`;
  }, [elementType]);

  const getElementFunction = (auth: boolean | null) => {
    if (auth) {
      return getElementsAsAdmin;
    }
    return getElements;
  };

  const { data, status } = useQuery(
    `${elementType}s`,
    () => getElementFunction(isAuth)(elementType),
    { ...queryOption }
  );

  const { data: catdata, status: catstauts } = useQuery(
    `${elementType}s_cats`,
    () => getAllCategories(elementType),
    { ...queryOption }
  );

  const generateCategories = (
    categories: string[] | undefined,
    categoryStatus: QueryStatus
  ): SelectProps[] => {
    if (
      categories === undefined ||
      categoryStatus === 'loading' ||
      categoryStatus === 'error'
    )
      return [];
    return categories.map((cat) => {
      return { value: cat, label: cat };
    });
  };

  const handleChange = (e: OnSelectChangeValue) => {
    if (e.length === 0) {
      setSelectedCats([]);
    } else {
      setSelectedCats(
        e.map((element) => {
          return element;
        })
      );
    }
  };

  const filterElementsByCategory = (dataToFilter: IElement[]): IElement[] => {
    return dataToFilter.filter((dat) => {
      return (
        selectedCats.length === 0 ||
        dat.category.some((cat1) =>
          selectedCats
            .map((v) => {
              return v.value;
            })
            .includes(cat1)
        )
      );
    });
  };

  const categoryInfo = generateCategories(catdata, catstauts);

  return (
    <>
      <CaptionBanner text={header} />
      <div className="main-text">
        {status === 'loading' &&
          [1, 2, 3, 4, 5].map((n) => <SkeletonArticle key={n} theme="dark" />)}
        {status === 'error' && <p>Error fetching data!</p>}
        {status === 'success' && data && (
          <>
            <CategorySelect
              categoryInfo={categoryInfo}
              categoryValue={selectedCats}
              onChange={handleChange}
            />
            {filterElementsByCategory(data).map((element) => {
              return (
                <ElementCard
                  key={element._id}
                  element={element}
                  elementType={elementType}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default ListView;
