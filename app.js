let inp = document.getElementsByClassName("htmldata")[0];
let bgcol = document.getElementsByClassName("capturecolor")[0];
let frame = document.getElementsByClassName("frame")[0];
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function saveFile(chunks){
   const blob = new Blob(chunks, {
      type: 'video/webm'
    });
    let downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "recorded element.webm";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(blob);
    document.body.removeChild(downloadLink);
}

bgcol.addEventListener("input", async function() {
    bgcol.style = "background-color: "+bgcol.value+";";
});

document.getElementsByClassName("recordbutton")[0].addEventListener("click",async function() {
    try {
        frame.innerHTML = inp.value;
        frame.style="width: "+document.getElementsByClassName("capturewidth")[0].value+"px; height: "+document.getElementsByClassName("captureheight")[0].value+"px; background-color: "+bgcol.value+";";
        sleep(1000);
        const cropTarget = await CropTarget.fromElement(frame);
        let stream = await navigator.mediaDevices.getDisplayMedia({video: true, preferCurrentTab: true, selfBrowserSurface: "include"});
        let streamTracks = stream.getVideoTracks();
        for (let i = 0; i < streamTracks.length; i++) {
            let track = streamTracks[i];
            if (track.cropTo !== undefined) {
                await track.cropTo(cropTarget);
           }
        }
        frame.innerHTML = inp.value;
        let chunks = [];
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = function (e) {
            if (e.data.size > 0) {
              chunks.push(e.data);
            }
          };
        mediaRecorder.onstop = function () {
            saveFile(chunks);
            chunks = [];
          };
        mediaRecorder.start();
        setTimeout(() => { mediaRecorder.stop(); }, 1000*Number(document.getElementsByClassName("capturelength")[0].value));
      } catch (err) {
        console.log(err);
      }
});
