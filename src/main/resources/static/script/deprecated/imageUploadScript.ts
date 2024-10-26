//=================================-Imports-==================================
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import XHRUpload from '@uppy/xhr-upload';
import StatusBar from '@uppy/status-bar';

import ImageEditor from "@uppy/image-editor";

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/image-editor/dist/style.css';
import '@uppy/status-bar/dist/style.css';
//=======================-Client-And-Server-Functions-========================

//--------------------------------Create-Uppy---------------------------------
export function createUppy(dashboardSelector: string, statusBarSelector: string): Uppy {
    const uppy = new Uppy({
        debug: true,
        autoProceed: false,
        restrictions: {
            maxNumberOfFiles: 1,
            allowedFileTypes: ['image/*'],
        }
    })
        .use(Dashboard, {
            inline: true,
            target: dashboardSelector,
            showLinkToFileUploadResult: false,
            proudlyDisplayPoweredByUppy: false,
            autoOpenFileEditor: true,
            hideUploadButton: true,
            theme: 'dark'
        })
        // .use(StatusBar, {
        //     target: statusBarSelector,
        //     hideAfterFinish: false,
        // })
        .use(ImageEditor, {
            target: Dashboard,
            cropperOptions: {
                viewMode: 1,
                aspectRatio: 1,
                autoCropArea: 1,
                responsive: true,
                croppedCanvasOptions: {
                    width: 200,
                    height: 200
                }
            }
        })
        .use(XHRUpload, {
            endpoint: '/upload/profile/picture',
        })
        .on('file-editor:complete', (): void => {
            uppy.upload();
        })
        .on('complete', (result): void => {
            console.log('Upload result:', result);
        });
    return uppy;
}