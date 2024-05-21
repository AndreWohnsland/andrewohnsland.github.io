import React from 'react'
import { useQuery } from 'react-query'
import { getElements } from '../../util/apiHelper'
import { Link } from 'react-router-dom'
import { IElement } from '../../Interfaces/element.interface'

const queryOption = {
  staleTime: 300000,
  cacheTime: 3600000,
  retry: 1,
}

type ElementViewProps = {
  elementType: string
  elementData: IElement
}

const Recommender: React.FC<ElementViewProps> = ({
  elementType,
  elementData,
}) => {
  const { data: similarData, status: similarStatus } = useQuery(
    `${elementType}s`,
    () => getElements(elementType),
    { ...queryOption },
  )

  const recommended = similarData
    ?.filter((dat) => {
      return dat.category.some((cat) => elementData.category.includes(cat))
    })
    .filter((dat) => dat.title != elementData.title)

  return (
    <div className="similar-projects">
      {similarStatus === 'success' &&
        recommended &&
        recommended.length != 0 && (
          <>
            <hr className="blog-divider" />
            <h6>You may also like:</h6>
            <div className="blog-recommendation-holder">
              {recommended.map((element) => {
                return (
                  <p>
                    <Link
                      to={`/${elementType}/${element.slug}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <span className="blog-recommended">{element.title}</span>
                    </Link>
                  </p>
                )
              })}
            </div>
          </>
        )}
    </div>
  )
}

export default Recommender
