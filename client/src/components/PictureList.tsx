import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import PhotoAlbum from 'react-photo-album'
import CaptionBanner from './CaptionBanner'
import { getAllImageData } from '../util/apiHelper'
import SkeletonPicture from '../skeletons/SkeletonPicture'

const queryOption = {
  staleTime: 600000,
  cacheTime: 3600000,
}

type ParamTypes = {
  _category: string
}

const PictureList: React.FC = () => {
  const params = useParams<ParamTypes>()
  const category = params._category!
  const upperCategory = category.charAt(0).toUpperCase() + category.slice(1)

  useEffect(() => {
    document.title = `${upperCategory} | ${import.meta.env.VITE_APP_SHOWN_NAME}`
  }, [upperCategory])

  const { data, status } = useQuery(category, () => getAllImageData(category), {
    ...queryOption,
  })

  return (
    <>
      <CaptionBanner text={upperCategory} />
      <main className="content-container h-100">
        <div className="main-text-picture">
          {(status === 'loading' || status === 'idle') &&
            [1, 2, 3, 4, 5].map((n) => (
              <SkeletonPicture key={n} theme="dark" />
            ))}
          {status === 'error' && <p>Error fetching data!</p>}
          {status === 'success' && (
            <>
              {data && data.length > 0 ? (
                <PhotoAlbum
                  layout="masonry"
                  photos={data}
                  spacing={3}
                  columns={(containerWidth) => {
                    if (containerWidth < 550) return 1
                    if (containerWidth < 950) return 2
                    if (containerWidth < 1550) return 3
                    return 4
                  }}
                />
              ) : (
                <p>Currently no Pictures here</p>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}

export default PictureList
