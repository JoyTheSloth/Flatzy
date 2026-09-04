import React from 'react';
import type { Property } from '../types/property';
import { ReelGallerySection } from './ReelGallerySection';

interface InstagramReelSectionProps {
  onSelectProperty: (property: Property) => void;
  onOpenInquiryModal: (property?: Property) => void;
}

export const InstagramReelSection: React.FC<InstagramReelSectionProps> = ({
  onSelectProperty,
  onOpenInquiryModal,
}) => {
  return (
    <ReelGallerySection
      onSelectProperty={onSelectProperty}
      onOpenInquiryModal={onOpenInquiryModal}
    />
  );
};
