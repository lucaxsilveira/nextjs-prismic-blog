import { RichTextBlock } from 'prismic-reactjs';

declare global {
  interface NodePost {
    node: IPost
  }

  interface IPost {
    _meta: {
      uid: string;
    }
    title: RichTextBlock[];
    thumbnail: {
      url: string;
    };
    content: RichTextBlock[];
  }
}