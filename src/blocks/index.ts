import type { Block, Field } from 'payload'
import { imageField, lottieField, videoGroup } from '@/fields'

// Content blocks stack inside a Section block. Class names mirror the Webflow CSS
// so every existing case-study page can be rebuilt exactly.

const widthField: Field = {
  name: 'width',
  type: 'select',
  defaultValue: '100',
  options: [
    { label: '100%', value: '100' },
    { label: '75%', value: '75' },
    { label: '60%', value: '60' },
    { label: '40%', value: '40' },
  ],
}

const Image: Block = {
  slug: 'image',
  fields: [
    imageField('image', { required: true }),
    widthField,
    { name: 'multiply', type: 'checkbox', label: 'Multiply blend (for images on tinted backgrounds)' },
  ],
}

const TwoUp: Block = {
  slug: 'twoUp',
  labels: { singular: 'Two images', plural: 'Two images' },
  fields: [
    imageField('left', { required: true }),
    imageField('right', { required: true }),
    { name: 'gap', type: 'checkbox', label: 'Gap between images', defaultValue: true },
  ],
}

const Grid: Block = {
  slug: 'grid',
  labels: { singular: 'Image grid', plural: 'Image grids' },
  fields: [
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
        { label: '8 columns (icons)', value: '8' },
      ],
    },
    { name: 'images', type: 'array', minRows: 1, fields: [imageField('image', { required: true })] },
  ],
}

const Text: Block = {
  slug: 'text',
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'headingSize',
      type: 'select',
      defaultValue: 'h3',
      options: [
        { label: 'Project title (h1 style)', value: 'h1' },
        { label: 'Large (h2)', value: 'h2' },
        { label: 'Small (h3)', value: 'h3' },
      ],
    },
    { name: 'body', type: 'richText' },
  ],
}

const Intro: Block = {
  slug: 'intro',
  labels: { singular: 'Intro (title + facts)', plural: 'Intros' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    { name: 'lightSubtitle', type: 'checkbox', label: 'Light subtitle (on dark backgrounds)' },
    { name: 'facts', type: 'richText', admin: { description: 'Scope / Role / Outcome. Bold the labels.' } },
    {
      name: 'media',
      type: 'group',
      fields: [
        {
          name: 'kind',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Image', value: 'image' },
            { label: 'Video', value: 'video' },
            { label: 'Lottie', value: 'lottie' },
          ],
        },
        imageField('image', { admin: { condition: (_, s) => s?.kind === 'image' } }),
        widthField,
        videoGroup('video', { admin: { condition: (_, s) => s?.kind === 'video' } }),
        lottieField('lottie'),
      ],
    },
  ],
}

const Video: Block = {
  slug: 'video',
  labels: { singular: 'Background video', plural: 'Background videos' },
  fields: [
    videoGroup('video'),
    {
      name: 'size',
      type: 'select',
      defaultValue: 'full',
      options: [
        { label: 'Full-screen hero', value: 'full' },
        { label: '300px strip', value: '300' },
      ],
    },
  ],
}

const Lottie: Block = {
  slug: 'lottie',
  fields: [lottieField(), { name: 'loop', type: 'checkbox', defaultValue: false }],
}

export const Section: Block = {
  slug: 'section',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'background',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'White', value: 'default' },
            { label: 'Grey', value: 'grey' },
            { label: 'Dark', value: 'dark' },
            { label: 'Grid pattern', value: 'bg_grid' },
            { label: 'Water drop', value: 'bg_waterdrop' },
            { label: 'Chip', value: 'bg_chip' },
            { label: 'Deep sea', value: 'deepsea' },
            { label: 'LoLo UI', value: 'lolo_ui' },
            { label: 'LoLo UI (white)', value: 'lolo_ui white' },
          ],
        },
        {
          name: 'padding',
          type: 'select',
          defaultValue: 'section',
          options: [
            { label: 'Normal', value: 'section' },
            { label: 'None (full bleed)', value: 'section_0pad' },
            { label: 'Hero', value: 'sec_hero' },
          ],
        },
        { name: 'contained', type: 'checkbox', label: 'Contained width', defaultValue: true },
      ],
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [Image, TwoUp, Grid, Text, Intro, Video, Lottie],
    },
  ],
}
