/* eslint-disable react-refresh/only-export-components */
type Page = {
  id: string
  front: React.ReactNode
  back?: React.ReactNode
}

const SAMPLE_PAGES: Page[] = [
  {
    id: 'p1',
    front: <div className="p-6">Example Page 1 front</div>,
    back: <div className="p-6">Example Page 1 back</div>,
  },
  {
    id: 'p2',
    front: <div className="p-6">Example Page 2 front</div>,
    back: <div className="p-6">Example Page 2 back</div>,
  },
  {
    id: 'p3',
    front: <div className="p-6">Example Page 3 front</div>,
    back: <div className="p-6">Example Page 3 back</div>,
  },
]

export { SAMPLE_PAGES, type Page }
