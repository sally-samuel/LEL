import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'mediaItem',
  title: 'Media Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Photo', value: 'photo'},
          {title: 'Video', value: 'video'},
          {title: 'Newsletter', value: 'newsletter'},
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
      initialValue: 'photo',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
      hidden: ({document}) => document?.type === 'video',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (YouTube / Vimeo)',
      type: 'url',
      hidden: ({document}) => document?.type !== 'video',
    }),
    defineField({
      name: 'file',
      title: 'File (PDF for newsletters)',
      type: 'file',
      hidden: ({document}) => document?.type !== 'newsletter',
    }),
    defineField({
      name: 'caption',
      title: 'Caption / Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date',
      type: 'datetime',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
  ],
  orderings: [
    {
      title: 'Date (Newest First)',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'type', media: 'image'},
  },
})