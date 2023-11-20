import React, {useEffect} from 'react';
import Footer from '@theme-original/Footer';

import { FeedbackButton } from 'pushfeedback-react';
import { defineCustomElements } from 'pushfeedback/loader';
import 'pushfeedback/dist/pushfeedback/pushfeedback.css';

export default function FooterWrapper(props) {

useEffect(() => {
    if (typeof window !== 'undefined') {
    defineCustomElements(window);
    }
}, []);

return (
    <>
      <div style={{"width": "220px", "margin":"15px auto", "padding": "1em"}}>
        <FeedbackButton project="7i7jw6ovwx" button-position="center-center" modal-position="bottom-right" button-style="dark">Share feedback</FeedbackButton>
      </div>
    <Footer {...props} />
    </>
)
}  