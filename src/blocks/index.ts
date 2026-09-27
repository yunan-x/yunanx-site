import type { Block, Field } from 'payload'
import { imageField, lottieField, videoGroup } from '@/fields'

// Project pages are Sections → rows (a Webflow "wrap") → content blocks. Class names
// mirror the Webflow CSS so every existing case-study page can be rebuilt exactly.

const widthField = (name = 'width'): Field => ({
  name,
  type: 'select',
  defaultValue: '100',
  options: [
    { label: '100%', value: '100' },
    { label: '75%', value: '75' },
    { label: '60%', value: '60' },
    { label: '40%', value: '40' },
    { label: 'Icon (64px)', value: 'icon' },
  ],
})

/** An image or a Lottie animation, for slots that take either. */
const visual = (name: string): Field => ({
  name,
  type: 'group',
  fields: [
    {
      name: 'kind',
      type: 'select',
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Lottie', value: 'lottie' },
      ],
    },
    imageField('image', { admin: { condition: (_, s) => s?.kind !== 'lottie' } }),
    lottieField('lottie'),
    widthField(),
  ],
})

const Image: Block = {
  slug: 'image',
  fields: [
    imageField('image', { required: true }),
    widthField(),
    { name: 'multiply', type: 'checkbox', label: 'Multiply blend (for images on tinted backgrounds)' },
  ],
}

const TwoUp: Block = {
  slug: 'twoUp',
  labels: { singular: 'Two visuals side by side', plural: 'Two visuals side by side' },
  fields: [
    visual('left'),
    visual('right'),
    { name: 'gap', type: 'checkbox', label: 'Gap between the two', defaultValue: true },
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
  labels: { singular: 'Paragraph (right column)', plural: 'Paragraphs' },
  fields: [{ name: 'body', type: 'richText' }],
}

const Columns: Block = {
  slug: 'columns',
  labels: { singular: 'Two columns (title + facts)', plural: 'Two columns' },
  admin: { group: 'Layout' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'heading', type: 'text' },
        {
          name: 'headingSize',
          type: 'select',
          defaultValue: 'h1',
          options: [
            { label: 'Project title', value: 'h1' },
            { label: 'Large', value: 'h2' },
            { label: 'Small', value: 'h3' },
          ],
        },
      ],
    },
    { name: 'subtitle', type: 'text' },
    { name: 'lightSubtitle', type: 'checkbox', label: 'Light subtitle (on dark backgrounds)' },
    imageField('leftImage', { admin: { description: 'Image under the heading, or instead of it.' } }),
    widthField('leftImageWidth'),
    { name: 'facts', type: 'richText', admin: { description: 'Scope / Role / Outcome. Bold the labels.' } },
    { name: 'centerRight', type: 'checkbox', label: 'Center the right column', defaultValue: true },
    {
      name: 'media',
      type: 'group',
      admin: { description: 'Under the text in the right column.' },
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
        widthField(),
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
        { label: 'Full-screen', value: 'full' },
        { label: '300px strip', value: '300' },
      ],
    },
  ],
}

const Lottie: Block = {
  slug: 'lottie',
  fields: [lottieField(), widthField(), { name: 'loop', type: 'checkbox', defaultValue: false }],
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
            { label: 'Bare', value: 'none' },
          ],
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      admin: { description: 'Each row gets its own vertical spacing. A row without content is a spacer.' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'wrapper',
              type: 'select',
              defaultValue: 'center',
              options: [
                { label: 'Padded, centered', value: 'center' },
                { label: 'Padded, centered, extra gap', value: 'center gap' },
                { label: 'Padded', value: 'wrap' },
                { label: 'Padded, stacked left', value: 'vflex' },
                { label: 'No padding', value: 'none' },
              ],
            },
            { name: 'contained', type: 'checkbox', label: 'Contained width', defaultValue: true },
          ],
        },
        { name: 'content', type: 'blocks', blocks: [Image, TwoUp, Grid, Text, Columns, Video, Lottie] },
      ],
    },
  ],
}
