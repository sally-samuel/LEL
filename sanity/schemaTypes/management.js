import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'management',
  title: 'Management Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'designation',
      title: 'Designation / Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
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
      name: 'biography',
      title: 'Biography',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'email',
      title: 'Email (optional)',
      type: 'string',
    }),
    defineField({
  name: 'order',
  title: 'Display Order',
  type: 'number',
  description: 'Lower number = shown first (e.g. CEO = 1)',
  validation: Rule => Rule.required().integer().positive(),
}),
   
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'designation', media: 'photo'},
  },
})
