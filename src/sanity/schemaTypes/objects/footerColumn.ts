import {defineArrayMember, defineField, defineType} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export const footerColumn = defineType({
  name: 'footerColumn',
  title: 'Footer column',
  type: 'object',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [defineArrayMember({type: 'footerLink'})],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {title: 'title', links: 'links'},
    prepare({title, links}) {
      const count = Array.isArray(links) ? links.length : 0
      return {
        title: title || 'Untitled column',
        subtitle: `${count} link${count === 1 ? '' : 's'}`,
      }
    },
  },
})
