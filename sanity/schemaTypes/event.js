import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown in listings',
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date (if multi-day)',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. Lagos, Nigeria or Virtual',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Upcoming', value: 'upcoming'},
          {title: 'Past', value: 'past'},
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration / External Link',
      type: 'url',
    }),
  ],
  orderings: [
    {
      title: 'Event Date (Newest First)',
      name: 'eventDateDesc',
      by: [{field: 'eventDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'eventDate', media: 'coverImage'},
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toDateString() : 'No date',
        media,
      }
    },
  },
})
