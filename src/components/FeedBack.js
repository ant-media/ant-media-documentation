import React, {useEffect} from 'react';

import { FeedbackButton } from 'pushfeedback-react';
import { defineCustomElements } from 'pushfeedback/loader';
import 'pushfeedback/dist/pushfeedback/pushfeedback.css';

export default function FeedBack(props) {

  useEffect(() => {
      if (typeof window !== 'undefined') {
      defineCustomElements(window);
      }
  }, []);

  return (
      <div style={{"width": "220px", "margin":"15px auto", "padding": "1em", "background": "rgba(100,215,255,.3)"}}>
      <FeedbackButton project="7i7jw6ovwx" button-position="center-center" modal-position="bottom-right" button-style="light">Is this page useful?</FeedbackButton>
      </div>
  )
}  