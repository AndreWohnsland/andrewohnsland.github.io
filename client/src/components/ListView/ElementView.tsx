import React, { useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import MarkdownBlock from './MarkdownBlock'
import useResize from './resize'
import dateFormatter from './dateFormatter'
import CaptionBanner from '../CaptionBanner'
import { getElementData } from '../../util/apiHelper'
import capFirst from '../../util/stringHelper'
import { IElement } from '../../Interfaces/element.interface'
import Recommender from './Recommender'
import NotFoundElement from './NotFoundElement'

const queryOption = {
  staleTime: 300000,
  cacheTime: 3600000,
  retry: 1,
}

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
}

type ElementViewProps = {
  elementType: string
}

type ParamTypes = {
  _id: string
}

const ElementView: React.FC<ElementViewProps> = ({ elementType }) => {
  const params = useParams<ParamTypes>()
  const id = params._id!
  const divRef = useRef(null)
  const maxWidth = useResize(divRef)

  useEffect(() => {
    document.title = `${capFirst(elementType)} | ${
      process.env.REACT_APP_SHOWN_NAME
    }`
  }, [elementType])

  const { data, status } = useQuery(
    `${elementType}?id=${id}`,
    () => getElementData(elementType, id),
    queryOption,
  )

  const createDateTag = (d: IElement): string => {
    return `Created: ${dateFormatter(
      d.createdAt,
    )} | Latest update: ${dateFormatter(d.updatedAt)}`
  }

  const chooseHeader = (s: string, d: IElement | undefined) => {
    if (s === 'loading') return 'Loading ....'
    if (s === 'error') return 'Error getting data!'
    if (s === 'success' && d) return `${d.title}${d.draft ? ' (Draft)' : ''}`
    return 'Error getting data!'
  }

  let linkDescription = 'here for more impressions'
  if (data?.link?.includes('github')) {
    linkDescription = 'at GitHub'
  }

  return (
    <>
      <CaptionBanner text={chooseHeader(status, data)} />
      {status === 'error' ? (
        <NotFoundElement elementType={elementType} />
      ) : (
        <main className="content-container h-100">
          <div className="main-text-page" ref={divRef}>
            <div className="spinner-container">
              {status === 'loading' && <p>&nbsp;</p>}
              <HashLoader
                loading={status === 'loading'}
                color="#004ea7"
                cssOverride={override}
                size={(maxWidth as number) / 2}
              />
            </div>
            {status === 'success' && data && (
              <>
                <p className="blog-date">{createDateTag(data)}</p>
                <p className="blog-description">{data.description}</p>
                <p className="blog-categories">
                  Categories: {data.category.sort().join(', ')}
                </p>
                <hr className="blog-divider" />
                <MarkdownBlock sourcedata={data.text} maxWidth={maxWidth} />
                {elementType === 'project' && (
                  <p>
                    {'Interested? Look into the project '}
                    <a href={data.link}>{linkDescription}</a>
                  </p>
                )}
                <Recommender
                  elementType={elementType}
                  elementData={data}
                ></Recommender>
              </>
            )}
          </div>
        </main>
      )}
    </>
  )
}

export default ElementView
