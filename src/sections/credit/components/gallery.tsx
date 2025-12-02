import ImageGallery from "react-image-gallery"
import { IoClose } from "react-icons/io5"
import { Member } from '../_mock/member'

type GalleryModalProps = {
  member: Member
  onClose: () => void
}

export default function GalleryModal({ member, onClose }: GalleryModalProps) {
    const items = (member.gallery ?? []).map((src) => ({
    original: src,
    thumbnail: src,
    originalAlt: `${member.name} gallery image`,
    thumbnailAlt: `${member.name} thumbnail`,
  }));

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-[600px] rounded-lg bg-white p-6 text-black">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl text-gray-600 hover:text-black"
        >
          <IoClose />
        </button>

        <h2 className="mb-4 text-xl font-semibold">{member.name}'s Gallery</h2>

        {items.length > 0 ? (
          <ImageGallery
            items={items}
            showPlayButton={false}
            showFullscreenButton={true}
            showThumbnails={items.length > 1}
            showBullets={items.length > 1}
            lazyLoad
          />
        ) : (
          <p className="text-center text-gray-500 py-20">No gallery items.</p>
        )}
      </div>
    </div>
  )
}
