import React from 'react';
import DocsAnnouncementPopup from '@site/src/components/DocsAnnouncementPopup';

export default function Root({children}) {
  return (
    <>
      {children}
      <DocsAnnouncementPopup />
    </>
  );
}
