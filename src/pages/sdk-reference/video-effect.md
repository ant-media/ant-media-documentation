---
id: video-effect
---
## VideoEffect() {#VideoEffect}
This class is used to apply a video effect to the video stream.
It's compatible with Ant Media Server JavaScript SDK v2.5.2+

**Kind**: global function  

* [123()](#VideoEffect)
    * [.init(webRTCAdaptor, streamId, virtualBackgroundImage, rawLocalVideo)](#VideoEffect+init)
    * [.createEffectCanvas()](#VideoEffect+createEffectCanvas)
    * [.initializeSelfieSegmentation()](#VideoEffect+initializeSelfieSegmentation)
    * [.enableVirtualBackground()](#VideoEffect+enableVirtualBackground)
    * [.enableBlur()](#VideoEffect+enableBlur)
    * [.removeEffect()](#VideoEffect+removeEffect)
    * [.setCanvasStreamAsCustomVideoSource()](#VideoEffect+setCanvasStreamAsCustomVideoSource)
    * [.loadSelfieSegmentation()](#VideoEffect+loadSelfieSegmentation)
    * [.playing()](#VideoEffect+playing) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.drawSegmentationMask(segmentation)](#VideoEffect+drawSegmentationMask)
    * [.onResults(results)](#VideoEffect+onResults)
    * [.drawImageDirectly(image)](#VideoEffect+drawImageDirectly)
    * [.drawVirtualBackground(image, segmentation, virtualBackgroundImage)](#VideoEffect+drawVirtualBackground)
    * [.drawBlurBackground(image, segmentation, blurAmount)](#VideoEffect+drawBlurBackground)

### videoEffect.init(webRTCAdaptor, streamId, virtualBackgroundImage, rawLocalVideo) {#VideoEffect+init}
This method is used to initialize the video effect.

**Kind**: instance method of [<code>VideoEffect</code>](#VideoEffect)  

| Param | Type | Description |
| --- | --- | --- |
| webRTCAdaptor | <code>WebRTCAdaptor</code> | Ant Media Server JavaScript SDK instance |
| streamId | <code>string</code> | Stream ID |
| virtualBackgroundImage | <code>HTMLElement</code> | Element of virtual background image. You should set the image source before calling this method. |
| rawLocalVideo | <code>HTMLElement</code> | Element of raw local video. It's used to keep the raw video stream. |

### videoEffect.createEffectCanvas() {#VideoEffect+createEffectCanvas}
This method is used to create the canvas element which is used to apply the video effect.

**Kind**: instance method of [<code>VideoEffect</code>](#VideoEffect)  
### videoEffect.initializeSelfieSegmentation() {#VideoEffect+initializeSelfieSegmentation}
This method is used to initialize the selfie segmentation.

**Kind**: instance method of [<code>VideoEffect</code>](#VideoEffect)  
### videoEffect.enableVirtualBackground() {#VideoEffect+enableVirtualBackground}
This method is used to activate the virtual background effect to the video stream.

**Kind**: instance method of [<code>VideoEffect</code>](#VideoEffect)  
### videoEffect.enableBlur() {#VideoEffect+enableBlur}
This method is used to activate the blur effect to the video stream.

**Kind**: instance method of [<code>VideoEffect</code>](#VideoEffect)  
### videoEffect.removeEffect() {#VideoEffect+removeEffect}
This method is used to disable the virtual background and blur effects.

**Kind**: instance method of [<code>VideoEffect</code>](#VideoEffect)  
### videoEffect.setCanvasStreamAsCustomVideoSource() {#VideoEffect+setCanvasStreamAsCustomVideoSource}
This method is used to prepare canvas stream and set the custom video source on Ant Media Server SDK.

**Kind**: instance method of [<code>VideoEffect</code>](#VideoEffect)  
### videoEffect.loadSelfieSegmentation() {#VideoEffect+loadSelfieSegmentation}
This method is used to prepare the raw video stream.

**Kind**: instance method of [<code>VideoEffect</code>](#VideoEffect)  
### videoEffect.playing() ⇒ <code>Promise.&lt;void&gt;</code> {#VideoEffect+playing}
This method is used to send raw video stream to mediapipe.

**Kind**: instance method of [<code>VideoEffect</code>](#VideoEffect)  
### videoEffect.drawSegmentationMask(segmentation) {#VideoEffect+drawSegmentationMask}
This method is used to draw the segmentation mask.

**Kind**: instance method of [<code>VideoEffect</code>](#VideoEffect)  

| Param | Type | Description |
| --- | --- | --- |
| segmentation | <code>Uint8Array</code> | Segmentation mask |

### videoEffect.onResults(results) {#VideoEffect+onResults}
This method is called by mediapipe when the segmentation mask is ready.

**Kind**: instance method of [<code>VideoEffect</code>](#VideoEffect)  

| Param |
| --- |
| results | 

### videoEffect.drawImageDirectly(image) {#VideoEffect+drawImageDirectly}
This method is used to draw the raw frame directly to the canvas.

**Kind**: instance method of [<code>VideoEffect</code>](#VideoEffect)  

| Param |
| --- |
| image | 

### videoEffect.drawVirtualBackground(image, segmentation, virtualBackgroundImage) {#VideoEffect+drawVirtualBackground}
This method is used to draw the frame with virtual background effect to the canvas.

**Kind**: instance method of [<code>VideoEffect</code>](#VideoEffect)  

| Param |
| --- |
| image | 
| segmentation | 
| virtualBackgroundImage | 

### videoEffect.drawBlurBackground(image, segmentation, blurAmount) {#VideoEffect+drawBlurBackground}
This method is used to draw frame with background blur effect to the canvas.

**Kind**: instance method of [<code>VideoEffect</code>](#VideoEffect)  

| Param |
| --- |
| image | 
| segmentation | 
| blurAmount | 

