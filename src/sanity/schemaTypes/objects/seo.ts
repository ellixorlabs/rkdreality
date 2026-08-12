import {defineArrayMember, defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons'

/**
 * Per-document SEO / social metadata. Embedded as an object (page-specific,
 * never shared) on documents that map to a route.
 */
export const seo = defineType({
  name: 'seo',
  title: 'SEO & Social',
  type: 'object',
  icon: SearchIcon,
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description: 'Overrides the default page title in search results.',
      validation: (rule) => rule.max(60).warning('Keep under ~60 characters'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Keep under ~160 characters'),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image URL',
      type: 'url',
      description: 'Paste a direct image URL (1200×630) for social sharing.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
