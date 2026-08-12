import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'Instagram', value: 'instagram'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'YouTube', value: 'youtube'},
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'X (Twitter)', value: 'x'},
          {title: 'WhatsApp', value: 'whatsapp'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
    }),
  ],
  preview: {
    select: {title: 'platform', subtitle: 'url'},
  },
})
