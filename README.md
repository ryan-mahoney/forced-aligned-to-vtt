# forced-aligned-to-vtt
Post process a force-aligned transcript to VTT format

### Overview
When I post a video online, I also want to generate close-captioned content. Since I am often posting videos based on a recorded script, I can "force align" the transcript to the audio. [ctc-forced-aligner](https://github.com/MahmoudAshraf97/ctc-forced-aligner) is a great utility that uses the Hugging Face CTC Models to force align a transcript. That said, it generates an output that is extremely granular and so that output needs to be processed to adhere to the VTT standard to use it for captioning.
