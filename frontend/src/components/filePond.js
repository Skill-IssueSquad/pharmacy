import React from 'react';
import * as FilePond from 'filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';

FilePond.registerPlugin(FilePondPluginFileEncode);
FilePond.registerPlugin(FilePondPluginImageResize);
FilePond.registerPlugin(FilePondPluginImagePreview);

const pond = FilePond.create({
    multiple: true,
    name: 'filepond'
});

FilePond.setOptions({
    stylePanelAspectRatio: 150/100,
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 150
});

export default pond;
