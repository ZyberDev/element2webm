# Element2WEBM
This tool ✨magically✨ converts any HTML element into a .webm video file. Could perhaps be used when you want animations while loading things in the background. In such situations you shouldn't handle animations on the CPU and instead run them in parallel on the GPU (this could otherwise cause animations to stutter).

**IMPORTANT:** See tests section to check if your browser is supported.

**HOW TO USE**
1. Go to https://zyberdev.github.io/element2webm/.
2. Paste ✨HTML element of choice✨ into the big box that says "HTML goes here".
3. Enter desired width and height of output video (in pixels) into the "width" and "height" inputs. NOTE: You may want to scale your element up or down to fit the new resolution.
4. Enter the video length (in seconds) into the "time" input. If the element is animated, enter the amount of time it takes for the animation to finish.
5. This tool currently doesn't support transparent background colors, so enter a background color value into the "background" input (css color value or hex).
6. Click record.
7. A box asking what you want to capture will show up, click this tab and then click "share". Do not hover your mouse over the element while recording, that will mess up the output.
8. DONE! If everything has worked out properly you will now get a "recorded element.webm" downloaded.

**TESTS**
- Chrome - Works, but output video has no metadata.
- Edge - Does not work.
- Opera - Does not work.
