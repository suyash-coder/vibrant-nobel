import type { BirthdayNoteData, ScrapbookPhoto } from '../types/scrapbook'

/**
 * =========================================================================
 * BIRTHDAY WEBSITE CONFIGURATION
 * =========================================================================
 * You can easily customize the celebrant's name, the personal message,
 * and the scrapbook photos in this file.
 *
 * To add her actual photos:
 * 1. Place the photo files into the "public/images/her/" folder.
 * 2. Update the `src` paths below (e.g. '/images/her/photo-1.jpg').
 * 3. Update the captions and handwritten annotations to match her moments.
 * =========================================================================
 */

export const CELEBRANT_NAME = 'ANUSHREE'

export const BIRTHDAY_NOTE: BirthdayNoteData = {
  badge: 'a little note for you',
  greeting: 'HAPPY BIRTHDAY, ANUSHREEEEEE',
  paragraphs: [
    'Im so sorry i couldnt get this done by 22nd. But i had this in my mind for some time.',
    'Youre 20 now oh my god....',
    'I wanted to meet you but you had your exams which is just sad. But anyways I made a little something for you and i hope it makes you smile.',
    'And i really hope you find a million more reasons to smile this year. (I like it when youre happy)',
    'I wish you get everything that you ever wish for. And i wish you pass this exam as well.',
    'I want you to know that you are quite literally the BEST girl i know and would ever know in my life. Youve really made my life so much better. I hope you know how much you mean to me.',
    'Happy birthday again to my closest friend, the most loving soul and the strongest girl ever....',
  ],
  closing: '',
  signature: 'I love you <3',
}

export const SCRAPBOOK_PHOTOS: ScrapbookPhoto[] = [
  {
    id: 'photo-1',
    src: '/images/her/photo-1.jpg',
    alt: 'You both make a good team btw',
    caption: 'you both make a good team btw',
    annotation: '',
    date: 'special moments',
    rotation: -1.5,
    tapeColor: 'blush',
    tapePosition: 'top-center',
    aspectRatio: 'portrait',
    sticker: 'star',
    stickerPosition: 'top-right',
  },
  {
    id: 'photo-2',
    src: '/images/her/photo-2.jpg',
    alt: 'Leave some at the end for me',
    caption: 'leave some at the end for me',
    annotation: '',
    date: 'little moments',
    rotation: 2,
    tapeColor: 'sage',
    tapePosition: 'diagonal-left',
    aspectRatio: 'square',
  },
  {
    id: 'photo-3',
    src: '/images/her/photo-3.jpg',
    alt: 'A piece of art',
    caption: 'a piece of art',
    annotation: '',
    date: 'pure elegance',
    rotation: -2.5,
    tapeColor: 'butter',
    tapePosition: 'diagonal-right',
    aspectRatio: 'portrait',
    sticker: 'sparkle',
    stickerPosition: 'bottom-left',
  },
  {
    id: 'photo-4',
    src: '/images/her/photo-4.jpg',
    alt: 'This little baby is 20!!!!!!',
    caption: 'this little baby is 20!!!!!!',
    annotation: '',
    date: 'turning 20',
    rotation: 1.8,
    tapeColor: 'blush',
    tapePosition: 'top-right',
    aspectRatio: 'portrait',
    sticker: 'disco',
    stickerPosition: 'bottom-right',
  },
  {
    id: 'photo-5',
    src: '/images/her/photo-5.jpg',
    alt: 'So full of fun and joy',
    caption: 'so full of fun and joy',
    annotation: '',
    date: 'pure joy',
    rotation: -1.2,
    tapeColor: 'sage',
    tapePosition: 'top-center',
    aspectRatio: 'square',
  },
  {
    id: 'photo-6',
    src: '/images/her/photo-6.jpg',
    alt: 'When are we gonna meet again :(',
    caption: 'when are we gonna meet again :(',
    annotation: '',
    date: 'today & always',
    rotation: 2.2,
    tapeColor: 'butter',
    tapePosition: 'diagonal-left',
    aspectRatio: 'portrait',
    sticker: 'star',
    stickerPosition: 'top-right',
  },
]
