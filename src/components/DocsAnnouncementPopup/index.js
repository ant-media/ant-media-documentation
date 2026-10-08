import React, {useCallback, useEffect, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';

const V2_DOCS_URL = 'https://docs.antmedia.io/v2';

function isHomePath(pathname) {
  return pathname === '/' || pathname === '';
}

export default function DocsAnnouncementPopup() {
  const {pathname} = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isHomePath(pathname));
  }, [pathname]);

  const dismiss = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        dismiss();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, dismiss]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={dismiss} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="docs-announcement-title"
        onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={dismiss}
          aria-label="Close announcement">
          ×
        </button>
        <p id="docs-announcement-title" className={styles.message}>
          Our v2 docs are live! Check them out.
        </p>
        <a
          className={styles.cta}
          href={V2_DOCS_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={dismiss}>
          Open v2 docs
        </a>
      </div>
    </div>
  );
}
