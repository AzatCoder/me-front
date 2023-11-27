import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
import type FolderWindow from '$components/windows/Folder.svelte';
import type MessageSendWindow from '$components/windows/MessageSend.svelte';
import type RunningCmdWindow from '$components/windows/Loading.svelte';
import type ImageWindow from '$components/windows/Image.svelte';
import type AboutWindow from '$components/windows/About.svelte';

// Files Structure

interface FileProps {
  name: string;
  img: string;
}

type PropsWithoutWindow<T extends SvelteComponent> = Omit<ComponentProps<T>, 'window'>;

type FileComponent = {
  component: typeof MessageSendWindow;
  props: PropsWithoutWindow<MessageSendWindow>;
} | {
  component: typeof RunningCmdWindow;
  props: PropsWithoutWindow<RunningCmdWindow>;
} | {
  component: typeof ImageWindow;
  props: PropsWithoutWindow<ImageWindow>;
} | {
  component: typeof AboutWindow;
  props: PropsWithoutWindow<AboutWindow>;
}| {
  component: typeof FolderWindow;
  props: PropsWithoutWindow<FolderWindow>;
}

export type TFile = FileProps & FileComponent;
export type TFilesStorage = Record<string, TFile>;

// API

interface IAPISuccessSkeleton <T> {
  type: 'success',
  data: T,
}

export interface IAPIMessageInput {
  by: string;
  messenger: string;
  username: string;
  text: string;
}

interface IAPIImage {
  id: string;
  name: string;
  fileName: string;
}

export type IAPIImages = IAPISuccessSkeleton<IAPIImage[]>;
