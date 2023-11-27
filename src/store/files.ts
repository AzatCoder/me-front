import { writable } from 'svelte/store';
import type { TFilesStorage, TFile } from '../types';
import MessageSendWindow from '$components/windows/MessageSend.svelte';
import ExeWindow from '$components/windows/Loading.svelte';
import ImageWindow from '$components/windows/Image.svelte';
import exeImg from '$images/executable.png';
import messagegImg from '$images/message.png';
import image from '$images/image.png';
import { getImages } from '$api';
import { imageSrc } from '$api/urls';
import AboutWindow from '$components/windows/About.svelte';
import FolderWindow from '$components/windows/Folder.svelte';
import folderImg from '$images/directory-closed.png';

const initialFiles = Object.create(null);

const addInitialFile = (key: string, file: TFile) => {
  if (initialFiles[key]) {
    throw new Error(`${key} already registered in 'initialFiles'.`);
  }
  initialFiles[key] = file;
}

addInitialFile('about', {
  name: 'Whatta hell is g...',
  component: AboutWindow,
  img: messagegImg,
  props: {}
});

addInitialFile('photos', {
  name: 'Photos',
  component: FolderWindow,
  img: folderImg,
  props: {
    files: async () => {
      const { data } = await getImages();
      return data.reduce((acc, { name, fileName, id }) => {
        const file = {
          component: ImageWindow,
          img: image,
          name,
          props: {
            img: imageSrc(fileName)
          },
        };
        add(id, file);
    
        return { ...acc, [id]: file };
      }, {});
    },
    onOpen: (key: string) => open(key)
  }
});

addInitialFile('message_sender', {
  component: MessageSendWindow,
  img: messagegImg,
  name: 'Send me a message',
  props: {}
});

const SCREEN_SWITCHER_KEY = 'screen_switcher';
addInitialFile('screen_switcher', {
  component: ExeWindow,
  img: exeImg,
  name: 'Switch to full screen.exe',
  props: {
    onFinish: () => {
      if (document.fullscreenElement === null)
        document.documentElement
          .requestFullscreen()
          .then(() => rename(SCREEN_SWITCHER_KEY, 'Exit full screen.exe'));
      else document
        .exitFullscreen()
        .then(() => rename(SCREEN_SWITCHER_KEY, 'Switch to full screen.exe'));
    },
    duration: 1000,
  },
});

const mainDirectoryExtensinos: (keyof TFilesStorage)[] = Object.keys(initialFiles);

const files = writable(initialFiles);
const openExtensions = writable<string[]>([]);
const openExtensionsByVisibility = writable<string[]>([]);

const rename = (key: string, newName: string) => {
  files.update(extensions => {
    (extensions[key].name as string) = newName;
    return extensions;
  });
}

const add = (key: string, extension: TFile) => {
  files.update(extensions => ({ ...extensions, [key]: extension }));
}

const replaceToLast = <T>(windows: T[], extension: string) => {
  const idx = windows.findIndex(ext => ext === extension);
  const window = windows.splice(idx, 1)[0];
  windows.push(window);
  return windows;
}

const open = (extensionKey: string) => openExtensionsByVisibility.update(windows => {
  const visibleIdx = windows.findIndex(visibleIdx => visibleIdx === extensionKey);

  if (visibleIdx !== -1) focus(extensionKey);
  else {
    windows.push(extensionKey);
    openExtensions.update(files => [...files, extensionKey]);
  }

  return windows;
});

const close = (extensionKey: string) => {
  openExtensionsByVisibility.update(filesIndexes => filesIndexes.filter(ext => ext !== extensionKey));
  openExtensions.update(filesIndexes => filesIndexes.filter(ext => ext !== extensionKey));
};

const focus = (extensionKey: string) => openExtensionsByVisibility.update(windows => replaceToLast(windows, extensionKey));

export const filesStore = {
  mainDirectoryExtensinos,
  files,
  openExtensions,
  openExtensionsByVisibility,
  open,
  close,
  focus
};
