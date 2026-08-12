import {defineArrayMember, defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

/**
 * Singleton — the "Meet the Founder" section. Enforced as a single document
 * via Studio structure (fixed id "founder").
 */
export const founder = defineType({
  name: 'founder',
  title: 'Founder',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      description: 'e.g. "Founder & Managing Director, RKD Reality"',
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait image URL',
      type: 'url',
      description: 'Paste a direct image URL.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Small label above the heading, e.g. "Meet the Founder".',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'e.g. "A name you can hold accountable."',
    }),
    defineField({
      name: 'paragraphs',
      title: 'Biography paragraphs',
      type: 'array',
      of: [defineArrayMember({type: 'text'})],
      description: 'Each entry is one paragraph in the bio.',
    }),
    defineField({
      name: 'pullQuote',
      title: 'Pull quote',
      type: 'text',
      rows: 3,
      description: 'Large quote shown beside the bio.',
    }),
    defineField({
      name: 'signatureQuote',
      title: 'Signature caption',
      type: 'text',
      rows: 2,
      description: 'Short quote in the floating card over the portrait.',
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'credential',
          fields: [
            defineField({
              name: 'stat',
              title: 'Stat',
              type: 'string',
              description: 'e.g. "18+"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. "Years guiding land investors"',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'stat', subtitle: 'label'}},
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role'},
  },
})
