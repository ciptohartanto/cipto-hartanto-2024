import classNames from 'classnames'
import { useRouter } from 'next/router'

import AnchorLink from '@/components/AnchorLink'

export default function Custom404Body() {
  const router = useRouter()

  return (
    <>
      <div className="custom404Body">
        <h1 className="custom404Body-title">
          Ouch, the url does not exist.
          <br />
          (╥﹏╥)
        </h1>

        <ul className="custom404Body-list">
          <li
            className={classNames(
              'custom404Body-item',
              'custom404Body-item--home'
            )}
          >
            <AnchorLink
              href="./"
              gaContent={{
                event: 'clickedReturnHome404',
                value: 'Going back to home page (from 404)',
              }}
            >
              <span className="custom404Body-buttonText">Home</span>
            </AnchorLink>
          </li>

          <li
            className={classNames(
              'custom404Body-item',
              'custom404Body-item--goBackHistory'
            )}
          >
            <span
              className={classNames(
                'custom404Body-buttonText',
                'custom404Body-buttonText--hover'
              )}
              onClick={() => router.back()}
            >
              Go Back to last page
            </span>
          </li>
        </ul>
      </div>
    </>
  )
}
