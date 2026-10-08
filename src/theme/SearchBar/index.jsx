import React from 'react';
import {BIEL_PROJECT_ID} from '@site/src/components/bielProject';

/**
 * Navbar AI search. The floating Ask AI chatbot is injected by docusaurus-biel.
 * Do not set button-position here — that would pull the control out of the navbar.
 */
export default function SearchBar() {
  return (
    <div className="navbar__search navbar-biel-search">
      <biel-search-button
        project={BIEL_PROJECT_ID}
        header-title="Biel.ai Search"
        button-style="rounded"
        modal-position="sidebar-right">
        Search...
      </biel-search-button>
    </div>
  );
}
