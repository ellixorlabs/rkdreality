import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const footerLink = defineType({
  name: 'footerLink',
  title: 'Footer link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description:
        'Section, page path, or full URL. Examples: /#properties, /terms, https://rera.karnataka.gov.in',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true
          if (/^(\/|#|https?:\/\/)/i.test(value)) return true
          return 'Use a path (/#why), a hash (#contact), or a full https:// URL'
        }),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'href'},
  },
})
