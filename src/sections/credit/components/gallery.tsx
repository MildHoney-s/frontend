import { IoClose } from 'react-icons/io5'
import ImageGallery from 'react-image-gallery'

import type { Member } from '../_mock/member'

type GalleryModalProps = {
  member: Member;
  onClose: () => void;
};

export default function GalleryModal({ member, onClose }: GalleryModalProps) {
  const items = (member.gallery ?? []).map((src) => ({
    original: src,
    thumbnail: src,
    originalAlt: `${member.name} gallery image`,
    thumbnailAlt: `${member.name} thumbnail`,
  }));

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        className="relative w-full max-w-[1100px] rounded-lg bg-white p-6 text-black shadow-xl overflow-hidden
                   md:w-[95%] lg:max-w-[1300px]"
        style={{
          maxHeight: 'calc(100vh - 48px)',
        }}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl text-gray-600 hover:text-black z-40"
          aria-label="Close gallery"
        >
          <IoClose />
        </button>

        <h2 className="mb-4 text-xl font-semibold">{member.name}'s Gallery</h2>
        <div
          className="w-full"
          style={{
            height: 'calc(100% - 64px)',
            minHeight: '320px',
          }}
        >
          {items.length ? (
            <ImageGallery
              items={items}
              showPlayButton={false}
              showFullscreenButton={true}
              showThumbnails={items.length > 1}
              showBullets={items.length > 1}
              lazyLoad
              additionalClass="custom-image-gallery"
            />
          ) : (
            <p className="py-20 text-center text-gray-500">No gallery items.</p>
          )}
        </div>
      </div>
    </div>
  );
}
