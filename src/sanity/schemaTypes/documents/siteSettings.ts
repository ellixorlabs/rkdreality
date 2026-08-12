import {defineArrayMember, defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

/**
 * Singleton — global, site-wide content: brand, contact details, WhatsApp,
 * social links and default SEO. Enforced via Studio structure (fixed id
 * "siteSettings").
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'brand', title: 'Brand', default: true},
    {name: 'contact', title: 'Contact'},
    {name: 'footer', title: 'Footer'},
    {name: 'social', title: 'Social'},
    {name: 'seo', title: 'Default SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Site title',
      type: 'string',
      group: 'brand',
      initialValue: 'RKD Reality',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'brand',
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 3,
      group: 'brand',
      description: 'Used in the footer and as a fallback meta description.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo image URL',
      type: 'url',
      group: 'brand',
      description: 'Optional. Paste a direct image URL.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'whyImage',
      title: 'Why section image',
      type: 'image',
      group: 'brand',
      description:
        'Photo shown under “Why RKD Reality”. Upload a new file to replace the default illustration. Leave empty to keep the doodle.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the photo for accessibility.',
        }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact information',
      type: 'object',
      group: 'contact',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'phone',
          title: 'Phone number',
          type: 'string',
          description: 'Display format, e.g. "+91 97400 91582".',
        }),
        defineField({
          name: 'whatsappNumber',
          title: 'WhatsApp number',
          type: 'string',
          description: 'Digits only with country code, e.g. "919740091582".',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (rule) => rule.email(),
        }),
        defineField({
          name: 'address',
          title: 'Office address',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'instagramUrl',
          title: 'Instagram URL',
          type: 'url',
          description: 'Shown as a button below the office address in the footer.',
          validation: (rule) => rule.uri({scheme: ['http', 'https']}),
        }),
        defineField({
          name: 'hours',
          title: 'Office hours',
          type: 'string',
          description: 'e.g. "Mon–Sat · 9:30 AM – 7:00 PM"',
        }),
      ],
    }),
    defineField({
      name: 'approvals',
      title: 'Trust strip approvals',
      type: 'array',
      group: 'brand',
      description: 'Approval / certification badges shown in the trust strip.',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer link columns',
      type: 'array',
      group: 'footer',
      description:
        'Explore, property types, locations, or any extra columns. Leave empty to use the site defaults.',
      of: [defineArrayMember({type: 'footerColumn'})],
    }),
    defineField({
      name: 'social',
      title: 'Social links',
      type: 'array',
      group: 'social',
      of: [defineArrayMember({type: 'socialLink'})],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
      group: 'seo',
      description: 'Fallback metadata used when a page has none of its own.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
